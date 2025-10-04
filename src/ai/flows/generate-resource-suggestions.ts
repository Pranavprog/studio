'use server';

/**
 * @fileOverview Generates resource suggestions for a given subject.
 *
 * - generateResourceSuggestions - A function that handles the resource suggestion generation process.
 * - GenerateResourceSuggestionsInput - The input type for the generateResourceSuggestions function.
 * - GenerateResourceSuggestionsOutput - The return type for the generateResourceSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateResourceSuggestionsInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate resource suggestions.'),
});
export type GenerateResourceSuggestionsInput = z.infer<typeof GenerateResourceSuggestionsInputSchema>;

const ResourceSchema = z.object({
    title: z.string().describe('The title of the resource.'),
    url: z.string().url().describe('The URL of the resource.'),
    type: z.enum(['video', 'article', 'book']).describe('The type of the resource.'),
});

const GenerateResourceSuggestionsOutputSchema = z.object({
  suggestions: z.array(ResourceSchema).describe('A list of resource suggestions.'),
});
export type GenerateResourceSuggestionsOutput = z.infer<typeof GenerateResourceSuggestionsOutputSchema>;
export type ResourceSuggestion = z.infer<typeof ResourceSchema>;


export async function generateResourceSuggestions(input: GenerateResourceSuggestionsInput): Promise<GenerateResourceSuggestionsOutput> {
  return generateResourceSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResourceSuggestionsPrompt',
  input: { schema: GenerateResourceSuggestionsInputSchema },
  output: { schema: GenerateResourceSuggestionsOutputSchema },
  prompt: `You are an AI assistant designed to help students find learning materials. Generate a list of 1-3 high-quality, relevant resource suggestions for the given subject.

Subject: {{{subject}}}

For each resource, provide a title, a valid URL, and its type (video, article, or book). Ensure the output is a valid JSON object matching the prescribed schema.`,
});

const generateResourceSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateResourceSuggestionsFlow',
    inputSchema: GenerateResourceSuggestionsInputSchema,
    outputSchema: GenerateResourceSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
