import { Link } from 'react-router-dom';

function Dashboard() {
  const userStats = {
    name: 'John Doe',
    programme: 'Computer Science',
    level: '300',
    streak: 5,
    totalHours: 20,
    weeklyHours: 10,
    cwa: 3.8
  };

  const features = [
    {
      title: 'Timetable',
      description: 'Generate and manage your class schedule',
      path: '/timetable',
      icon: '📅',
    },
    {
      title: 'Course Upload',
      description: 'Upload and manage your courses',
      path: '/course-upload',
      icon: '📚',
    },
    {
      title: 'CWA Analysis',
      description: 'Track your academic performance',
      path: '/cwa-analysis',
      icon: '📊',
    },
    {
      title: 'Progress Tracker',
      description: 'Monitor your academic journey',
      path: '/progress',
      icon: '🎯',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
      <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={`https://ui-avatars.com/api/?name=${userStats.name}&background=6366f1&color=fff`} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border-4 border-primary-300" 
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="text-xl font-bold">{userStats.name}</div>
                <div className="text-primary-200">{userStats.programme} - Level {userStats.level}</div>
                <div className="flex items-center mt-1 space-x-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">🔥</span>
                    <span className="text-sm">{userStats.streak} days streak</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-1">⏱️</span>
                    <span className="text-sm">{userStats.totalHours}h total</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors flex items-center space-x-2 shadow-lg">
                <span>🔔</span>
              </button>
              <button className="px-6 py-2 bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors flex items-center space-x-2 shadow-lg">
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Welcome back, {userStats.name.split(' ')[0]}! 👋</h2>
              <p className="text-primary-600 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="#6366f1"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="226.19"
                  strokeDashoffset={226.19 * (1 - userStats.weeklyHours/20)}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-bold text-primary-600">{userStats.weeklyHours}h</div>
                <div className="text-xs text-primary-400">of 20h</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.path}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">{feature.title}</h3>
              <p className="text-secondary-600">{feature.description}</p>
              <button className="mt-2 px-4 py-2 bg-primary-500 hover:bg-primary-700 rounded-lg transition-colors">Go</button>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-primary-900 mb-4 flex items-center">
              <span className="mr-2">📊</span> Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl text-center transform transition-transform hover:scale-105 cursor-pointer shadow-md">
                <div className="text-3xl font-bold text-primary-600 mb-2">{userStats.weeklyHours}</div>
                <p className="text-sm text-primary-700 font-medium">Study Hours This Week</p>
                <div className="mt-2 w-full bg-primary-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(userStats.weeklyHours/20) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl text-center transform transition-transform hover:scale-105 cursor-pointer shadow-md">
                <div className="text-3xl font-bold text-primary-600 mb-2">{userStats.cwa}</div>
                <p className="text-sm text-primary-700 font-medium">Current CWA</p>
                <div className="mt-2 flex justify-center space-x-1">
                  {[1,2,3,4].map(star => (
                    <span key={star} className={`text-lg ${star <= Math.floor(userStats.cwa) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-primary-900 mb-4 flex items-center">
              <span className="mr-2">📅</span> Upcoming Deadlines
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-red-50 to-primary-50 rounded-xl border-l-4 border-red-500 transform transition-transform hover:scale-102">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-primary-900">Mathematics Assignment</p>
                    <p className="text-sm text-red-600 font-medium">Due: Tomorrow</p>
                  </div>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="mt-2 w-full bg-red-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-primary-50 rounded-xl border-l-4 border-yellow-500 transform transition-transform hover:scale-102">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-primary-900">Physics Lab Report</p>
                    <p className="text-sm text-yellow-600 font-medium">Due: Next Week</p>
                  </div>
                  <span className="text-2xl">🧪</span>
                </div>
                <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-primary-900 mb-4 flex items-center">
            <span className="mr-2">📈</span> Progress Overview
          </h3>
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-primary-900 text-lg">Weekly Study Goal</p>
                  <p className="text-primary-600">14 of 20 hours completed</p>
                </div>
                <div className="text-2xl">🎯</div>
              </div>
              <div className="w-full bg-white rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-primary-900 text-lg">Study Streak</p>
                  <p className="text-primary-600">{userStats.streak} days and counting!</p>
                </div>
                <div className="text-2xl">🔥</div>
              </div>
              <div className="flex space-x-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1">
                    <div className={`w-full aspect-square ${i < userStats.streak ? 'bg-gradient-to-br from-primary-400 to-primary-600' : 'bg-primary-200'} rounded-lg shadow-sm transform transition-transform hover:scale-105 cursor-pointer`}></div>
                    <div className="text-center mt-1 text-xs text-primary-600">{['M','T','W','T','F','S','S'][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;