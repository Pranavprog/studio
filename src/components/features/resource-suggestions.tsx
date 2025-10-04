'use client';

import { Library, Book, Video, FileText, Loader2, Sparkles } from 'lucide-react';
import { resources, Resource } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useActionState, useTransition } from 'react';
import { getResourceSuggestionsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const iconMap = {
  book: <Book className="h-4 w-4 text-muted-foreground" />,
  video: <Video className="h-4 w-4 text-muted-foreground" />,
  article: <FileText className="h-4 w-4 text-muted-foreground" />,
};

const initialState = {
  message: '',
  errors: null,
  data: null,
};

export function ResourceSuggestions({ subject }: { subject: string }) {
  const staticResources = resources[subject] || [];
  
  const [state, formAction] = useActionState(getResourceSuggestionsAction, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (staticResources.length === 0 && subject) {
      const formData = new FormData();
      formData.append('subject', subject);
      startTransition(() => {
        formAction(formData);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

   useEffect(() => {
    if (state.message && state.message !== 'success' && state.message !== 'Invalid form data.') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const suggestedResources = staticResources.length > 0 ? staticResources : state.data;

  return (
    <Card className="shadow-none border-none h-full">
      <CardHeader>
        <CardTitle className="text-xl">Resource Suggestions</CardTitle>
        <CardDescription>Hand-picked and AI-generated resources for {subject}.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && (
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <h4 className="font-semibold text-muted-foreground">Finding AI-powered suggestions...</h4>
              </div>
              <div className="space-y-3">
                  <div className="flex gap-3 items-center"><Skeleton className="h-4 w-4 rounded-sm" /><Skeleton className="h-5 w-4/5" /></div>
                  <div className="flex gap-3 items-center"><Skeleton className="h-4 w-4 rounded-sm" /><Skeleton className="h-5 w-3/5" /></div>
              </div>
          </div>
        )}

        {!isPending && suggestedResources && suggestedResources.length > 0 ? (
          <ul className="space-y-3">
            {suggestedResources.map((resource: Resource) => (
              <li key={resource.title}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors"
                >
                  {iconMap[resource.type]}
                  <span className="text-sm font-medium text-foreground hover:text-primary">{resource.title}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        {!isPending && (!suggestedResources || suggestedResources.length === 0) && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Enter a subject in another section to see resources here.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
