'use server';
/**
 * @fileOverview Text-based plant search flow.
 *
 * - textBasedPlantSearch - A function that handles searching for plants by name.
 * - TextBasedPlantSearchInput - The input type for the textBasedPlantSearch function.
 * - TextBasedPlantSearchOutput - The return type for the textBasedPlantSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextBasedPlantSearchInputSchema = z.object({
  query: z.string().describe('The name of the plant to search for (English or Hindi).'),
});
export type TextBasedPlantSearchInput = z.infer<typeof TextBasedPlantSearchInputSchema>;

const TextBasedPlantSearchOutputSchema = z.object({
  common_name: z.string().describe('The common name of the plant.'),
  scientific_name: z.string().describe('The scientific name of the plant.'),
  family: z.string().describe('The family of the plant.'),
  synonyms: z.array(z.string()).describe('A list of synonyms for the plant.'),
  taxonomy: z.string().describe('The taxonomy of the plant.'),
  habitat: z.string().describe('The habitat of the plant.'),
  distribution: z.string().describe('The distribution of the plant.'),
  flowering_period: z.string().describe('The flowering period of the plant.'),
  fruiting_period: z.string().describe('The fruiting period of the plant.'),
  care_instructions: z.string().describe('Care instructions for the plant.'),
  uses: z.string().describe('The uses of the plant.'),
  toxicities: z.string().describe('The toxicities of the plant.'),
  conservation_status: z.string().describe('The conservation status of the plant.'),
});
export type TextBasedPlantSearchOutput = z.infer<typeof TextBasedPlantSearchOutputSchema>;

export async function textBasedPlantSearch(input: TextBasedPlantSearchInput): Promise<TextBasedPlantSearchOutput> {
  return textBasedPlantSearchFlow(input);
}

const textBasedPlantSearchPrompt = ai.definePrompt({
  name: 'textBasedPlantSearchPrompt',
  input: {schema: TextBasedPlantSearchInputSchema},
  output: {schema: TextBasedPlantSearchOutputSchema},
  prompt: `You are an expert botanist. Return the plant information in JSON format, based on the following search query.\n\nQuery: {{{query}}}\n\nEnsure the JSON response is clean and without code blocks.  The JSON should conform to the following schema:\n\n{
  "common_name": "",
  "scientific_name": "",
  "family": "",
  "synonyms": [],
  "taxonomy": "",
  "habitat": "",
  "distribution": "",
  "flowering_period": "",
  "fruiting_period": "",
  "care_instructions": "",
  "uses": "",
  "toxicities": "",
  "conservation_status": ""
}`,
});

const textBasedPlantSearchFlow = ai.defineFlow(
  {
    name: 'textBasedPlantSearchFlow',
    inputSchema: TextBasedPlantSearchInputSchema,
    outputSchema: TextBasedPlantSearchOutputSchema,
  },
  async input => {
    const {output} = await textBasedPlantSearchPrompt(input);
    return output!;
  }
);
