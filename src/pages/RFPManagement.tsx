import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import KanbanBoard from '@/components/KanbanBoard';
import MultiStepWizard from '@/components/MultiStepWizard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Placeholder data for the Table view
const rfpTableData = [
  { id: '1', title: 'Innovate Corp Q3 Proposal', client: 'Innovate Corp', value: 75000, status: 'In Progress' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '2', title: 'Synergy Solutions Website Redesign', client: 'Synergy Solutions', value: 120000, status: 'New' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '3', title: 'TechGenius IT Support Contract', client: 'TechGenius Inc.', value: 50000, status: 'New' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '4', title: 'Global-Trade Logistics Platform', client: 'Global-Trade', value: 250000, status: 'Submitted' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '5', title: 'DataDriven Analytics Dashboard', client: 'DataDriven LLC', value: 95000, status: 'In Progress' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '6', title: 'Apex Industries Marketing Campaign', client: 'Apex Industries', value: 45000, status: 'Lost' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
  { id: '7', title: 'QuantumLeap Software Suite', client: 'QuantumLeap', value: 300000, status: 'Won' as 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' },
];

// Placeholder components for the wizard steps
const Step1 = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="clientName">Client Name</Label>
      <Input id="clientName" placeholder="e.g., Innovate Corp" />
    </div>
    <div>
      <Label htmlFor="contactPerson">Contact Person</Label>
      <Input id="contactPerson" placeholder="e.g., Jane Doe" />
    </div>
  </div>
);

const Step2 = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="rfpTitle">RFP Title</Label>
      <Input id="rfpTitle" placeholder="e.g., Q4 Marketing Campaign" />
    </div>
    <div>
      <Label htmlFor="proposalValue">Proposal Value ($)</Label>
      <Input id="proposalValue" type="number" placeholder="e.g., 50000" />
    </div>
  </div>
);

const Step3 = () => (
    <div className="text-center">
        <h3 className="text-lg font-semibold">Review Details</h3>
        <p className="text-muted-foreground">Please review the information before submission.</p>
        <p className="mt-4">This is a placeholder for the summary of entered data.</p>
    </div>
);


const RFPManagement = () => {
  console.log('RFPManagement loaded');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const wizardSteps = [
    { name: 'Client Info', component: <Step1 /> },
    { name: 'Proposal Details', component: <Step2 /> },
    { name: 'Review', component: <Step3 /> },
  ];

  const handleWizardFinish = () => {
    // In a real app, you would submit the data here
    setIsWizardOpen(false);
    toast.success("New RFP has been successfully created!");
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Won':
        return 'default'; // Green in default variant
      case 'In Progress':
      case 'Submitted':
        return 'secondary';
      case 'Lost':
        return 'destructive';
      default:
        return 'outline';
    }
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">RFP Management</h1>
            <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New RFP
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0">
                  <MultiStepWizard 
                    steps={wizardSteps} 
                    onFinish={handleWizardFinish}
                    title="Create New RFP"
                    finishButtonText="Create RFP"
                  />
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="kanban">
            <TabsList>
              <TabsTrigger value="kanban">Kanban View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            <TabsContent value="kanban" className="h-[calc(100vh-220px)]">
              <KanbanBoard />
            </TabsContent>
            <TabsContent value="table">
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RFP Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rfpTableData.map((rfp) => (
                        <TableRow key={rfp.id}>
                          <TableCell className="font-medium">{rfp.title}</TableCell>
                          <TableCell>{rfp.client}</TableCell>
                          <TableCell>${new Intl.NumberFormat('en-US').format(rfp.value)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(rfp.status)}>{rfp.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RFPManagement;