import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            {error.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
          </h2>
          <div className="text-secondary-600 mb-6">
            {error.statusText || error.message || 'An unexpected error occurred'}
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors mr-4"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;