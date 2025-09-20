import React from 'react'
import type { Device, User } from '../types';
import { format } from 'date-fns';

type Props = {
  device: Device;
  borrower?: User | null;
  onBorrow: () => void;
  onReturn: () => void;
};

const DeviceCard: React.FC<Props> = ({ device, borrower, onBorrow, onReturn }) => {
  return (
    <div className="rounded-2xl border p-4 space-y-2 bg-white dark:bg-gray-900 dark:border-gray-700 border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{device.name}</h2>
        <span className={`text-xs px-2 py-1 rounded-full ${device.available ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'}`}>
          {device.available ? 'Available' : 'Borrowed'}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">Brand: {device.brand ?? '\u2014'}</div>
      {!device.available && (
        <div className="text-sm text-gray-800 dark:text-gray-200">
          <div>Borrowed by: <b>{borrower?.name ?? 'Unknown'}</b></div>
          <div>Due: {device.dueDate ? format(new Date(device.dueDate), 'yyyy-MM-dd') : '\u2014'}</div>
        </div>
      )}
      <div className="flex gap-2 pt-2">
        {device.available
          ? <button onClick={onBorrow} className="px-3 py-2 rounded bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100">Borrow</button>
          : <button onClick={onReturn} className="px-3 py-2 rounded bg-emerald-600 text-white dark:bg-emerald-700 dark:text-gray-100">Return</button>}
      </div>
    </div>
  );
}

export default DeviceCard