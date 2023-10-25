"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

type Variants = 'base' | 'default' | 'variant2';

const getLabelVariantClass = (variant: Variants) => {
  switch (variant) {
    case 'base':
      return "shadcnLabel-base";
    case 'default':
      return "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
    case 'variant2':
      return "text-xs bg-red-200";
    default:
      return '';
  }
}

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
  variant?: Variants;
};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant = 'base', ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(getLabelVariantClass(variant), className)}
    {...props}  // Cette ligne transmet toutes les props sauf 'variant'
  />
))


Label.displayName = LabelPrimitive.Root.displayName

export { Label }
