import { DateFilter } from "./date-filter";
import { Automation } from "./automation";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-auto flex-wrap items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-sm md:h-14 md:flex-nowrap md:p-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Eider Insights
      </h1>
      <div className="ml-auto flex w-full flex-wrap items-center justify-end gap-2 md:w-auto md:flex-nowrap">
        <Automation />
        <DateFilter />
      </div>
    </header>
  );
}
