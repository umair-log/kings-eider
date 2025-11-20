import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MailCheck, Send } from "lucide-react";
import type { Campaign } from "@/lib/types";

type OverviewStatsProps = {
  data: Campaign[];
};

export function OverviewStats({ data }: OverviewStatsProps) {
  const totals = data.reduce(
    (acc, campaign) => {
      acc.leads += campaign.leads_count;
      acc.contacted += campaign.contacted_count;
      acc.sent += campaign.emails_sent_count;
      return acc;
    },
    { leads: 0, contacted: 0, sent: 0 }
  );

  const stats = [
    { title: "Total Leads", value: totals.leads, icon: Users },
    { title: "Total Contacted", value: totals.contacted, icon: MailCheck },
    { title: "Emails Sent", value: totals.sent, icon: Send },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
