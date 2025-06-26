import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

type RFPStatus = 'New' | 'In Progress' | 'Submitted' | 'Won' | 'Lost';

interface RFP {
  id: string;
  title: string;
  client: string;
  value: number;
  column: RFPStatus;
}

const INITIAL_CARDS: RFP[] = [
  { id: '1', title: 'Innovate Corp Q3 Proposal', client: 'Innovate Corp', value: 75000, column: 'In Progress' },
  { id: '2', title: 'Synergy Solutions Website Redesign', client: 'Synergy Solutions', value: 120000, column: 'New' },
  { id: '3', title: 'TechGenius IT Support Contract', client: 'TechGenius Inc.', value: 50000, column: 'New' },
  { id: '4', title: 'Global-Trade Logistics Platform', client: 'Global-Trade', value: 250000, column: 'Submitted' },
  { id: '5', title: 'DataDriven Analytics Dashboard', client: 'DataDriven LLC', value: 95000, column: 'In Progress' },
  { id: '6', title: 'Apex Industries Marketing Campaign', client: 'Apex Industries', value: 45000, column: 'Lost' },
  { id: '7', title: 'QuantumLeap Software Suite', client: 'QuantumLeap', value: 300000, column: 'Won' },
];

const COLUMNS: RFPStatus[] = ['New', 'In Progress', 'Submitted', 'Won', 'Lost'];

const KanbanBoard: React.FC = () => {
  const [cards, setCards] = useState<RFP[]>(INITIAL_CARDS);
  console.log('KanbanBoard loaded');

  const handleDragEnd = (info: PanInfo, item: RFP) => {
    const dropPoint = { x: info.point.x, y: info.point.y };
    const columnElements = document.querySelectorAll('.kanban-column');
    
    let targetColumn: RFPStatus | null = null;
    
    columnElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (
        dropPoint.x > rect.left &&
        dropPoint.x < rect.right &&
        dropPoint.y > rect.top &&
        dropPoint.y < rect.bottom
      ) {
        targetColumn = el.getAttribute('data-column') as RFPStatus;
      }
    });

    if (targetColumn && item.column !== targetColumn) {
      setCards(prev =>
        prev.map(c => (c.id === item.id ? { ...c, column: targetColumn! } : c))
      );
      toast.success(`Moved "${item.title}" to ${targetColumn}`);
    }
  };

  return (
    <div className="flex h-full w-full gap-4 p-4 bg-background">
      {COLUMNS.map(column => (
        <Column
          key={column}
          title={column}
          cards={cards.filter(c => c.column === column)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

interface ColumnProps {
  title: RFPStatus;
  cards: RFP[];
  onDragEnd: (info: PanInfo, item: RFP) => void;
}

const Column: React.FC<ColumnProps> = ({ title, cards, onDragEnd }) => {
  return (
    <div
      data-column={title}
      className="kanban-column flex-1 flex flex-col bg-muted/50 rounded-lg"
    >
      <div className="p-3 border-b sticky top-0 z-10 bg-muted/50 rounded-t-lg">
        <h3 className="text-lg font-semibold text-foreground flex items-center justify-between">
          {title}
          <Badge variant="secondary" className="text-sm">{cards.length}</Badge>
        </h3>
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {cards.map(card => (
            <RfpCard key={card.id} card={card} onDragEnd={onDragEnd} />
          ))}
          {cards.length === 0 && (
             <div className="flex items-center justify-center h-24 text-sm text-muted-foreground">
              Drop cards here
             </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

interface RfpCardProps {
  card: RFP;
  onDragEnd: (info: PanInfo, item: RFP) => void;
}

const RfpCard: React.FC<RfpCardProps> = ({ card, onDragEnd }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(_event, info) => onDragEnd(info, card)}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-4">
          <CardTitle className="text-base font-bold hover:text-primary">
            <Link to="/r-f-p-detail">{card.title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-2">{card.client}</p>
          <div className="flex items-center text-sm font-semibold text-green-600">
            <CircleDollarSign className="h-4 w-4 mr-1.5" />
            {new Intl.NumberFormat('en-US').format(card.value)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KanbanBoard;