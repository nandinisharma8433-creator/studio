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
import { Separator } from './ui/separator';

interface InfoRowProps {
  label: string;
  value: string | string[];
}

function InfoRow({ label, value }: InfoRowProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  
  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className="grid grid-cols-3 gap-2 py-2 text-sm">
      <dt className="font-semibold text-muted-foreground">{label}</dt>
      <dd className="col-span-2">{displayValue}</dd>
    </div>
  );
}

export default function PlantResultCard({ plant }: { plant: Plant }) {
  return (
    <Card className="animate-in fade-in-50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                 <CardTitle className="text-2xl font-headline text-primary">{plant.common_name}</CardTitle>
                <CardDescription className="italic">{plant.scientific_name}</CardDescription>
            </div>
            {plant.conservation_status && plant.conservation_status.toLowerCase() !== 'not evaluated' && (
                 <Badge variant="secondary">{plant.conservation_status}</Badge>
            )}
        </div>
        {plant.synonyms && plant.synonyms.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
                {plant.synonyms.map(synonym => <Badge variant="outline" key={synonym}>{synonym}</Badge>)}
            </div>
        )}
      </CardHeader>
      <CardContent>
         <Accordion type="multiple" defaultValue={['care', 'uses']} className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                <dl className="divide-y">
                  <InfoRow label="Family" value={plant.family} />
                  <InfoRow label="Habitat" value={plant.habitat} />
                  <InfoRow label="Distribution" value={plant.distribution} />
                  <InfoRow label="Flowering" value={plant.flowering_period} />
                  <InfoRow label="Fruiting" value={plant.fruiting_period} />
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none">
                <p>{plant.care_instructions}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="uses">
              <AccordionTrigger>Uses</AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none">
                <p>{plant.uses}</p>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="toxicity">
              <AccordionTrigger>Toxicity</AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none">
                 <p>{plant.toxicities}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="taxonomy">
              <AccordionTrigger>Taxonomy</AccordionTrigger>
              <AccordionContent className="prose-sm max-w-none">
                <p>{plant.taxonomy}</p>
              </AccordionContent>
            </AccordionItem>
         </Accordion>
      </CardContent>
    </Card>
  );
}
