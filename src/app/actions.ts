"use server";

import type { Campaign } from "@/lib/types";

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

    const data = await response.json();
    
    if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
        return { error: "The analytics API returned an unexpected data format." };
    }
    
    return data as Campaign[];
  } catch (error) {
    console.error("Error fetching campaign analytics:", error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
        return { error: "Network error: Failed to connect to the analytics API. Please check your network connection or the API endpoint." };
    }
    return { error: "An unexpected error occurred while fetching campaign data." };
  }
}
