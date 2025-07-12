import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-black resize-none',
      className
    )}
    {...props}
  />
));

