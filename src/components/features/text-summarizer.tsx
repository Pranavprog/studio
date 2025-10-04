'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { BookText, Loader2, Sparkles } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeTextAction } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Summarizing...
        </>
      ) : (
        'Summarize Text'
      )}
    </Button>
  );
}

export function TextSummarizer() {
  const [state, formAction] = useActionState(summarizeTextAction, initialState);
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success' && state.data) {
      toast({
        title: 'Text Summarized!',
        description: 'Your summary is ready below.',
      });
    } else if (state.message && state.message !== 'Invalid form data.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="h-full shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-xl">Text Summarizer</CardTitle>
        <CardDescription>Paste a short educational text to get a concise summary.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <form ref={formRef} action={formAction} className="space-y-4 flex-grow flex flex-col">
          <div className="flex-grow">
            <Textarea 
              name="text"
              placeholder="Paste your text here... (at least 50 characters)"
              className="min-h-[150px] h-full"
              required 
            />
          </div>
          {state.errors?.text && <p className="text-sm text-destructive">{state.errors.text[0]}</p>}
          <SubmitButton />
        </form>

        {pending && !state.data && (
            <div className="mt-4 pt-4 border-t">
                 <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-primary animate-pulse" />
                    <Skeleton className="h-6 w-1/3" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-10/12" />
                </div>
            </div>
        )}

        {state.data && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold mb-2">Summary:</h4>
            <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">{state.data}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
