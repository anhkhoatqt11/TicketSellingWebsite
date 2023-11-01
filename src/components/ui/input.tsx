import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  renderRight?: React.ReactNode;
  isInvalid?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, renderRight, isInvalid, errorMessage, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <div className="relative flex w-full flex-row items-center">
          <input
            type={type}
            className={cn(
              `flex h-12 w-full rounded-md border border-sold border-input
             bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 
             file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
             focus-visible:outline-none focus-visible:ring-1
             focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            ref={ref}
            {...props}
          />
          {renderRight ? (
            <div className="absolute right-5">{renderRight}</div>
          ) : null}
        </div>
        {isInvalid && errorMessage ? (
          <div className="text-red-500 text-sm font-medium mt-1">
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
