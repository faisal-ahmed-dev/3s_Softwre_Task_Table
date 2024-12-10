import React, { ChangeEvent } from 'react';
import Button from './Button';
import Select from './Select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  start: number;
  length: number;
  totalRecords: number;
  page: number;
  pageSize: number;
  pageSizes: number[];
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  start,
  length,
  totalRecords,
  page,
  pageSize,
  pageSizes,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) => {
  const handlePageSizeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    const startPage = Math.max(page - 2, 1); 
    const endPage = Math.min(page + 2, totalPages); 
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded ${
            i === page ? 'bg-secondary text-white' : 'bg-white '
          }`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 gap-4">
      {/* Rows Per Page Selector */}
      <div className="flex items-center space-x-2">
        <span>Rows per page</span>
        <Select
          options={pageSizes.map((size) => ({
            value: size.toString(),
            text: size.toString(),
          }))}
          value={pageSize.toString()}
          onChange={handlePageSizeSelect}
          className="bg-gray-200"
        />
        <span>entries</span>
      </div>

      {/* Display Current Range */}
      <div className="text-sm">
        {length > 0 && (
          <>
            {start + 1} - {start + length} of {totalRecords} items
          </>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center space-x-2">

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 bg-white rounded ${
            page === 1 ? 'cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Page Number Buttons */}
        {renderPageButtons()}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`px-3 py-1 bg-white rounded ${
            page >= totalPages
              ? ' cursor-not-allowed'
              : ' '
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default React.memo(PaginationControls);