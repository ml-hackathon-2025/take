import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import React from "react";

type Props<T> = { data: T[]; columns: ColumnDef<T>[]; };

const DataTable = <T,>({ data, columns }: Props<T>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white dark:bg-gray-900">
      <table className="w-full text-sm text-gray-900 dark:text-gray-100">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(h => (
                <th key={h.id} className="text-left p-3 text-gray-700 dark:text-gray-200">
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(r => (
            <tr key={r.id} className="border-t border-gray-200 dark:border-gray-700">
              {r.getVisibleCells().map(c => (
                <td key={c.id} className="p-3 text-gray-800 dark:text-gray-100">
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;