import React from 'react'
import { useDevices } from '../../hooks/useInventory';
import type { Device } from '../../types';
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router';
import DataTable from '../../components/DataTable';

const InventoryPage: React.FC = () => {
    const { data = [], isLoading } = useDevices();
    const columns: ColumnDef<Device>[] = [
        { header: "Name", cell: ({ row }) => <Link className="underline" to={`/devices/${row.original.id}`}>{row.original.name}</Link> },
        { header: "Brand", cell: ({ row }) => row.original.brand ?? '—' },
        { header: "Status", cell: ({ row }) => row.original.available ? 'Available' : 'Borrowed' },
        { header: "Due", cell: ({ row }) => row.original.dueDate ?? '—' },
    ];
    if (isLoading) return <div>Loading…</div>;
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Inventory</h1>
            {/* If backend gives totals per type, render badges here */}
            <DataTable data={data} columns={columns} />
        </div>
    );
}

export default InventoryPage;