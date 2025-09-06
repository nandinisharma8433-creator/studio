import type { Timestamp } from 'firebase/firestore';
import type { TextBasedPlantSearchOutput } from '@/ai/flows/text-based-plant-search';

export type Plant = TextBasedPlantSearchOutput;

export interface HistoryPlant extends Plant {
  id: string;
  timestamp: Timestamp;
}
