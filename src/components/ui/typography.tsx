import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { createElement, forwardRef } from 'react';

const typographyVariants = cva('', {
  variants: {
    theme: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      default: 'text-muted-foreground',
      error: 'text-destructive',
      info: 'text-info',
      warning: 'text-warning',
      success: 'text-success',
    },
    variant: {
      default: 'text-base',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      h1: 'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
      subtitle1: 'text-sm',
      subtitle2: 'text-base',
      caption: 'text-xs',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ component = 'p', variant, className, children, theme, ...props }, ref) => {
    return createElement(
      component,
      {
        ...props,
        ref,
        className: cn(typographyVariants({ theme, className, variant })),
      },
      children,
    );
  },
);
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
