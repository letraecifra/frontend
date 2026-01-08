import { GripVertical } from 'lucide-react';
import { type ComponentProps, type ReactNode } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

import { cn } from '~/utils';

export function ResizablePanelGroup({
  className,
  ...props
}: ComponentProps<typeof Group>): ReactNode {
  return (
    <Group
      className={cn('flex h-full w-full data-[group-orientation=vertical]:flex-col', className)}
      {...props}
    />
  );
}

export const ResizablePanel = Panel;

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: {
  withHandle?: boolean;
} & ComponentProps<typeof Separator>): ReactNode {
  return (
    <Separator
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[group-orientation=vertical]:h-px data-[group-orientation=vertical]:w-full data-[group-orientation=vertical]:after:left-0 data-[group-orientation=vertical]:after:h-1 data-[group-orientation=vertical]:after:w-full data-[group-orientation=vertical]:after:-translate-y-1/2 data-[group-orientation=vertical]:after:translate-x-0 [&[data-group-orientation=vertical]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </Separator>
  );
}
