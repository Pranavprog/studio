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
    const form = formRef.current;
    if (form) {
        const formData = new FormData(form);
        if (!formData.get('subject')) {
            // If there's no subject, don't submit on initial load
            return;
        }
        startTransition(() => {
            formAction(formData);
        });
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
          <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Keywords</p>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-muted"></div>
                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted"></div>
                    <div className="h-6 w-16 animate-pulse rounded-full bg-muted"></div>
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Study Tips</p>
                 <div className="h-5 w-full animate-pulse rounded-md bg-muted"></div>
                 <div className="h-5 w-10/12 animate-pulse rounded-md bg-muted"></div>
            </div>
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
