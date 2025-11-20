import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function LeadsHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-auto flex-wrap items-center gap-4 border-b bg-background/80 p-4 backdrop-blur-sm md:h-14 md:flex-nowrap md:p-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Leads
      </h1>
      <div className="ml-auto">
        <Button asChild variant="outline">
          <Link href="https://docs.google.com/spreadsheets/d/1Os9z-_wgpyqqXaG2FOPTDZK5gZHAGFgFzVQvZLmAZjY/edit?gid=1549157347#gid=1549157347" target="_blank">
            <ExternalLink className="mr-2" />
            View All Leads
          </Link>
        </Button>
      </div>
    </header>
  );
}
