'use server';

/**
 * @fileOverview Study plan generation flow.
 *
 * - generateStudyPlan - A function that generates a study plan in CSV format.
 * - GenerateStudyPlanInput - The input type for the generateStudyPlan function.
 * - GenerateStudyPlanOutput - The return type for the generateStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyPlanInputSchema = z.object({
  subject: z.string().describe('The subject to study.'),
  studyHours: z
    .number()
    .describe('The number of hours planned for studying.'),
});
export type GenerateStudyPlanInput = z.infer<typeof GenerateStudyPlanInputSchema>;

const GenerateStudyPlanOutputSchema = z.object({
  studyPlanCsv: z
    .string()
    .describe('The generated study plan in CSV format.'),
});
export type GenerateStudyPlanOutput = z.infer<typeof GenerateStudyPlanOutputSchema>;

export async function generateStudyPlan(
  input: GenerateStudyPlanInput
): Promise<GenerateStudyPlanOutput> {
  return generateStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudyPlanPrompt',
  input: {schema: GenerateStudyPlanInputSchema},
  output: {schema: GenerateStudyPlanOutputSchema},
  prompt: `You are an AI study assistant. Generate a study plan in CSV format for the subject: {{{subject}}}, and the number of study hours: {{{studyHours}}}. The CSV should have columns: Day, Time, Topic, Activity. Make the plan detailed and comprehensive, considering the study hours provided.`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: GenerateStudyPlanInputSchema,
    outputSchema: GenerateStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
