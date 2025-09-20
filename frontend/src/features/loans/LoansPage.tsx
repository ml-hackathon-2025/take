import React from 'react'
import type { Device, User } from '../../types';
import { useLoans } from '../../hooks/useLoans';
import { useBorrowReturn, useDevices, useUsers } from '../../hooks/useInventory';
import UnifiedTable from '../../components/DataTable';

type Row = {
  device: Device;
  user: User;
  borrowedDate: string;
  dueDate: string;
  overdue: boolean;
};

function makeRows(loans: { deviceId: any; userId: any; borrowedDate: string; dueDate: string; }[], devices: Device[], users: User[]) {
  const byDevice = new Map(devices.map(d => [String(d.id), d]));
  const byUser = new Map(users.map(u => [String(u.id), u]));
  return loans.map(l => {
    const device = byDevice.get(String(l.deviceId))!;
    const user = byUser.get(String(l.userId))!;
    const overdue = new Date(l.dueDate).getTime() < Date.now();
    return { device, user, borrowedDate: l.borrowedDate, dueDate: l.dueDate, overdue };
  }).filter(r => r.device && r.user);
}

const LoansPage: React.FC = () => {
  const { data: activeLoans = [] } = useLoans("active");
  const { data: overdueLoans = [] } = useLoans("overdue");
  const { data: devices = [] } = useDevices();
  const { data: users = [] } = useUsers();
  const { ret } = useBorrowReturn();

  const active = React.useMemo(() => makeRows(activeLoans, devices, users), [activeLoans, devices, users]);
  const overdue = React.useMemo(() => makeRows(overdueLoans, devices, users), [overdueLoans, devices, users]);

  function getColumns() {
    return [
      {
        header: 'Device',
        render: (r: Row) => r.device.name
      },
      {
        header: 'User',
        render: (r: Row) => r.user.name
      },
      {
        header: 'Borrowed',
        render: (r: Row) => r.borrowedDate.slice(0, 10)
      },
      {
        header: 'Due',
        render: (r: Row) => r.dueDate.slice(0, 10)
      },
      {
        header: 'Status',
        render: (r: Row) => (
          <span className={`px-2 py-1 rounded-full text-xs ${r.overdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
            {r.overdue ? 'Overdue' : 'Active'}
          </span>
        )
      },
      {
        header: '',
        render: (r: Row) => (
          <button
            className="px-3 py-1.5 rounded bg-emerald-600 text-white"
            onClick={() => ret.mutate(r.device.id)}
          >
            Return
          </button>
        )
      }
    ];
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Loans</h1>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Overdue <span className="text-gray-500 font-normal">({overdue.length})</span></h2>
        <UnifiedTable columns={getColumns()} data={overdue} emptyText="No items" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active <span className="text-gray-500 font-normal">({active.length})</span></h2>
        <UnifiedTable columns={getColumns()} data={active} emptyText="No items" />
      </div>
    </div>
  );
}

export default LoansPage;