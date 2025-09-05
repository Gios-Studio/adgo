import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Re-export provider so you can wrap your app:
// import { TooltipProvider } from "@/components/ui/tooltip";
export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ children, sideOffset = 6, ...props }, ref) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className="z-50 rounded-md border bg-white px-3 py-1.5 text-sm shadow-md"
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-white" />
    </TooltipPrimitive.Content>
  );
});