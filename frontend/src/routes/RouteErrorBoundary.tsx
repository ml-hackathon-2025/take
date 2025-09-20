import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router';

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Oops: {error.status}</h1>
        <p className="text-gray-600">{error.statusText}</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Something went sideways</h1>
      <p className="text-gray-600">Try going back to the dashboard.</p>
    </div>
  );
}

export default RouteErrorBoundary