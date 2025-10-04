'use client';

import { Library, Book, Video, FileText } from 'lucide-react';
import { resources, Resource } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const iconMap = {
  book: <Book className="h-4 w-4 text-muted-foreground" />,
  video: <Video className="h-4 w-4 text-muted-foreground" />,
  article: <FileText className="h-4 w-4 text-muted-foreground" />,
};

export function ResourceSuggestions({ subject }: { subject: string }) {
  const suggestedResources = resources[subject] || [];

  return (
    <Card className="shadow-none border-none h-full">
      <CardHeader>
        <CardTitle className="text-xl">Resource Suggestions</CardTitle>
        <CardDescription>Hand-picked resources for {subject}.</CardDescription>
      </CardHeader>
      <CardContent>
        {suggestedResources.length > 0 ? (
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
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No specific resources found for "{subject}". Try a broader topic.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
