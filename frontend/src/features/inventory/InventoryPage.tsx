import React from 'react'
import { useDevices } from '../../hooks/useInventory';
import { Link } from 'react-router';
import UnifiedTable from '../../components/DataTable';

const InventoryPage: React.FC = () => {
        const { data = [], isLoading } = useDevices();
        if (isLoading) return <div>Loading…</div>;
                return (
                        <div className="space-y-4">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Inventory</h1>
                                {/* If backend gives totals per type, render badges here */}
                                <UnifiedTable
                                    columns={[
                                        {
                                            header: 'Name',
                                            render: (device) => <Link className="underline" to={`/devices/${device.id}`}>{device.name}</Link>
                                        },
                                        {
                                            header: 'Brand',
                                            render: (device) => device.brand ?? '—'
                                        },
                                        {
                                            header: 'Status',
                                            render: (device) => device.available ? 'Available' : 'Borrowed'
                                        },
                                        {
                                            header: 'Due',
                                            render: (device) => device.dueDate ?? '—'
                                        }
                                    ]}
                                    data={data}
                                    emptyText="No items"
                                />
                        </div>
                );
}

export default InventoryPage;