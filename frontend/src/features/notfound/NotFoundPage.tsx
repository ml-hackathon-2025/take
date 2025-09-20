import React from 'react'
import { Link } from 'react-router';

const NotFoundPage: React.FC = () => {
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">404 — Lost in the yard</h1>
      <p className="text-gray-600">We couldn't find that page.</p>
      <Link to="/" className="underline">Back to dashboard</Link>
    </div>
  );
}

export default NotFoundPage