type Props = { available: number; total: number; };

import React from 'react'

const AvailabilityBadge: React.FC<Props> = ({ available, total }) => {
  const pct = total ? available / total : 0;
    const color = pct === 0
        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        : pct < 0.4
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200';
    return (
            <span className={`px-2 py-1 rounded-full text-xs ${color}`}>
                    {available} / {total} available
            </span>
    );
}

export default AvailabilityBadge;