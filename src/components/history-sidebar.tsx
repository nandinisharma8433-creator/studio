'use client';

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

export default function HistorySidebar({ history, onSelect, onRefresh }: HistorySidebarProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Search History</CardTitle>
        <Button variant="ghost" size="icon" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4" />
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
                {history.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelect(item)}
                      className="w-full p-3 text-left transition-colors rounded-md hover:bg-secondary"
                    >
                      <p className="font-semibold truncate">{item.common_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.timestamp && formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
