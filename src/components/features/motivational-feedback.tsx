'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motivationalMessages } from '@/lib/data';

export function MotivationalFeedback() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Heart className="h-6 w-6 text-primary mt-1" />
          <div>
            <p className="font-semibold text-foreground">A quick boost!</p>
            <p className="text-sm text-muted-foreground italic">"{message || 'Loading...'}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
