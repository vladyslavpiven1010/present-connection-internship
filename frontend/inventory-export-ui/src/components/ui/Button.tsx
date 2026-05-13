import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "tab";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive?: boolean;
  variant?: ButtonVariant;
}

const baseClass = "min-h-9 rounded-md font-extrabold transition disabled:cursor-not-allowed disabled:opacity-55";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 px-4 text-white",
  secondary: "border border-slate-300 bg-white px-4 text-slate-700",
  danger: "border border-red-200 bg-red-50 px-3.5 text-red-800",
  tab: "px-4 py-2.5 font-bold"
};

export function Button({
  children,
  className = "",
  isActive = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  const activeTabClass = isActive ? "bg-blue-600 text-white" : "text-slate-500";

  return (
    <button
      className={`${baseClass} ${variantClasses[variant]} ${variant === "tab" ? activeTabClass : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
