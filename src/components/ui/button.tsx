import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  asChild?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, asChild, ...props }, ref) => {
    return <button ref={ref} className={className} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";
