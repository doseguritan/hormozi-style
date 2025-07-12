import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export const Button = forwardRef(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(
        'px-4 py-2 font-semibold rounded bg-black text-white hover:bg-gray-800 transition-all',
        className
      )}
      {...props}
    />
  );
});

