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
                                            header: 'SKU',
                                            render: (stockItem) => <Link className="underline" to={`/devices/${stockItem.id}`}>{stockItem.sku}</Link>
                                        },
                                        {
                                            header: 'Device Type',
                                            render: (stockItem) => stockItem.device?.name ?? `Device ${stockItem.deviceId}`
                                        },
                                        {
                                            header: 'Brand',
                                            render: (stockItem) => stockItem.device?.brand ?? stockItem.device?.description ?? '—'
                                        },
                                        {
                                            header: 'Status',
                                            render: (stockItem) => stockItem.userId ? 'Borrowed' : 'Available'
                                        },
                                        {
                                            header: 'Borrowed by',
                                            render: (stockItem) => stockItem.user?.username ?? (stockItem.userId ? stockItem.userId : '—')
                                        },
                                        {
                                            header: 'Due Date',
                                            render: (stockItem) => stockItem.dueDate ? new Date(stockItem.dueDate).toLocaleDateString() : '—'
                                        }
                                    ]}
                                    data={data}
                                    emptyText="No stock items found"
                                />
                        </div>
                );
}

export default InventoryPage;