import React from 'react';
import { DollarSign, Target, FileText, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import AnimatedChart from '@/components/AnimatedChart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

// Placeholder data for charts and tables
const rfpValueByStageData = [
  { stage: 'Prospect', value: 120000 },
  { stage: 'In Progress', value: 350000 },
  { stage: 'Submitted', value: 210000 },
  { stage: 'Won', value: 580000 },
];

const rfpStatusData = [
  { status: 'Won', count: 15 },
  { status: 'Lost', count: 5 },
  { status: 'In Progress', count: 22 },
];

const recentRFPs = [
  { id: 'RFP-001', client: 'Innovate Corp', value: 75000, status: 'Submitted' as 'Submitted' | 'Won' | 'In Progress', dueDate: '2024-08-15' },
  { id: 'RFP-002', client: 'Quantum Solutions', value: 120000, status: 'In Progress' as 'Submitted' | 'Won' | 'In Progress', dueDate: '2024-09-01' },
  { id: 'RFP-003', client: 'DataWeavers Inc.', value: 250000, status: 'Won' as 'Submitted' | 'Won' | 'In Progress', dueDate: '2024-07-20' },
  { id: 'RFP-004', client: 'Synergy Partners', value: 50000, status: 'In Progress' as 'Submitted' | 'Won' | 'In Progress', dueDate: '2024-08-25' },
];

const Dashboard = () => {
  console.log('Dashboard page loaded');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Won':
        return <Badge variant="default" className="bg-emerald-500 text-white"><CheckCircle className="mr-1 h-3 w-3" />{status}</Badge>;
      case 'Submitted':
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />{status}</Badge>;
      case 'In Progress':
        return <Badge variant="outline">{status}</Badge>;
      case 'Lost':
         return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
       {/* Note: CollapsibleSidebar is designed to be self-handling for different screen sizes */}
      <CollapsibleSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40 overflow-auto">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          </div>
          
          {/* Metric Cards Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
            <MetricCard
              title="Total RFP Value"
              metric="$1.2M"
              icon={<DollarSign className="h-5 w-5" />}
              linkTo="/analytics"
              change="+15.2% from last month"
              changeType="positive"
            />
            <MetricCard
              title="Success Rate"
              metric="75%"
              icon={<Target className="h-5 w-5" />}
              linkTo="/analytics"
              change="+3.1% from last month"
              changeType="positive"
            />
            <MetricCard
              title="Active RFPs"
              metric="22"
              icon={<FileText className="h-5 w-5" />}
              linkTo="/r-f-p-management"
              change="-2 from last week"
              changeType="negative"
            />
            <MetricCard
              title="New Clients"
              metric="4"
              icon={<Users className="h-5 w-5" />}
              linkTo="/client-management"
              change="+1 this month"
            />
          </section>

          {/* Charts Section */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <AnimatedChart
              chartType="bar"
              data={rfpValueByStageData}
              categoryKey="stage"
              dataKey="value"
              title="RFP Value by Stage"
              description="Total potential value of RFPs in each stage."
              className="lg:col-span-3"
            />
            <AnimatedChart
              chartType="pie"
              data={rfpStatusData}
              categoryKey="status"
              dataKey="count"
              title="RFP Status Overview"
              description="A summary of all proposal outcomes."
              className="lg:col-span-2"
            />
          </section>

           {/* Recent RFPs Table Section */}
          <section className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent RFPs</CardTitle>
                <CardDescription>A list of the most recently updated proposals.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRFPs.map((rfp) => (
                      <TableRow key={rfp.id}>
                        <TableCell>
                          <Link to="/r-f-p-detail" className="font-medium hover:underline">{rfp.client}</Link>
                        </TableCell>
                        <TableCell>${rfp.value.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(rfp.status)}</TableCell>
                        <TableCell className="text-right">{rfp.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;