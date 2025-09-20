import React from 'react'
import { useDevices } from '../../hooks/useInventory';
import KPICard from '../../components/KPICard';

const Dashboard: React.FC = () => {
    const { data = [] } = useDevices();
    const total = data.length;
    const borrowed = data.filter(d => !d.available).length;
    const available = total - borrowed;
    const overdue = data.filter(d => !d.available && d.dueDate && new Date(d.dueDate) < new Date()).length;

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <KPICard title="Total devices" value={total} />
                <KPICard title="Available" value={available} />
                <KPICard title="Borrowed" value={borrowed} />
                <KPICard title="Overdue" value={overdue} hint="Due date passed" />
            </div>
        </div>
    );
}

export default Dashboard;