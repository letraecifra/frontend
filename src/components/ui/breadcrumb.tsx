import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

export const Breadcrumb = forwardRef<
  HTMLElement,
  {
    separator?: ReactNode;
  } & ComponentPropsWithoutRef<'nav'>
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);

export const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        className,
      )}
      {...props}
    />
  ),
);

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  ),
);

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  {
    asChild?: boolean;
  } & ComponentPropsWithoutRef<'a'>
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  );
});

export const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  ),
);

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<'li'>): ReactNode {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>): ReactNode {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

Breadcrumb.displayName = Breadcrumb.name;
BreadcrumbList.displayName = BreadcrumbList.name;
BreadcrumbItem.displayName = BreadcrumbItem.name;
BreadcrumbLink.displayName = BreadcrumbLink.name;
BreadcrumbPage.displayName = BreadcrumbPage.name;
BreadcrumbSeparator.displayName = BreadcrumbSeparator.name;
BreadcrumbEllipsis.displayName = BreadcrumbEllipsis.name;
