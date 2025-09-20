import React from 'react'
import { useNavigate } from 'react-router';

const ScanButton: React.FC = () => {
    const nav = useNavigate();
    return (
        <button onClick={() => nav('/scan')} className="fixed right-6 bottom-6 rounded-full px-5 py-3 shadow bg-indigo-600 dark:bg-indigo-700 text-white dark:text-gray-100">
            Scan QR
        </button>
    );
}

export default ScanButton