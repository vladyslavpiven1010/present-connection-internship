import { Button } from "./ui/Button";
import type { PdfTemplate } from "../types";

interface TemplateDialogProps {
  isOpen: boolean;
  isExporting: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

const templateOptions: Array<{
  accentClass: string;
  description: string;
  label: string;
  value: PdfTemplate;
}> = [
  {
    accentClass: "border-t-emerald-600",
    description: "Grouped by assigned user.",
    label: "Classic",
    value: "Classic"
  },
  {
    accentClass: "border-t-blue-600",
    description: "Detailed table with blue header.",
    label: "Compact",
    value: "Compact"
  }
];

export function TemplateDialog({
  isOpen,
  isExporting,
  onClose,
  onExport
}: TemplateDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 grid place-items-center bg-slate-950/45 p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Choose PDF template</h2>
          <p className="mt-1 text-slate-500">Both templates use the current filters and exclude inactive items.</p>
        </div>

        <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {templateOptions.map((option) => (
            <button
              className={`grid min-h-32 content-end gap-1.5 rounded-lg border border-slate-200 border-t-[10px] bg-white p-4 text-left ${option.accentClass}`}
              disabled={isExporting}
              key={option.value}
              onClick={() => onExport(option.value)}
            >
              <strong className="text-lg text-slate-900">{option.label}</strong>
              <span className="text-slate-500">{option.description}</span>
            </button>
          ))}
        </div>

        <Button disabled={isExporting} onClick={onClose} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}
