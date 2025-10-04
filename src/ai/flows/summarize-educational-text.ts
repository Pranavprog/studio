'use server';

/**
 * @fileOverview Summarizes a short educational text.
 *
 * - summarizeEducationalText - A function that handles the text summarization process.
 * - SummarizeEducationalTextInput - The input type for the summarizeEducationalText function.
 * - SummarizeEducationalTextOutput - The return type for the summarizeEducationalText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEducationalTextInputSchema = z.object({
  educationalText: z.string().describe('The educational text to summarize.'),
});
export type SummarizeEducationalTextInput = z.infer<typeof SummarizeEducationalTextInputSchema>;

const SummarizeEducationalTextOutputSchema = z.object({
  summary: z.string().describe('The summary of the educational text.'),
});
export type SummarizeEducationalTextOutput = z.infer<typeof SummarizeEducationalTextOutputSchema>;

export async function summarizeEducationalText(
  input: SummarizeEducationalTextInput
): Promise<SummarizeEducationalTextOutput> {
  return summarizeEducationalTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEducationalTextPrompt',
  input: {schema: SummarizeEducationalTextInputSchema},
  output: {schema: SummarizeEducationalTextOutputSchema},
  prompt: `Summarize the following educational text:\n\n{{{educationalText}}}`,
});

const summarizeEducationalTextFlow = ai.defineFlow(
  {
    name: 'summarizeEducationalTextFlow',
    inputSchema: SummarizeEducationalTextInputSchema,
    outputSchema: SummarizeEducationalTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Educational text was summarized.',
    };
  }
);
