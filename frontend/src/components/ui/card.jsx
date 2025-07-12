import { cn } from '@/lib/utils';

export const Card = ({ className, children }) => (
  <div className={cn('bg-white border border-gray-200 rounded-lg shadow-sm', className)}>
    {children}
  </div>
);

export const CardContent = ({ className, children }) => (
  <div className={cn('p-6', className)}>{children}</div>
);
