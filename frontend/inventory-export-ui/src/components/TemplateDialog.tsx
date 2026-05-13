import type { PdfTemplate } from "../types";

interface TemplateDialogProps {
  isOpen: boolean;
  isExporting: boolean;
  onClose: () => void;
  onExport: (template: PdfTemplate) => void;
}

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
          <button
            className="grid min-h-32 content-end gap-1.5 rounded-lg border border-slate-200 border-t-[10px] border-t-blue-600 bg-white p-4 text-left"
            onClick={() => onExport("Classic")}
            disabled={isExporting}
          >
            <strong className="text-lg text-slate-900">Classic</strong>
            <span className="text-slate-500">Detailed table with blue header.</span>
          </button>

          <button
            className="grid min-h-32 content-end gap-1.5 rounded-lg border border-slate-200 border-t-[10px] border-t-emerald-600 bg-white p-4 text-left"
            onClick={() => onExport("Compact")}
            disabled={isExporting}
          >
            <strong className="text-lg text-slate-900">Compact</strong>
            <span className="text-slate-500">Grouped by assigned user.</span>
          </button>
        </div>

        <button
          className="min-h-10 rounded-md border border-slate-300 bg-white px-4 font-extrabold text-slate-700"
          onClick={onClose}
          disabled={isExporting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
