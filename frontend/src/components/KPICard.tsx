type Props = { title: string; value: string | number; hint?: string; };

import React from 'react'

const KPICard: React.FC<Props> = ({ title, value, hint }) => {
    return (
        <div className="rounded-2xl shadow p-4 bg-white dark:bg-gray-900">
            <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
            {hint && <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{hint}</div>}
        </div>
    );
}

export default KPICard;