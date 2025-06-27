import React from 'react';

interface ResponsivePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  className?: string;
}

const ResponsivePagination: React.FC<ResponsivePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
  showItemsPerPage = true,
  className = ''
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  return (
    <div className={`bg-gray-50 border-t border-gray-200 px-3 sm:px-6 py-3 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        {/* Items per page and info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          {showItemsPerPage && (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <span className="text-xs sm:text-sm text-gray-600">
            {startIndex + 1}-{endIndex} of {totalItems}
          </span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* First page */}
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm transition-colors"
            title="First page"
          >
            ««
          </button>

          {/* Previous page */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm transition-colors"
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 py-1 text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    onClick={() => goToPage(page as number)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-indigo-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile current page indicator */}
          <div className="sm:hidden">
            <span className="px-2 sm:px-3 py-1 bg-indigo-600 text-white rounded text-xs sm:text-sm">
              {currentPage}
            </span>
          </div>

          {/* Next page */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm transition-colors"
            title="Next page"
          >
            ›
          </button>

          {/* Last page */}
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-xs sm:text-sm transition-colors"
            title="Last page"
          >
            »»
          </button>
        </div>
      </div>

      {/* Mobile page info */}
      <div className="sm:hidden mt-2 text-center">
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default ResponsivePagination; 