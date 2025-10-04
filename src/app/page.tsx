'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { StudyPlanGenerator } from '@/components/features/study-plan-generator';
import { KeywordStudyTips } from '@/components/features/keyword-study-tips';
import { TextSummarizer } from '@/components/features/text-summarizer';
import { QuizSystem } from '@/components/features/quiz-system';
import { ResourceSuggestions } from '@/components/features/resource-suggestions';
import { MotivationalFeedback } from '@/components/features/motivational-feedback';

export default function Home() {
  const [subject, setSubject] = useState('Physics');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-3 space-y-2 mb-4">
               <h1 className="text-3xl font-bold font-headline text-foreground tracking-tight">
                Welcome, Student!
              </h1>
              <p className="text-muted-foreground">
                Your AI-powered study assistant is ready to help you conquer {' '}
                <span className="font-semibold text-primary">{subject}</span>.
              </p>
            </div>
            
            <div className="lg:col-span-1 flex flex-col gap-6">
              <StudyPlanGenerator currentSubject={subject} setSubject={setSubject} />
              <MotivationalFeedback />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <KeywordStudyTips currentSubject={subject} setSubject={setSubject} />
              <ResourceSuggestions subject={subject} />
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                 <TextSummarizer />
              </div>
              <div className="lg:col-span-3">
                <QuizSystem initialSubject={subject} />
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
