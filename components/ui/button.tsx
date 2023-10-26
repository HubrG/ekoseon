import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "shadcnButton-default",
        destructive:
          "shadcnButton-destructive",
        outline:
          "shadcnButton-outline",
        secondary:
          "shadcnButton-secondary",
        ghost: "shadcnButton-ghost",
        link: "shadcnButton-link",
      },
      size: {
        default: "h-9 px-4 py-2  w-full",
        sm: "h-8 rounded-md px-3 text-xs  w-full",
        lg: "h-10 rounded-md px-8 text-base  w-full",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
