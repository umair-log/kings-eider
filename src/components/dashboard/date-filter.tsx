"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialDate = React.useCallback((): DateRange | undefined => {
    const fromParam = searchParams.get("start_date");
    const toParam = searchParams.get("end_date");
    let from: Date | undefined = undefined;
    let to: Date | undefined = undefined;

    if (fromParam) {
      try {
        from = new Date(fromParam);
      } catch (e) {
        console.warn("Invalid start_date in URL");
      }
    }
    if (toParam) {
      try {
        to = new Date(toParam);
      } catch (e) {
        console.warn("Invalid end_date in URL");
      }
    }
    
    // Set default to start of month if no start date
    if (!from) {
        from = new Date(new Date().setDate(1));
    }

    return { from, to };
  }, [searchParams]);

  const [date, setDate] = React.useState<DateRange | undefined>(getInitialDate);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(getInitialDate());
  }, [searchParams, getInitialDate]);

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setIsOpen(false);
    setDate(selectedDate);
    const params = new URLSearchParams(searchParams.toString());
    if (selectedDate?.from) {
      params.set("start_date", format(selectedDate.from, "yyyy-MM-dd'T'00:00:00"));
    } else {
      params.delete("start_date");
    }
    if (selectedDate?.to) {
      params.set("end_date", format(selectedDate.to, "yyyy-MM-dd'T'23:59:59"));
    } else {
      params.delete("end_date");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full min-w-[260px] justify-start text-left font-normal md:w-[300px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
