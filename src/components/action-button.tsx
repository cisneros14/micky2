import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "group relative h-[calc(48px+8px)] rounded-full bg-primary py-1 pl-6 pr-14 text-primary-foreground hover:bg-primary/90 justify-start",
        secondary:
          "group relative h-12 rounded-full bg-secondary pl-6 pr-14 text-secondary-foreground hover:bg-secondary/80 justify-start",
        outline:
          "h-12 border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "h-12 hover:bg-accent hover:text-accent-foreground",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-9 px-3",
        lg: "h-14 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if ((variant === "primary" || variant === "secondary") && !asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <span className="relative flex items-center justify-start z-10 !p-1.5 cursor-pointer text-left w-full">
            {children}
          </span>
          <div
            className={cn(
              "cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-end rounded-full transition-[width] group-hover:w-[calc(100%-8px)]",
              variant === "secondary" ? "bg-green-700/50" : "bg-blue-500/50"
            )}
          >
            <div className="mr-3.5 flex items-center justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-neutral-50"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
ActionButton.displayName = "ActionButton";

export { ActionButton, buttonVariants };
