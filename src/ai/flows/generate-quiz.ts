'use server';

/**
 * @fileOverview Generates a multiple-choice quiz for a given subject.
 *
 * - generateQuiz - A function that handles the quiz generation process.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateQuizInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('A list of 4 multiple-choice options.'),
  answer: z.string().describe('The correct answer from the options.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty of the question.'),
});

const GenerateQuizOutputSchema = z.object({
  title: z.string().describe('A title for the generated quiz.'),
  questions: z.array(QuestionSchema).describe('A list of 10 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an AI designed to be an expert quiz creator for students. Your task is to generate a multiple-choice quiz based on the provided subject.

Subject: {{{subject}}}

Please generate a quiz with exactly 10 questions. The questions should cover a range of difficulties: 4 easy, 4 medium, and 2 hard. Each question must have exactly 4 options.

Ensure the output is a valid JSON object matching the prescribed schema.`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
