'use client';

import { useEffect, useRef, useTransition, useActionState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getKeywordsAndTipsAction } from '@/app/actions';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function KeywordStudyTips({ currentSubject, setSubject }: { currentSubject: string, setSubject: (subject: string) => void }) {
  const [state, formAction] = useActionState(getKeywordsAndTipsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state.message && state.message !== 'success' && state.message !== 'Invalid form data.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        if (formData.get('subject')) {
            startTransition(() => {
                formAction(formData);
            });
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <Card className="shadow-none border-none h-full">
      <CardHeader>
        <CardTitle className="text-xl">Keyword Study Tips</CardTitle>
        <CardDescription>AI-generated keywords and study tips for any subject.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleFormSubmit} className="flex gap-2 mb-6">
          <Input 
            name="subject" 
            placeholder="Enter subject" 
            required 
            defaultValue={currentSubject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" variant="secondary" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : 'Get Tips'}
          </Button>
        </form>

        {isPending && (
          <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>
             <Separator />
            <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                 <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-10/12" />
                    <Skeleton className="h-5 w-11/12" />
                 </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">Finding the best tips for you...</p>
          </div>
        )}

        {state.data && !isPending && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {state.data.keywords.map((keyword: string) => (
                  <Badge key={keyword} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 text-foreground">Study Tips</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                {state.data.studyTips.map((tip: string) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
