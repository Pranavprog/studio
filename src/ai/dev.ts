import { config } from 'dotenv';
config();

import '@/ai/flows/generate-study-plan.ts';
import '@/ai/flows/summarize-educational-text.ts';
import '@/ai/flows/extract-keyword-study-tips.ts';
import '@/ai/flows/generate-quiz.ts';
import '@/ai/flows/generate-resource-suggestions.ts';
