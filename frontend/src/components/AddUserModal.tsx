import React from 'react'
import type { User } from '../types';

type Props = {
    open: boolean;
    onClose: () => void;
    onCreated: (user: User) => void;
};

const AddUserModal: React.FC<Props> = ({ open, onClose, onCreated }) => {
    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState<"ADMIN" | "WORKER">("WORKER");
    const [saving, setSaving] = React.useState(false);
    const [err, setErr] = React.useState<string | null>(null);

    if (!open) return null;

    async function submit() {
        setErr(null);
        setSaving(true);
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, userRole: role }),
        });
        setSaving(false);
        if (!res.ok) {
            setErr("Failed to create user");
            return;
        }
        const created = (await res.json()) as User;
        onCreated(created);
    }

    return (
        <div className="fixed inset-0 bg-black/40 grid place-items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[420px] space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Add user</h3>

                <label className="block text-sm text-gray-900 dark:text-gray-100">Name</label>
                <input className="w-full border rounded p-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    value={name} onChange={(e) => setName(e.target.value)} />

                <label className="block text-sm text-gray-900 dark:text-gray-100">Role</label>
                <select className="w-full border bg-gray-100 dark:bg-gray-700 rounded p-2 text-gray-900 dark:text-gray-100" value={role} onChange={e => setRole(e.target.value as any)}>
                    <option value="WORKER">WORKER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                {err && <p className="text-xs text-red-600">{err}</p>}

                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-3 py-2 rounded border text-gray-900 dark:text-gray-100">Cancel</button>
                    <button disabled={!name || saving} onClick={submit} className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">
                        {saving ? "Saving…" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal