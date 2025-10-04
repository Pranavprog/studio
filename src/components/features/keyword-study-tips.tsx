'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { Lightbulb, Loader2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [state, formAction] = useFormState(getKeywordsAndTipsAction, initialState);
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
    if(formRef.current) {
        formRef.current.requestSubmit();
    }
  }, []);

  const handleFormSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>Keyword Study Tips</CardTitle>
        </div>
        <CardDescription>Get AI-generated keywords and study tips for any subject.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleFormSubmit} className="flex gap-2 mb-4">
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
