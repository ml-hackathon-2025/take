import React from 'react'

import z from "zod";
import type { User } from "../types";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    userId: z.string().min(1, "Select a user"),
    dueDate: z.string().min(1, "Pick a date"),
});

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: (vals: { userId: string; dueDate: string }) => void;
    users: User[];
    maxWindowDays: number;
};


const BorrowModal: React.FC<Props> = ({ open, onClose, onConfirm, users, maxWindowDays }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    if (!open) return null;
    const min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + maxWindowDays);
    return (
        <div className="fixed inset-0 bg-black/40 grid place-items-center">
            <form onSubmit={handleSubmit(vals => onConfirm(vals))} className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[420px] space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Borrow device</h3>

                <label className="block text-sm text-gray-700 dark:text-gray-200">Assign to</label>
                <select {...register("userId")} className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">
                    <option value="">Select user</option>
                    {users.map(u => <option key={u.id} value={String(u.id)}>{u.name}</option>)}
                </select>
                {errors.userId && <p className="text-red-600 dark:text-red-400 text-xs">{String(errors.userId.message)}</p>}

                <label className="block text-sm text-gray-700 dark:text-gray-200">Due date</label>
                <input type="date"
                    {...register("dueDate")}
                    min={min.toISOString().slice(0, 10)}
                    max={max.toISOString().slice(0, 10)}
                    className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800" />
                {errors.dueDate && <p className="text-red-600 dark:text-red-400 text-xs">{String(errors.dueDate.message)}</p>}

                <div className="flex gap-2 justify-end">
                    <button type="button" onClick={onClose} className="px-3 py-2 rounded border text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700">Cancel</button>
                    <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100">Borrow</button>
                </div>
            </form>
        </div>
    );
}

export default BorrowModal;