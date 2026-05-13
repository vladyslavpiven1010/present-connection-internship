import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

interface DataTableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="w-full overflow-hidden">{children}</div>;
}

export function DataTable({ children, className = "", ...props }: DataTableProps) {
  return (
    <table className={`w-full table-fixed border-collapse ${className}`} {...props}>
      {children}
    </table>
  );
}

export function TableHeaderCell({ children, className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`break-words border-b border-slate-200 bg-slate-50 px-2 py-3 text-left text-[11px] font-extrabold uppercase text-slate-500 sm:px-4 sm:py-3.5 sm:text-xs ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`break-words border-b border-slate-200 px-2 py-3 align-top text-sm sm:px-4 sm:py-3.5 ${className}`} {...props}>
      {children}
    </td>
  );
}
