type Props = { title: string; value: string | number; hint?: string; };

import React from 'react'

const KPICard: React.FC<Props> = ({ title, value, hint }) => {
    return (
        <div className="rounded-2xl shadow p-4">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-3xl font-semibold">{value}</div>
            {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
        </div>
    );
}

export default KPICard;