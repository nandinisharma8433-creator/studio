'use server';

import {
  textBasedPlantSearch,
  TextBasedPlantSearchInput,
  TextBasedPlantSearchOutput,
} from '@/ai/flows/text-based-plant-search';
import {
  identifyPlantByImage,
  IdentifyPlantByImageInput,
  IdentifyPlantByImageOutput,
} from '@/ai/flows/image-based-plant-identification';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import type { HistoryPlant } from './types';

type PlantData = TextBasedPlantSearchOutput | IdentifyPlantByImageOutput;

async function saveToHistory(plantData: PlantData) {
  try {
    const docRef = await addDoc(collection(db, 'plants_history'), {
      ...plantData,
      timestamp: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    // Don't re-throw, as failing to save history shouldn't fail the whole search
  }
}

export async function searchPlantByText(
  input: TextBasedPlantSearchInput
): Promise<{ data?: TextBasedPlantSearchOutput; error?: string }> {
  try {
    const result = await textBasedPlantSearch(input);
    if (result) {
      await saveToHistory(result);
      return { data: result };
    }
    return { error: 'Could not find information for this plant.' };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred during the search.' };
  }
}

export async function searchPlantByImage(
  input: IdentifyPlantByImageInput
): Promise<{ data?: IdentifyPlantByImageOutput; error?: string }> {
  try {
    const result = await identifyPlantByImage(input);
    if (result) {
      await saveToHistory(result);
      return { data: result };
    }
    return { error: 'Could not identify the plant from the image.' };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred during image identification.' };
  }
}

export async function getHistory(): Promise<HistoryPlant[]> {
  try {
    const historyCollection = collection(db, 'plants_history');
    const q = query(historyCollection, orderBy('timestamp', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    const history: HistoryPlant[] = [];
    querySnapshot.forEach(doc => {
      history.push({ id: doc.id, ...doc.data() } as HistoryPlant);
    });
    return history;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}
