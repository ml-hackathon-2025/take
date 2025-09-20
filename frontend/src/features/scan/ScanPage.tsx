import React from 'react'
import { useNavigate } from 'react-router';

const ScanPage: React.FC = () => {
    const nav = useNavigate();
    const [value, setValue] = React.useState("");

    function handleNavigate() {
        try {
            // Accept either a full URL or a path encoded in the QR
            const url = new URL(value, window.location.origin);
            nav(url.pathname + url.search + url.hash);
        } catch {
            // If it's not a URL, try to treat it as a path or device id
            if (value.startsWith("/")) nav(value);
            else nav(`/devices/${encodeURIComponent(value)}`);
        }
    }

    return (
        <div className="space-y-4 max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Scan</h1>
            <p className="text-gray-600 dark:text-gray-400">
                For now, paste a scanned QR value or device ID. We'll wire the camera scanner next.
            </p>
            <input
                className="w-full border rounded p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
                placeholder="e.g. /devices/42 or 42"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex gap-2">
                <button onClick={handleNavigate} className="px-3 py-2 rounded bg-indigo-600 text-white dark:bg-indigo-700 dark:text-gray-100">
                    Go
                </button>
            </div>
        </div>
    );
}

export default ScanPage;