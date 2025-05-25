import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface DashboardCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard = ({
  icon,
  title,
  value,
  description,
  trend,
  trendUp,
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon name={icon as any} className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <p
            className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
          >
            <Icon
              name={trendUp ? "TrendingUp" : "TrendingDown"}
              className="h-3 w-3"
            />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
