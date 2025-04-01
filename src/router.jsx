import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TimeTable from './pages/TimeTable';
import CourseUpload from './pages/CourseUpload';
import CWAAnalysis from './pages/CWAAnalysis';
import ProgressTracker from './pages/ProgressTracker';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './components/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'timetable',
        element: <TimeTable />
      },
      {
        path: 'course-upload',
        element: <CourseUpload />
      },
      {
        path: 'cwa-analysis',
        element: <CWAAnalysis />
      },
      {
        path: 'progress',
        element: <ProgressTracker />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
];


export const router = createBrowserRouter(routes.map(route => {
  const wrappedElement = <ErrorBoundary>{route.element}</ErrorBoundary>;
  return {
    ...route,
    errorElement: <ErrorPage />,
    element: wrappedElement,
    children: route.children?.map(child => ({
      ...child,
      errorElement: <ErrorPage />,
      element: <ErrorBoundary>{child.element}</ErrorBoundary>
    }))
  };
}));