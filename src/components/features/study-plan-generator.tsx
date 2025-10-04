'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { ClipboardList, Download, Loader2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateStudyPlanAction } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="animate-spin" /> : 'Generate Plan'}
    </Button>
  );
}

type StudyPlanGeneratorProps = {
  currentSubject: string;
  setSubject: (subject: string) => void;
};

export function StudyPlanGenerator({ currentSubject, setSubject }: StudyPlanGeneratorProps) {
  const [state, formAction] = useFormState(generateStudyPlanAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'success') {
      toast({
        title: 'Success!',
        description: 'Your study plan has been generated.',
      });
    } else if (state.message && state.message !== 'Invalid form data.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  const handleDownload = () => {
    if (state.data) {
      const blob = new Blob([state.data], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${currentSubject.replace(/\s+/g, '_')}_study_plan.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-primary" />
          <CardTitle>Study Plan Generator</CardTitle>
        </div>
        <CardDescription>Enter a subject and total study hours to generate a downloadable CSV plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              name="subject" 
              placeholder="e.g., Physics" 
              required 
              defaultValue={currentSubject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {state.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="studyHours">Total Study Hours</Label>
            <Input id="studyHours" name="studyHours" type="number" placeholder="e.g., 20" required min="1" />
            {state.errors?.studyHours && <p className="text-sm text-destructive">{state.errors.studyHours[0]}</p>}
          </div>
          <SubmitButton />
        </form>
        {state.data && (
           <Button variant="outline" className="w-full mt-4" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download .csv Plan
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
