"use client";

import * as React from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { runAutomation } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

// const cities = ["NYC", "LA", "SF", "Miami", "Chicago", "Dallas", "Seattle", "Aspen"];
const defaultCity = "Miami";

export function Automation() {
  const [city, setCity] = React.useState<string | undefined>(defaultCity);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleRunAutomation = async () => {
    if (!city) {
      setError("No city is configured for automation.");
      return;
    }
    setError(null);
    setIsLoading(true);
    
    // Set a timeout to handle potential gateway timeouts or very long requests
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("The request timed out after 3 minutes. The automation is likely still running in the background.")), 180000)
    );

    try {
      const result = await Promise.race([runAutomation(city), timeoutPromise]) as { success: boolean; message: string };

      if (result.success) {
        toast({
          title: "Automation Complete",
          description: "New leads have been added to your Google Sheet.",
        });
      } else {
        setError(result.message);
      }
    } catch (e: any) {
       setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} variant="outline">
        <PlayCircle className="mr-2" />
        Run Automation
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Marketing Automation</DialogTitle>
            <DialogDescription>
              Click the button to start generating new leads. This process can take a few minutes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="font-semibold">Automation is running...</h3>
                <p className="text-sm text-muted-foreground">
                  Leads are being added to the sheet one by one. You can safely close this window; the process will continue in the background.
                </p>
              </div>
            ) : (
              <>
                {/* <Select onValueChange={setCity} value={city}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button onClick={handleRunAutomation} className="w-full" disabled={!city}>
                  Run Automation
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
