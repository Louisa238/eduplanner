import './App.css'
import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { darkMode, toggleTheme } = useTheme();


  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📅', label: 'Timetable', path: '/timetable' },
    { icon: '📚', label: 'Course Upload', path: '/course-upload' },
    { icon: '📈', label: 'CWA Analysis', path: '/cwa-analysis' },
    { icon: '🎯', label: 'Progress', path: '/progress' }
  ];

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-primary-50'}`}>
      {/* Sidebar */}
      <aside className={`shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4 flex items-center justify-between border-b border-primary-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-primary-50 text-primary-600'}`}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
            <img src="/vite.svg" alt="logo" className="w-8 h-8" />
            <h1 className={`font-bold text-primary-600 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>EduPlanner</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-primary-50 text-primary-600"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <div className={`px-4 py-3 border-b border-primary-100 ${isSidebarOpen ? '' : 'hidden'}`}>
          <div className="text-sm text-secondary-600">{currentTime.toLocaleTimeString()}</div>
          <div className="text-xs text-secondary-400">{currentTime.toLocaleDateString()}</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary-100 text-primary-600' : 'hover:bg-primary-50 text-secondary-600 hover:text-primary-600'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={`p-4 border-t border-primary-100 ${isSidebarOpen ? '' : 'hidden'}`}>
          <div className="flex items-center space-x-3 text-secondary-600">
            <span className="text-xl">👤</span>
            <div>
              <div className="font-medium">Student Name</div>
              <div className="text-xs text-secondary-400">student@example.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-6 bg-primary-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-primary-600">
              <span>📅 Today</span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src="https://ui-avatars.com/api/?name=Student&background=6366f1&color=fff" alt="Profile" className="w-8 h-8 rounded-full" />
                <span className="text-secondary-600">Student</span>
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
