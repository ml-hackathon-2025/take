import React from 'react'
import type { Device, User } from '../../types';
import { useDevices, useUsers } from '../../hooks/useInventory';
import AddUserModal from '../../components/AddUserModal';
import UnifiedTable from '../../components/DataTable';

type UserRow = {
  user: User;
  items: { device: Device }[];
};

const UserPage: React.FC = () => {
  const { data: users = [], refetch: refetchUsers } = useUsers();
  const { data: devices = [] } = useDevices();
  const [showAdd, setShowAdd] = React.useState(false);

  // TODO: Simplify logic
  const rows: UserRow[] = React.useMemo(() => {
    const byUser = new Map<string, { user: User; items: { device: Device }[] }>();
    users.forEach(u => byUser.set(String(u.id), { user: u, items: [] }));
    devices.forEach(d => {
      if (!d.available && d.userId != null) {
        const key = String(d.userId);
        if (!byUser.has(key)) return;
        byUser.get(key)!.items.push({ device: d });
      }
    });
    return Array.from(byUser.values()).sort((a, b) => a.user.name.localeCompare(b.user.name));
  }, [users, devices]);
  const columns = [
    {
      header: 'Name',
      render: ({ user }: UserRow) => user.name
    },
    {
      header: 'Role',
      render: ({ user }: UserRow) => user.userRole
    },
    {
      header: 'Currently holding',
      render: ({ items }: UserRow) => (
        items.length === 0 ? (
          <span className="text-gray-500">—</span>
        ) : (
          <ul className="list-disc pl-5">
            {items.map(({ device }) => (
              <li key={device.id}>
                {device.name} {device.dueDate ? <span className="text-gray-500">· due {device.dueDate.slice(0, 10)}</span> : null}
              </li>
            ))}
          </ul>
        )
      )
    }
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="px-3 py-2 rounded bg-indigo-600 text-white" onClick={() => setShowAdd(true)}>
          Add user
        </button>
      </div>

      <UnifiedTable columns={columns} data={rows} emptyText="No items" />

      <AddUserModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreated={() => { setShowAdd(false); refetchUsers(); }}
      />
    </div>
  );
}

export default UserPage;