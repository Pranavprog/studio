'use server';

import { generateStudyPlan } from '@/ai/flows/generate-study-plan';
import { summarizeEducationalText } from '@/ai/flows/summarize-educational-text';
import { extractKeywordStudyTips } from '@/ai/flows/extract-keyword-study-tips';
import { generateQuiz } from '@/ai/flows/generate-quiz';
import { generateResourceSuggestions } from '@/ai/flows/generate-resource-suggestions';
import { z } from 'zod';

const studyPlanSchema = z.object({
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
  studyHours: z.coerce.number().min(1, { message: 'Study hours must be at least 1.' }),
});

export async function generateStudyPlanAction(prevState: any, formData: FormData) {
  const validatedFields = studyPlanSchema.safeParse({
    subject: formData.get('subject'),
    studyHours: formData.get('studyHours'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  try {
    const result = await generateStudyPlan(validatedFields.data);
    return {
      message: 'success',
      errors: null,
      data: result.studyPlanCsv,
    };
  } catch (error) {
    return {
      message: 'Failed to generate study plan. Please try again later.',
      errors: null,
      data: null,
    };
  }
}

const summarizeSchema = z.object({
  text: z.string().min(50, { message: 'Text must be at least 50 characters to summarize effectively.' }),
});

export async function summarizeTextAction(prevState: any, formData: FormData) {
  const validatedFields = summarizeSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await summarizeEducationalText({ educationalText: validatedFields.data.text });
    return {
      message: 'success',
      errors: null,
      data: result.summary,
    };
  } catch (error) {
    return {
      message: 'Failed to summarize text. Please try again later.',
      errors: null,
      data: null,
    };
  }
}

const tipsSchema = z.object({
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
});

export async function getKeywordsAndTipsAction(prevState: any, formData: FormData) {
  const validatedFields = tipsSchema.safeParse({
    subject: formData.get('subject'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await extractKeywordStudyTips({ subject: validatedFields.data.subject });
    return {
      message: 'success',
      errors: null,
      data: result,
    };
  } catch (error) {
    return {
      message: 'Failed to get tips. Please try again later.',
      errors: null,
      data: null,
    };
  }
}

const quizSchema = z.object({
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
});

export async function generateQuizAction(prevState: any, formData: FormData) {
  const validatedFields = quizSchema.safeParse({
    subject: formData.get('subject'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  try {
    const result = await generateQuiz(validatedFields.data);
    return {
      message: 'success',
      errors: null,
      data: result,
    };
  } catch (error) {
    console.error('Quiz generation failed:', error);
    return {
      message: 'Failed to generate quiz. Please try a different subject or try again later.',
      errors: null,
      data: null,
    };
  }
}

const suggestionsSchema = z.object({
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters.' }),
});

export async function getResourceSuggestionsAction(prevState: any, formData: FormData) {
    const validatedFields = suggestionsSchema.safeParse({
        subject: formData.get('subject'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Invalid form data.',
            errors: validatedFields.error.flatten().fieldErrors,
            data: null,
        };
    }

    try {
        const result = await generateResourceSuggestions({ subject: validatedFields.data.subject });
        return {
            message: 'success',
            errors: null,
            data: result.suggestions,
        };
    } catch (error) {
        return {
            message: 'Failed to get resource suggestions. Please try again later.',
            errors: null,
            data: null,
        };
    }
}
