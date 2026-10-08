import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[2px] border text-[15px] font-medium transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass",
  {
    variants: {
      variant: {
        solid: "border-ink bg-ink text-paper hover:border-brass-ink hover:bg-brass-ink",
        outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        onDark: "border-paper bg-paper text-ink hover:border-brass-soft hover:bg-brass-soft",
      },
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
