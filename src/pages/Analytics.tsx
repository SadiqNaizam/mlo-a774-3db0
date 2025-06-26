import React, { useState } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import AnimatedChart from '@/components/AnimatedChart';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Placeholder data for the charts
const salesByMonthData = [
  { month: "Jan", sales: 25000 },
  { month: "Feb", sales: 32000 },
  { month: "Mar", sales: 45000 },
  { month: "Apr", sales: 28000 },
  { month: "May", sales: 51000 },
  { month: "Jun", sales: 48000 },
];

const winLossData = [
  { name: 'Won', value: 78 },
  { name: 'Lost', value: 22 },
  { name: 'Pending', value: 15 },
];

const rfpCycleTimeData = [
    { quarter: "Q1 '23", days: 34 },
    { quarter: "Q2 '23", days: 28 },
    { quarter: "Q3 '23", days: 31 },
    { quarter: "Q4 '23", days: 25 },
    { quarter: "Q1 '24", days: 22 },
];

const rfpBySourceData = [
    { name: 'Referral', value: 45 },
    { name: 'Direct Inquiry', value: 30 },
    { name: 'Marketing Campaign', value: 25 },
];


const Analytics = () => {
  console.log('Analytics page loaded');
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 sm:p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics & Reporting</h1>
            </div>

            {/* Filters Card */}
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine the data displayed in the charts below.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <div className="grid gap-2">
                        <Select defaultValue="overview">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a report" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="overview">Sales Overview</SelectItem>
                            <SelectItem value="performance">Team Performance</SelectItem>
                            <SelectItem value="pipeline">Pipeline Health</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            />
                        </PopoverContent>
                        </Popover>
                    </div>
                    <Button>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            {/* Charts Grid */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <AnimatedChart
                chartType="bar"
                data={salesByMonthData}
                categoryKey="month"
                dataKey="sales"
                title="Monthly Sales Performance"
                description="Total value of contracts won per month."
                className="shadow-sm"
              />
              <AnimatedChart
                chartType="pie"
                data={winLossData}
                categoryKey="name"
                dataKey="value"
                title="RFP Win/Loss Ratio"
                description="The outcome of all finalized proposals."
                className="shadow-sm"
              />
              <AnimatedChart
                chartType="bar"
                data={rfpCycleTimeData}
                categoryKey="quarter"
                dataKey="days"
                title="Average RFP Cycle Time (Days)"
                description="Average time from RFP receipt to final decision."
                className="shadow-sm"
              />
              <AnimatedChart
                chartType="pie"
                data={rfpBySourceData}
                categoryKey="name"
                dataKey="value"
                title="Proposals by Source"
                description="Origin of incoming requests for proposal."
                className="shadow-sm"
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;