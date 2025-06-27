import React from 'react';

interface Column {
  key: string;
  title: string;
  width?: string;
  className?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  emptyText?: string;
  className?: string;
  rowKey?: string | ((record: any, index: number) => string);
  onRowClick?: (record: any, index: number) => void;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  loading = false,
  emptyText = 'No data available',
  className = '',
  rowKey = 'id',
  onRowClick
}) => {
  const getRowKey = (record: any, index: number) => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return record[rowKey] || index;
  };

  const getColumnClasses = (column: Column) => {
    let classes = 'px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';
    
    if (column.hideOnMobile) classes += ' hidden sm:table-cell';
    if (column.hideOnTablet) classes += ' hidden md:table-cell';
    if (column.className) classes += ` ${column.className}`;
    
    return classes;
  };

  const getCellClasses = (column: Column) => {
    let classes = 'px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900';
    
    if (column.hideOnMobile) classes += ' hidden sm:table-cell';
    if (column.hideOnTablet) classes += ' hidden md:table-cell';
    
    return classes;
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={getColumnClasses(column)}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className={`hover:bg-gray-50 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={getCellClasses(column)}>
                      {column.render
                        ? column.render(record[column.key], record, index)
                        : record[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable; 