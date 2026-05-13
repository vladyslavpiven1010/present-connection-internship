import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

interface FieldProps {
  children: ReactNode;
  label: string;
}

const controlClass =
  "min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

export function Field({ children, label }: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-slate-700">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={controlClass} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={controlClass} {...props} />;
}
