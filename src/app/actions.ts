"use server";

import type { Campaign, Lead } from "@/lib/types";

export async function getCampaignAnalytics(
  startDate: string,
  endDate?: string
): Promise<Campaign[] | { error: string }> {
  const url = "https://n8n-txdlu-u54150.vm.elestio.app/webhook/analytics";
  
  const body: { start_date: string; end_date?: string } = {
    start_date: startDate,
  };

  if (endDate) {
    body.end_date = endDate;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return { error: `API request failed with status ${response.status}. Please check the API endpoint and your request.` };
    }
    
    const text = await response.text();
    if (!text) {
        return []; // Return empty array if response body is empty
    }
    const data = JSON.parse(text);

    // If the data is an empty object, treat it as an empty array of campaigns
    if (typeof data === 'object' && data !== null && !Array.isArray(data) && Object.keys(data).length === 0) {
      return [];
    }

    // If the data is a single object (but not an empty one), wrap it in an array
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        return [data as Campaign];
    }
    
    if (!Array.isArray(data)) {
        console.error("API did not return an array or a single object:", data);
        return { error: "The analytics API returned an unexpected data format." };
    }
    
    return data as Campaign[];
  } catch (error) {
    console.error("Error fetching campaign analytics:", error);
    if (error instanceof SyntaxError) {
        return { error: "Failed to parse analytics data. The API may be returning invalid JSON."};
    }
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        return { error: "Network error: Failed to connect to the analytics API. Please check your network connection or the API endpoint." };
    }
    return { error: "An unexpected error occurred while fetching campaign data." };
  }
}

export async function runAutomation(
  city: string
): Promise<{ success: boolean; message: string }> {
  const url = "https://n8n-txdlu-u54150.vm.elestio.app/webhook/run-automation";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        return { success: false, message: `API request failed with status ${response.status}: ${errorText}` };
    }

    const data = await response.json();

    if (data.Response === "Done") {
      return { success: true, message: "Automation complete! New leads should now be available in your Google Sheet." };
    } else {
      return { success: false, message: data.Response || "An unknown error occurred during automation." };
    }
  } catch (error) {
    console.error("Error running automation:", error);
    if (error instanceof SyntaxError) {
        return { success: false, message: "Failed to parse the automation response. The API may have returned invalid JSON."};
    }
    return { success: false, message: "An unexpected error occurred while running the automation." };
  }
}


export async function getLeads(): Promise<Lead[] | { error: string }> {
  const url = "https://n8n-txdlu-u54150.vm.elestio.app/webhook/get-leads";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return { error: `API request failed with status ${response.status}.` };
    }

    const data = await response.json();
    return data as Lead[];
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { error: "An unexpected error occurred while fetching leads." };
  }
}
