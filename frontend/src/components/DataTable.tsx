import React from 'react';

interface TableColumn {
  header: string;
  render: (row: any) => React.ReactNode;
}

interface UnifiedTableProps {
  columns: TableColumn[];
  data: any[];
  emptyText?: string;
  className?: string;
}

const UnifiedTable: React.FC<UnifiedTableProps> = ({ columns, data, emptyText = 'No items', className }) => (
  <div className={`rounded-2xl border overflow-hidden dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${className ?? ''}`}>
    <table className="w-full text-sm">
      <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="text-left p-3 text-gray-900 dark:text-gray-100">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id ?? i} className="border-t border-gray-200 dark:border-gray-700">
            {columns.map((col, idx) => (
              <td key={idx} className="p-3 text-gray-900 dark:text-gray-100">{col.render(row)}</td>
            ))}
          </tr>
        ))}
        {data.length === 0 && (
          <tr><td className="p-3 text-gray-500" colSpan={columns.length}>{emptyText}</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

export default UnifiedTable;
