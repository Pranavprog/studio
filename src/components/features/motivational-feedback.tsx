'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motivationalMessages } from '@/lib/data';

export function MotivationalFeedback() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This effect runs only once on the client after hydration
    setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  }, []);

  return (
    <Card className="bg-transparent border-none shadow-none h-full">
      <CardContent className="p-0 h-full flex flex-col justify-center">
        <div className="flex items-start gap-4">
          <Heart className="h-8 w-8 text-primary mt-1 shrink-0" />
          <div>
            <p className="font-semibold text-lg text-foreground">A quick boost!</p>
            <p className="text-muted-foreground italic">"{message || 'Loading...'}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
