import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function Pagination({ currentPage, onPageChange, pageSize, totalItems, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const firstItem = totalItems === 0
    ? 0
    : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span>
        Showing {firstItem}-{lastItem} of {totalItems}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="secondary"
        >
          Previous
        </Button>

        <span className="px-2 font-semibold text-slate-700">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
