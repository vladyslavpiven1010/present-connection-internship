import type { ReactNode } from "react";

interface PagePanelProps {
  children: ReactNode;
}

interface PanelHeaderProps {
  action?: ReactNode;
  badge?: ReactNode;
  description: string;
  title: string;
}

export function PagePanel({ children }: PagePanelProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      {children}
    </section>
  );
}

export function PanelHeader({ action, badge, description, title }: PanelHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-1 text-slate-500">{description}</p>
      </div>
      {action ?? badge}
    </div>
  );
}
