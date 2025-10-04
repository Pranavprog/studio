'use client';

import { useState } from 'react';
import { StudyPlanGenerator } from '@/components/features/study-plan-generator';
import { QuizSystem } from '@/components/features/quiz-system';
import { ResourceSuggestions } from '@/components/features/resource-suggestions';
import { MotivationalFeedback } from '@/components/features/motivational-feedback';
import { ClipboardList, BookText, FileQuestion } from 'lucide-react';

export default function Home() {
  const [subject, setSubject] = useState('Physics');

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-gray-800 dark:text-white tracking-tight">
            Welcome to AI Study Pal
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Your journey to academic excellence starts here. Let's conquer{' '}
            <span className="font-semibold text-primary">{subject}</span> together.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Section 2: Planning & Quizzing */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 w-full p-8 bg-card rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3"><ClipboardList className="text-primary"/>Plan Your Success</h2>
                    <StudyPlanGenerator currentSubject={subject} setSubject={setSubject} />
              </div>
              <div className="flex-1 w-full p-8 bg-card rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3"><FileQuestion className="text-primary"/>Test Your Knowledge</h2>
                    <QuizSystem initialSubject={subject} />
              </div>
          </div>
          
          {/* Section 3: Resources & Motivation */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
              <div className="flex-[2] p-8 bg-card rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-card-foreground mb-6 flex items-center gap-3"><BookText className="text-primary"/>Discover Resources</h2>
                  <ResourceSuggestions subject={subject} />
              </div>
              <div className="flex-[1] p-8 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl shadow-lg flex flex-col justify-center">
                  <MotivationalFeedback />
              </div>
          </div>

        </div>
      </div>
    </main>
  );
}
