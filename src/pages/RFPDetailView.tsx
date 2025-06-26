import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Icons
import { Download, Paperclip, Send } from 'lucide-react';

// Placeholder Data
const rfpDetails = {
  title: 'Innovate Corp Q3 Proposal',
  status: 'Submitted',
  client: 'Innovate Corp',
  value: '$250,000',
  dueDate: '2024-09-15',
  owner: 'Alex Ray',
  description: 'This proposal outlines a comprehensive digital transformation strategy for Innovate Corp, focusing on cloud migration, data analytics, and a new customer relationship management system.'
};

const documents = [
  { id: 1, name: 'RFP_InnovateCorp_Q3_Final.pdf', size: '2.5 MB' },
  { id: 2, name: 'Technical_Specifications.docx', size: '1.2 MB' },
  { id: 3, name: 'Project_Timeline.xlsx', size: '450 KB' },
];

const activityLog = [
  { id: 1, user: 'Alex Ray', action: 'changed status from "In Progress" to "Submitted".', timestamp: '2024-07-29 10:05 AM' },
  { id: 2, user: 'Jane Doe', action: 'added note: "Client requested clarification on section 3.2."', timestamp: '2024-07-28 02:45 PM' },
  { id: 3, user: 'Alex Ray', action: 'uploaded document "Technical_Specifications.docx".', timestamp: '2024-07-27 11:20 AM' },
  { id: 4, user: 'System', action: 'created the RFP.', timestamp: '2024-07-25 09:00 AM' },
];

const RFPDetailView = () => {
  console.log('RFPDetailView loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 flex flex-col">
          {/* Breadcrumb and Header */}
          <div className="flex items-center justify-between">
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/r-f-p-management">RFP Management</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{rfpDetails.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
                <Button>Edit RFP</Button>
            </div>
          </div>

          {/* RFP Title and Status */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold md:text-3xl">{rfpDetails.title}</h1>
            <Badge variant="secondary" className="text-base">{rfpDetails.status}</Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column: Details & Notes */}
            <div className="md:col-span-2 grid gap-6">
                <Tabs defaultValue="overview">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="activity">Activity & Notes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Proposal Overview</CardTitle>
                                <CardDescription>Key details about this RFP.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{rfpDetails.description}</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-medium">Client</p>
                                        <p className="text-muted-foreground">{rfpDetails.client}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Due Date</p>
                                        <p className="text-muted-foreground">{rfpDetails.dueDate}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Proposal Value</p>
                                        <p className="text-muted-foreground">{rfpDetails.value}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Owner</p>
                                        <p className="text-muted-foreground">{rfpDetails.owner}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="documents">
                        <Card>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                                <CardDescription>All files related to this proposal.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {documents.map(doc => (
                                        <li key={doc.id} className="flex items-center justify-between p-2 rounded-md border">
                                            <div className="flex items-center gap-3">
                                                <Paperclip className="h-5 w-5 text-muted-foreground"/>
                                                <div>
                                                    <p className="font-medium">{doc.name}</p>
                                                    <p className="text-sm text-muted-foreground">{doc.size}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="icon">
                                                <Download className="h-4 w-4"/>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="activity">
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity & Notes</CardTitle>
                                <CardDescription>Internal notes and history of changes.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Textarea placeholder="Add a new note..." className="pr-16"/>
                                        <Button size="icon" className="absolute top-2 right-2">
                                            <Send className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <ul className="space-y-4">
                                        {activityLog.map(log => (
                                            <li key={log.id} className="text-sm">
                                                <span className="font-semibold">{log.user}</span>
                                                <span className="text-muted-foreground"> {log.action}</span>
                                                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            
            {/* Right Column: Client Info */}
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p className="font-semibold">{rfpDetails.client}</p>
                        <p className="text-muted-foreground">Primary Contact: John Innovate</p>
                        <p className="text-muted-foreground">john.innovate@example.com</p>
                        <Button variant="outline" className="w-full mt-2">View Client Profile</Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RFPDetailView;