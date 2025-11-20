import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import type { Lead } from "@/lib/types";

type LeadsTableProps = {
  data: Lead[];
};

export function LeadsTable({ data }: LeadsTableProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <CardDescription>
            No leads found.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <Zap className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Results</h3>
            <p className="text-muted-foreground">Could not find any leads.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const tableHeaders = [
    "Owner Name",
    "Address",
    "Property Type",
    "Emails",
    "Phones",
    "AI Message",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
        <CardDescription>
          Showing the last 50 leads. To view all leads, click the button in the header.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((lead) => (
                <TableRow key={lead.row_number}>
                  <TableCell className="font-medium">{lead["Property Owner Name"]}</TableCell>
                  <TableCell>{lead.Line1}, {lead.Line2}</TableCell>
                  <TableCell>{lead["Property Type"]}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        {(lead["All Emails"] || "").split(',').filter(e => e).map((email) => (
                            <Badge key={email} variant="outline" className="mb-1 w-fit">{email}</Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>{lead.Phone}</TableCell>
                  <TableCell>{lead["AI Message"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
