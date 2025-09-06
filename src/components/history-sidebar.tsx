'use client';

import { useState, useEffect } from 'react';
import { HistoryPlant } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistorySidebarProps {
  history: HistoryPlant[];
  onSelect: (plant: HistoryPlant) => void;
  onRefresh: () => void;
}

function HistoryItem({ item, onSelect }: { item: HistoryPlant; onSelect: (plant: HistoryPlant) => void }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (item.timestamp) {
      setTimeAgo(formatDistanceToNow(new Date(item.timestamp), { addSuffix: true }));
    }
  }, [item.timestamp]);

  return (
    <li>
      <button
        onClick={() => onSelect(item)}
        className="w-full p-3 text-left transition-colors rounded-md hover:bg-secondary"
      >
        <p className="font-semibold truncate">{item.common_name}</p>
        {timeAgo && <p className="text-xs text-muted-foreground">{timeAgo}</p>}
      </button>
    </li>
  );
}

export default function HistorySidebar({ history, onSelect, onRefresh }: HistorySidebarProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card className="h-full flex flex-col bg-light-green">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-headline text-forest-green">Search History</CardTitle>
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 text-forest-green" />
          <span className="sr-only">Refresh history</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 pt-0">
            {history.length === 0 ? (
              <p className="text-sm text-center text-muted-foreground py-10">
                Your search history will appear here.
              </p>
            ) : (
              <ul className="space-y-2">
                {isClient && history.map(item => (
                  <HistoryItem key={item.id} item={item} onSelect={onSelect} />
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
