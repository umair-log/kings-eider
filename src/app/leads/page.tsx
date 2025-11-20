import { getLeads } from "@/app/actions";
import { LeadsHeader } from "@/components/dashboard/leads-header";
import { LeadsTable } from "@/components/dashboard/leads-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function LeadsPage() {
  const data = await getLeads();
  const hasError = 'error' in data;
  const leads = hasError ? [] : data;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <LeadsHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {hasError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Data</AlertTitle>
            <AlertDescription>{data.error}</AlertDescription>
          </Alert>
        )}
        <LeadsTable data={leads} />
      </main>
    </div>
  );
}
