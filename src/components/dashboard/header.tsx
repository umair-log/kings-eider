import { DateFilter } from "./date-filter";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-auto items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-sm md:h-14 md:p-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Eider Insights
      </h1>
      <div className="ml-auto flex items-center gap-2">
        <DateFilter />
      </div>
    </header>
  );
}
