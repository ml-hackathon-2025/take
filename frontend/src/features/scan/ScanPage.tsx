import React from 'react'
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router';

const ScanPage: React.FC = () => {
    const nav = useNavigate();
    const [manual, setManual] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    // If you encode /devices/:id in the QR, this will just navigate there.
    function go(val: string) {
        try {
            const url = new URL(val, window.location.origin);
            nav(url.pathname + url.search + url.hash);
        } catch {
            if (val.startsWith("/")) nav(val);
            else nav(`/devices/${encodeURIComponent(val)}`);
        }
    }

    return (
        <div className="space-y-4 max-w-2xl">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Scan</h1>
            <p className="text-gray-600 dark:text-gray-400">Point the camera at a device QR. HTTPS is required for camera access.</p>

            <div className="rounded-2xl overflow-hidden border bg-white dark:bg-gray-900 dark:border-gray-700">
                <QrReader
                    constraints={{ facingMode: 'environment' }}
                    scanDelay={2000}
                    onResult={(result, error) => {
                        console.log(result, error);
                        if (result) {
                            setError(null);
                            go(result.getText());
                        }
                        if (error) {
                            if (error.name === 'NotAllowedError') setError("Camera access was denied.");
                            else if (error.name === 'NotFoundError') setError("No camera found on this device.");
                            else if (error.name === 'NotReadableError') setError("Camera is already in use by another application.");
                            else if (error.name === 'OverconstrainedError') setError("No camera found that matches the specified constraints.");
                            else if (error.name === 'StreamApiNotSupportedError') setError("This browser does not support camera access.");
                            else setError(error.message);
                        }
                    }}
                    containerStyle={{ width: '100%' }}
                    videoStyle={{ width: '100%' }}
                />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="space-y-2">
                <label className="block text-sm">Manual input</label>
                <div className="flex gap-2">
                    <input className="flex-1 border rounded p-2" placeholder="/devices/1000 or 1000"
                        value={manual} onChange={(e) => setManual(e.target.value)} />
                    <button onClick={() => go(manual)} className="px-3 py-2 rounded bg-indigo-600 text-white">Go</button>
                </div>
            </div>
        </div>
    );
}

export default ScanPage;