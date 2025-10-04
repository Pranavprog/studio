'use client';

import { useState } from 'react';
import { KeywordStudyTips } from '@/components/features/keyword-study-tips';
import { TextSummarizer } from '@/components/features/text-summarizer';
import { BrainCircuit } from 'lucide-react';

export default function TipsPage() {
  const [subject, setSubject] = useState('Physics');

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-800 dark:text-white tracking-tight">
            Study Tips & Tools
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Leverage AI to sharpen your study skills and understanding.
          </p>
        </div>
        
        <div className="p-8 bg-card rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3"><BrainCircuit className="text-primary"/>Core AI Tools</h2>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <KeywordStudyTips currentSubject={subject} setSubject={setSubject} />
                </div>
                <div className="flex-1">
                    <TextSummarizer />
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
