import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Home,
  FileText,
  BarChart3,
  Users,
  ChevronLeft,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: "/", icon: Home, label: "Dashboard" },
  { to: "/r-f-p-management", icon: FileText, label: "Active RFPs" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/client-management", icon: Users, label: "Clients" },
];

const CollapsibleSidebar: React.FC = () => {
  console.log('CollapsibleSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={cn(
      "hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <LayoutGrid className="h-6 w-6 text-primary" />
          {!isCollapsed && <span className="">RFP Streamline</span>}
        </NavLink>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-4 py-4">
        {navItems.map((item) => {
          const content = (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={item.to} delayDuration={0}>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          }
          return content;
        })}
      </nav>
      <div className="mt-auto p-4 border-t">
        <Button variant="ghost" onClick={toggleSidebar} className="w-full justify-center">
          <ChevronLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
    </aside>
  );
};

export default CollapsibleSidebar;