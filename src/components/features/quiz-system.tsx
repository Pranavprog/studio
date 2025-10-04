'use client';

import { useState } from 'react';
import { FileQuestion, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { quizzes, Question } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type QuizSystemProps = {
  initialSubject: string;
}

export function QuizSystem({ initialSubject }: QuizSystemProps) {
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [quiz, setQuiz] = useState(quizzes[initialSubject]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question: Question | undefined = quiz?.questions[currentQuestionIndex];

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setQuiz(quizzes[subject]);
    resetQuiz();
  };

  const handleAnswerSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    if (option === question?.answer) {
      setScore(s => s + 1);
    }
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
    setScore(0);
  };

  const progressPercentage = quiz ? ((currentQuestionIndex + (showResult ? 1 : 0)) / quiz.questions.length) * 100 : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3">
                    <FileQuestion className="h-6 w-6 text-primary" />
                    <CardTitle>MCQ Quiz System</CardTitle>
                </div>
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
        {quiz && question ? (
          <>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
              <Badge variant={question.difficulty === 'Easy' ? 'secondary' : 'destructive'}>{question.difficulty}</Badge>
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
                      showResult && isCorrect && "bg-green-100 border-green-500 text-green-900 hover:bg-green-200",
                      showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-900 hover:bg-red-200",
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
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <Button onClick={handleNextQuestion}>
                    Next Question <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={resetQuiz}>View Results</Button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="font-bold text-2xl">Quiz Complete!</h3>
            <p className="text-muted-foreground mt-2">
              You scored {score} out of {quiz?.questions.length || 0}.
            </p>
            <Button onClick={resetQuiz} className="mt-6">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
