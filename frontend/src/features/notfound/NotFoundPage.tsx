import React from 'react'
import { Link } from 'react-router';

const NotFoundPage: React.FC = () => {
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">404 — Lost in the yard</h1>
      <p className="text-gray-600 dark:text-gray-400">We couldn't find that page.</p>
      <Link to="/" className="underline">Back to dashboard</Link>
    </div>
  );
}

export default NotFoundPage