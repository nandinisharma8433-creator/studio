'use server';
/**
 * @fileOverview Image-based plant identification flow.
 *
 * - identifyPlantByImage - A function that takes a plant image and returns detailed plant information.
 * - IdentifyPlantByImageInput - The input type for the identifyPlantByImage function.
 * - IdentifyPlantByImageOutput - The return type for the identifyPlantByImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPlantByImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyPlantByImageInput = z.infer<typeof IdentifyPlantByImageInputSchema>;

const IdentifyPlantByImageOutputSchema = z.object({
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
export type IdentifyPlantByImageOutput = z.infer<typeof IdentifyPlantByImageOutputSchema>;

export async function identifyPlantByImage(input: IdentifyPlantByImageInput): Promise<IdentifyPlantByImageOutput> {
  return identifyPlantByImageFlow(input);
}

const identifyPlantByImagePrompt = ai.definePrompt({
  name: 'identifyPlantByImagePrompt',
  input: {schema: IdentifyPlantByImageInputSchema},
  output: {schema: IdentifyPlantByImageOutputSchema},
  prompt: `You are an expert botanist.  Given a photo of a plant, identify the plant and provide detailed information about it in JSON format. Do not include any information besides the JSON output.

      Output should include the following fields:
      - common_name
      - scientific_name
      - family
      - synonyms (an array of strings)
      - taxonomy
      - habitat
      - distribution
      - flowering_period
      - fruiting_period
      - care_instructions
      - uses
      - toxicities
      - conservation_status

  Here is the plant photo:
  {{media url=photoDataUri}}
  `,
});

const identifyPlantByImageFlow = ai.defineFlow(
  {
    name: 'identifyPlantByImageFlow',
    inputSchema: IdentifyPlantByImageInputSchema,
    outputSchema: IdentifyPlantByImageOutputSchema,
  },
  async input => {
    const {output} = await identifyPlantByImagePrompt(input);
    return output!;
  }
);
