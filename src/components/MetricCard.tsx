import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface MetricCardProps {
  title: string;
  metric: string | number;
  icon: React.ReactNode;
  linkTo: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  icon,
  linkTo,
  change,
  changeType
}) => {
  console.log('MetricCard loaded for:', title);

  const changeColorClass = changeType === 'positive'
    ? 'text-emerald-500'
    : changeType === 'negative'
    ? 'text-red-500'
    : 'text-muted-foreground';

  return (
    <Link to={linkTo} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metric}</div>
          {change && (
            <p className={`text-xs ${changeColorClass}`}>
              {change}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default MetricCard;