import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define a set of professional, non-clashing colors for the charts
const CHART_COLORS = ['#3b82f6', '#84cc16', '#f97316', '#a855f7', '#ec4899', '#14b8a6'];

interface AnimatedChartProps {
  /** The type of chart to render */
  chartType: 'bar' | 'pie';
  /** The data array for the chart */
  data: Record<string, any>[];
  /** The key in the data object that represents the category or label (e.g., on the X-axis) */
  categoryKey: string;
  /** The key in the data object that represents the numerical value */
  dataKey: string;
  /** The main title for the chart card */
  title: string;
  /** An optional description displayed below the title */
  description?: string;
  /** Optional additional CSS classes for the container */
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-bold">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


const AnimatedChart: React.FC<AnimatedChartProps> = ({
  chartType,
  data,
  categoryKey,
  dataKey,
  title,
  description,
  className,
}) => {
  console.log(`AnimatedChart loaded: ${title}`);

  const renderBarChart = () => (
    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis
        dataKey={categoryKey}
        tickLine={false}
        axisLine={false}
        stroke="#888888"
        fontSize={12}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        stroke="#888888"
        fontSize={12}
        tickFormatter={(value) => `${value}`}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', radius: 4 }} />
      <Legend iconSize={12} />
      <Bar dataKey={dataKey} fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} isAnimationActive={true} />
    </BarChart>
  );

  const renderPieChart = () => (
    <PieChart>
      <Tooltip content={<CustomTooltip />} />
      <Legend iconSize={12} />
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={categoryKey}
        isAnimationActive={true}
        animationDuration={800}
      >
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? renderBarChart() : renderPieChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedChart;