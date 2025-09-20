import React from 'react'

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const ReturnDialog: React.FC<Props> = ({ open, onClose, onConfirm }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 grid place-items-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[360px] space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Return device?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">This will mark the device as available.</p>
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-3 py-2 rounded border text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700">Cancel</button>
                    <button onClick={onConfirm} className="px-3 py-2 rounded bg-emerald-600 text-white dark:bg-emerald-700 dark:text-gray-100">Return</button>
                </div>
            </div>
        </div>
    );
}

export default ReturnDialog;