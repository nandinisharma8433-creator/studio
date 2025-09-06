'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Plant } from '@/lib/types';
import Image from 'next/image';

interface InfoRowProps {
  label: string;
  value: string | string[];
}

function InfoRow({ label, value }: InfoRowProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  
  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className="grid grid-cols-3 gap-2 py-3 text-sm border-b">
      <dt className="font-semibold text-muted-foreground">{label}</dt>
      <dd className="col-span-2">{displayValue}</dd>
    </div>
  );
}

export default function PlantResultCard({ plant }: { plant: Plant }) {
  return (
    <Card className="animate-in fade-in-50 overflow-hidden">
      <CardHeader className="bg-secondary/30">
        <div className="flex items-start justify-between gap-4">
            <div>
                 <CardTitle className="text-3xl font-headline text-primary">{plant.common_name}</CardTitle>
                <CardDescription className="italic text-base font-body">{plant.scientific_name}</CardDescription>
            </div>
            {plant.conservation_status && plant.conservation_status.toLowerCase() !== 'not evaluated' && (
                 <Badge variant="secondary" className="text-sm">{plant.conservation_status}</Badge>
            )}
        </div>
        {plant.synonyms && plant.synonyms.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
                {plant.synonyms.map(synonym => <Badge variant="outline" key={synonym}>{synonym}</Badge>)}
            </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="mb-6">
            <Image 
                src="https://picsum.photos/800/600"
                alt={`Image of ${plant.common_name}`}
                width={800}
                height={600}
                className="object-cover w-full aspect-[4/3]"
                data-ai-hint={`${plant.common_name}`}
            />
        </div>
        <div className="px-6 pb-6">
         <Accordion type="multiple" defaultValue={['care', 'uses']} className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-headline">Details</AccordionTrigger>
              <AccordionContent>
                <dl>
                  <InfoRow label="Family" value={plant.family} />
                  <InfoRow label="Habitat" value={plant.habitat} />
                  <InfoRow label="Distribution" value={plant.distribution} />
                  <InfoRow label="Flowering" value={plant.flowering_period} />
                  <InfoRow label="Fruiting" value={plant.fruiting_period} />
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-headline">Care Instructions</AccordionTrigger>
              <AccordionContent className="prose prose-sm max-w-none pt-2">
                <p>{plant.care_instructions}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="uses">
              <AccordionTrigger className="text-lg font-headline">Uses</AccordionTrigger>
              <AccordionContent className="prose prose-sm max-w-none pt-2">
                <p>{plant.uses}</p>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="toxicity">
              <AccordionTrigger className="text-lg font-headline">Toxicity</AccordionTrigger>
              <AccordionContent className="prose prose-sm max-w-none pt-2">
                 <p>{plant.toxicities}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="taxonomy">
              <AccordionTrigger className="text-lg font-headline">Taxonomy</AccordionTrigger>
              <AccordionContent className="prose prose-sm max-w-none pt-2">
                <p>{plant.taxonomy}</p>
              </AccordionContent>
            </AccordionItem>
         </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
