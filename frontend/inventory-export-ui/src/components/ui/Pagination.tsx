import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
}

function getPageNumbers(currentPage: number, totalPages: number): number[] {
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + 2);
  const normalizedStart = Math.max(1, end - 2);

  return Array.from({ length: end - normalizedStart + 1 }, (_, index) => normalizedStart + index);
}

export function Pagination({ currentPage, onPageChange, pageSize, totalItems }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span>
        Showing {firstItem}-{lastItem} of {totalItems}
      </span>

      <div className="flex flex-wrap gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          variant="secondary"
        >
          Previous
        </Button>

        {getPageNumbers(currentPage, totalPages).map((page) => (
          <Button
            className="min-w-10 px-3"
            isActive={page === currentPage}
            key={page}
            onClick={() => onPageChange(page)}
            variant="tab"
          >
            {page}
          </Button>
        ))}

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
