import { getCampaignAnalytics } from "@/app/actions";
import { DashboardHeader } from "@/components/dashboard/header";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { startOfMonth, format } from "date-fns";

type HomePageProps = {
  searchParams: {
    start_date?: string;
    end_date?: string;
  };
};

export default async function Home({ searchParams }: HomePageProps) {
  // Set default dates: from the start of the current month to today.
  const defaultStartDate = format(startOfMonth(new Date()), "yyyy-MM-dd'T'00:00:00");

  const startDate = searchParams.start_date || defaultStartDate;
  const endDate = searchParams.end_date; // optional

  const data = await getCampaignAnalytics(startDate, endDate);
  
  const hasError = 'error' in data;
  const campaigns = hasError ? [] : data;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {hasError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Data</AlertTitle>
            <AlertDescription>{data.error}</AlertDescription>
          </Alert>
        )}
        <OverviewStats data={campaigns} />
        <CampaignTable data={campaigns} />
      </main>
    </div>
  );
}
