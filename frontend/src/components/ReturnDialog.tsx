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
            <div className="bg-white p-6 rounded-2xl w-[360px] space-y-4">
                <h3 className="font-semibold text-lg">Return device?</h3>
                <p className="text-sm text-gray-600">This will mark the device as available.</p>
                <div className="flex gap-2 justify-end">
                    <button onClick={onClose} className="px-3 py-2 rounded border">Cancel</button>
                    <button onClick={onConfirm} className="px-3 py-2 rounded bg-emerald-600 text-white">Return</button>
                </div>
            </div>
        </div>
    );
}

export default ReturnDialog;