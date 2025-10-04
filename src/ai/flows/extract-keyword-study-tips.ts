'use server';

/**
 * @fileOverview Extracts relevant keywords from a subject and provides study tips.
 *
 * - extractKeywordStudyTips - A function that handles the extraction of keywords and study tips.
 * - ExtractKeywordStudyTipsInput - The input type for the extractKeywordStudyTips function.
 * - ExtractKeywordStudyTipsOutput - The return type for the extractKeywordStudyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeywordStudyTipsInputSchema = z.object({
  subject: z.string().describe('The subject for which to extract keywords and study tips.'),
});
export type ExtractKeywordStudyTipsInput = z.infer<typeof ExtractKeywordStudyTipsInputSchema>;

const ExtractKeywordStudyTipsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('A list of relevant keywords for the subject.'),
  studyTips: z.array(z.string()).describe('A list of study tips related to the keywords and subject.'),
});
export type ExtractKeywordStudyTipsOutput = z.infer<typeof ExtractKeywordStudyTipsOutputSchema>;

export async function extractKeywordStudyTips(input: ExtractKeywordStudyTipsInput): Promise<ExtractKeywordStudyTipsOutput> {
  return extractKeywordStudyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeywordStudyTipsPrompt',
  input: {schema: ExtractKeywordStudyTipsInputSchema},
  output: {schema: ExtractKeywordStudyTipsOutputSchema},
  prompt: `You are an AI study assistant. Extract keywords and provide study tips for the given subject.

Subject: {{{subject}}}

Output a JSON object with the following format:
{
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "studyTips": ["study tip 1", "study tip 2", "study tip 3"]
}
`,
});

const extractKeywordStudyTipsFlow = ai.defineFlow(
  {
    name: 'extractKeywordStudyTipsFlow',
    inputSchema: ExtractKeywordStudyTipsInputSchema,
    outputSchema: ExtractKeywordStudyTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
