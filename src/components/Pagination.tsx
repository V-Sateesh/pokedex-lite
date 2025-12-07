import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        className="px-3 py-1 text-sm rounded-md border"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ◀ Prev
      </button>

      <span className="text-sm">
        Page {page} / {totalPages}
      </span>

      <button
        className="px-3 py-1 text-sm rounded-md border"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
