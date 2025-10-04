'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { BookText, Loader2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { summarizeTextAction } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="animate-spin" /> : 'Summarize Text'}
    </Button>
  );
}

export function TextSummarizer() {
  const [state, formAction] = useActionState(summarizeTextAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success') {
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
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookText className="h-6 w-6 text-primary" />
          <CardTitle>Text Summarizer</CardTitle>
        </div>
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
