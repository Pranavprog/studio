'use client';

import { useState, useMemo } from 'react';
import { FileQuestion, CheckCircle, XCircle, ArrowRight, RefreshCw, Award, ShieldAlert, BarChart3, Target } from 'lucide-react';
import { quizzes, Question } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type QuizSystemProps = {
  initialSubject: string;
}

type AnswerRecord = {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
};

const PASSING_THRESHOLD = 0.7; // 70%

export function QuizSystem({ initialSubject }: QuizSystemProps) {
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [quiz, setQuiz] = useState(() => quizzes[initialSubject]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const question: Question | undefined = quiz?.questions[currentQuestionIndex];

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setQuiz(quizzes[subject]);
    resetQuiz();
  };

  const handleAnswerSelect = (option: string) => {
    if (showResult) return;
    if (!question) return;

    const isCorrect = option === question.answer;
    setSelectedAnswer(option);
    setAnswers(prev => [...prev, { question, selectedAnswer: option, isCorrect }]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
  };

  const progressPercentage = quiz ? ((currentQuestionIndex + (showResult ? 1 : 0)) / quiz.questions.length) * 100 : 0;

  const isQuizFinished = quiz && currentQuestionIndex === quiz.questions.length;
  const score = useMemo(() => answers.filter(a => a.isCorrect).length, [answers]);
  const finalScorePercentage = quiz ? score / quiz.questions.length : 0;
  const hasPassed = finalScorePercentage >= PASSING_THRESHOLD;

  const difficultyVariant = {
    'Easy': 'secondary',
    'Medium': 'outline',
    'Hard': 'destructive'
  } as const;
  
  const resultsByDifficulty = useMemo(() => {
    if (!isQuizFinished) return [];
    
    const difficulties = ['Easy', 'Medium', 'Hard'];
    return difficulties.map(difficulty => {
        const total = answers.filter(a => a.question.difficulty === difficulty).length;
        const correct = answers.filter(a => a.question.difficulty === difficulty && a.isCorrect).length;
        return { name: difficulty, correct, incorrect: total - correct, total };
    }).filter(d => d.total > 0);
  }, [isQuizFinished, answers]);

  const improvementFeedback = useMemo(() => {
    if (!isQuizFinished) return '';
    const weakAreas = resultsByDifficulty
      .filter(d => d.correct / d.total < 0.6)
      .map(d => d.name.toLowerCase());
      
    if (weakAreas.length === 0) {
      return "Excellent work across all difficulties! Keep up the great momentum.";
    }
    
    return `You seem to be struggling most with ${weakAreas.join(' and ')} questions. Consider reviewing the fundamental concepts for these topics to build a stronger foundation. Practice with more questions of this difficulty to improve your confidence and accuracy.`;
  }, [isQuizFinished, resultsByDifficulty]);

  return (
    <Card className="h-full shadow-none border-none">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">MCQ Quiz System</CardTitle>
                <CardDescription>Test your knowledge on different subjects.</CardDescription>
            </div>
            <Select onValueChange={handleSubjectChange} defaultValue={selectedSubject}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(quizzes).map(key => (
                        <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        {quiz && !isQuizFinished && question ? (
          <>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
              <Badge variant={difficultyVariant[question.difficulty]}>{question.difficulty}</Badge>
            </div>
            <h3 className="font-semibold text-lg mb-4">{question.question}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map(option => {
                const isCorrect = option === question.answer;
                const isSelected = option === selectedAnswer;
                return (
                  <Button
                    key={option}
                    variant="outline"
                    className={cn(
                      "h-auto justify-start text-left whitespace-normal py-3",
                      showResult && isCorrect && "bg-green-100 border-green-500 text-green-900 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-700",
                      showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-900 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-700",
                      !showResult && "hover:bg-accent/50"
                    )}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                  >
                    {showResult && isCorrect && <CheckCircle className="mr-2 h-4 w-4 shrink-0" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="mr-2 h-4 w-4 shrink-0" />}
                    {option}
                  </Button>
                );
              })}
            </div>
            {showResult && (
              <div className="flex justify-end mt-4">
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "View Results"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10 flex flex-col items-center">
            <div className='flex items-center justify-center mb-4'>
                {hasPassed ? (
                    <Award className="h-16 w-16 text-green-500" />
                ) : (
                    <ShieldAlert className="h-16 w-16 text-red-500" />
                )}
                 <div className={cn("ml-4 text-2xl font-bold", hasPassed ? 'text-green-600' : 'text-red-600')}>
                    Result: {hasPassed ? "Pass" : "Fail"}
                </div>
            </div>
            <h3 className="font-bold text-2xl">
              {hasPassed ? "Congratulations! You Passed!" : "Good Effort! Keep Studying."}
            </h3>
            <p className="text-muted-foreground mt-2 mb-6">
              You scored {score} out of {quiz?.questions.length || 0} ({Math.round(finalScorePercentage * 100)}%).
            </p>
            
            <div className="w-full max-w-md mx-auto space-y-6">
                 <div className="p-4 border rounded-lg bg-background">
                     <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 justify-center"><BarChart3/>Performance by Difficulty</h4>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer>
                             <BarChart data={resultsByDifficulty}>
                                 <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                 <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false}/>
                                <Tooltip
                                    content={<ChartTooltipContent />}
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                />
                                 <Bar dataKey="correct" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                 <Bar dataKey="incorrect" stackId="a" fill="hsl(var(--destructive) / 0.5)" radius={[4, 4, 0, 0]} />
                             </BarChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="p-4 border rounded-lg bg-secondary/50">
                     <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 justify-center"><Target/>Improvement Areas</h4>
                     <p className='text-sm text-muted-foreground'>{improvementFeedback}</p>
                 </div>
            </div>

            <Button onClick={resetQuiz} className="mt-8">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
