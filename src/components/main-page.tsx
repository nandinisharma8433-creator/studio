'use client';

import React, { useState, useTransition, useRef } from 'react';
import { Leaf, Search, Image as ImageIcon, Loader, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { searchPlantByText, searchPlantByImage, getHistory } from '@/lib/actions';
import type { Plant, HistoryPlant } from '@/lib/types';
import PlantResultCard from './plant-result-card';
import HistorySidebar from './history-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import FamousPlants from './famous-plants';

export default function MainPage({ initialHistory }: { initialHistory: HistoryPlant[] }) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [history, setHistory] = useState<HistoryPlant[]>(initialHistory);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [isHistorySheetOpen, setIsHistorySheetOpen] = useState(false);

  const performTextSearch = (query: string) => {
    if (!query) return;

    setPlant(null);
    startTransition(async () => {
      const { data, error } = await searchPlantByText({ query });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Search Failed',
          description: error,
        });
      } else if (data) {
        setPlant(data);
        refreshHistory();
      }
    });
  };

  const handleTextSearch = (formData: FormData) => {
    const query = formData.get('query') as string;
    performTextSearch(query);
  };

  const handleImageSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const photoDataUri = e.target?.result as string;
      if (!photoDataUri) return;

      setPlant(null);
      startTransition(async () => {
        const { data, error } = await searchPlantByImage({ photoDataUri });
        if (error) {
          toast({
            variant: 'destructive',
            title: 'Identification Failed',
            description: error,
          });
        } else if (data) {
          setPlant(data);
          refreshHistory();
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const refreshHistory = async () => {
    const updatedHistory = await getHistory();
    setHistory(updatedHistory);
  };
  
  const handleHistorySelect = (selectedPlant: HistoryPlant) => {
    setPlant(selectedPlant);
    if(isMobile) {
      setIsHistorySheetOpen(false);
    }
  };

  const HistoryContent = (
    <HistorySidebar
      history={history}
      onSelect={handleHistorySelect}
      onRefresh={refreshHistory}
    />
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="flex items-center justify-between p-4 border-b bg-card shadow-sm">
        <div className="flex items-center gap-3">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary font-headline tracking-tight">FloraSnap</h1>
        </div>
        {isMobile && (
          <Sheet open={isHistorySheetOpen} onOpenChange={setIsHistorySheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm p-0">
               <SheetHeader className="p-4 border-b">
                <SheetTitle>Search History</SheetTitle>
              </SheetHeader>
              <div className="p-4">{HistoryContent}</div>
            </SheetContent>
          </Sheet>
        )}
      </header>

      <div className="flex-1 w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_380px] gap-8 p-4 md:p-8">
        <main>
          <Card className="overflow-hidden">
            <CardContent className="p-4 md:p-6">
              <Tabs defaultValue="text">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">
                    <Search className="w-4 h-4 mr-2" /> Search by Name
                  </TabsTrigger>
                  <TabsTrigger value="image">
                    <ImageIcon className="w-4 h-4 mr-2" /> Identify by Image
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-6">
                  <form action={handleTextSearch} className="flex gap-2">
                    <Input name="query" placeholder="e.g., Mango or आम" required className="text-base" />
                    <Button type="submit" disabled={isPending}>
                      <Search className="w-4 h-4 mr-2" /> Search
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="image" className="mt-6">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageSearch}
                    disabled={isPending}
                  />
                  <Button onClick={() => fileInputRef.current?.click()} className="w-full" disabled={isPending}>
                    <ImageIcon className="w-4 h-4 mr-2" /> Upload an Image
                  </Button>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    Works best with clear photos of leaves or flowers.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8">
            {isPending && (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center rounded-lg bg-card/80">
                <Loader className="w-12 h-12 animate-spin text-primary" />
                <p className="font-semibold text-lg">Analyzing...</p>
                <p className="text-sm text-muted-foreground">Our AI botanist is taking a look.</p>
              </div>
            )}
            {plant && !isPending && <PlantResultCard plant={plant} />}
            {!plant && !isPending && (
              <FamousPlants onPlantClick={performTextSearch} />
            )}
          </div>
        </main>
        
        {!isMobile && (
          <aside className="hidden md:block">
            {HistoryContent}
          </aside>
        )}
      </div>
    </div>
  );
}
