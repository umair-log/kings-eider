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
import {
    Users,
    Mail,
    Eye,
    MessageSquareReply,
    MousePointerClick,
    Ban,
    MailX,
    CheckCircle,
    DollarSign,
    Briefcase,
    Zap,
} from "lucide-react";
import type { Campaign } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CampaignTableProps = {
  data: Campaign[];
};

const CampaignStatusBadge = ({ status }: { status: number }) => {
  switch (status) {
    case 1:
      return <Badge variant="default">Active</Badge>;
    default:
      return <Badge variant="secondary">Inactive</Badge>;
  }
};

const headers = [
    { icon: Users, tooltip: "Leads" },
    { icon: Mail, tooltip: "Contacted" },
    { icon: Eye, tooltip: "Opened" },
    { icon: MessageSquareReply, tooltip: "Replied" },
    { icon: MousePointerClick, tooltip: "Link Clicks" },
    { icon: Ban, tooltip: "Bounced" },
    { icon: MailX, tooltip: "Unsubscribed" },
    { icon: CheckCircle, tooltip: "Completed" },
    { icon: Briefcase, tooltip: "Opportunities" },
    { icon: DollarSign, tooltip: "Opportunity Value" }
];

export function CampaignTable({ data }: CampaignTableProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>
            No campaign data found for the selected date range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <Zap className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">No Results</h3>
            <p className="text-muted-foreground">Try adjusting the date filter to see your campaign data.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaigns</CardTitle>
        <CardDescription>
          A detailed breakdown of all campaigns in the selected period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
            <div className="w-full overflow-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[200px]">Campaign</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Evergreen</TableHead>
                        {headers.map(h => (
                             <TableHead key={h.tooltip} className="text-center">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="mx-auto flex h-8 w-8 items-center justify-center">
                                            <h.icon className="h-5 w-5" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{h.tooltip}</p></TooltipContent>
                                </Tooltip>
                            </TableHead>
                        ))}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.map((campaign) => (
                        <TableRow key={campaign.campaign_id}>
                            <TableCell className="font-medium">{campaign.campaign_name}</TableCell>
                            <TableCell><CampaignStatusBadge status={campaign.campaign_status} /></TableCell>
                            <TableCell><Badge variant={campaign.campaign_is_evergreen ? "outline" : "secondary"}>{campaign.campaign_is_evergreen ? "Yes" : "No"}</Badge></TableCell>
                            <TableCell className="text-center">{campaign.leads_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.contacted_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.open_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.reply_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.link_click_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.bounced_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.unsubscribed_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.completed_count.toLocaleString()}</TableCell>
                            <TableCell className="text-center">{campaign.total_opportunities.toLocaleString()}</TableCell>
                            <TableCell className="text-center">${campaign.total_opportunity_value.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
