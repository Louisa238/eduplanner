import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function ProgressTracker() {
  const { darkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [studentStats, setStudentStats] = useState({
    averageGrade: 0,
    completionRate: 0,
    totalAssignments: 0,
    completedAssignments: 0
  });

  const calculateStudentStats = (categories) => {
    let totalGrades = 0;
    let gradeCount = 0;
    let totalAssignments = 0;
    let completedAssignments = 0;

    categories.forEach(category => {
      category.courses.forEach(course => {
        totalAssignments++;
        if (course.status === 'completed') {
          completedAssignments++;
          if (course.grade) {
            const numericGrade = convertGradeToNumber(course.grade);
            if (numericGrade) {
              totalGrades += numericGrade;
              gradeCount++;
            }
          }
        }
      });
    });

    setStudentStats({
      averageGrade: gradeCount > 0 ? (totalGrades / gradeCount).toFixed(2) : 0,
      completionRate: ((completedAssignments / totalAssignments) * 100).toFixed(1),
      totalAssignments,
      completedAssignments
    });
  };

  const convertGradeToNumber = (grade) => {
    const gradeMap = {
      'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0
    };
    return gradeMap[grade] || null;
  };

  useEffect(() => {
    calculateStudentStats(progressData.categories);
  }, []);

  const progressData = {
    totalCredits: 120,
    completedCredits: 45,
    remainingCredits: 75,
    categories: [
      {
        name: 'Core Courses',
        completed: 6,
        total: 10,
        courses: [
          { code: 'MATH101', name: 'Introduction to Calculus', status: 'completed', grade: 'A' },
          { code: 'PHY102', name: 'Physics I', status: 'completed', grade: 'A-' },
          { code: 'CS101', name: 'Introduction to Programming', status: 'in_progress' },
          { code: 'MATH201', name: 'Linear Algebra', status: 'pending' },
        ],
      },
      {
        name: 'Electives',
        completed: 3,
        total: 6,
        courses: [
          { code: 'ART101', name: 'Introduction to Art', status: 'completed', grade: 'B+' },
          { code: 'MUS102', name: 'Music Theory', status: 'in_progress' },
          { code: 'LIT101', name: 'World Literature', status: 'pending' },
        ],
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      default: return 'Pending';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-primary-50'}`}>
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-primary-600'} text-white shadow-lg`}>
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Progress Tracker</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overall Progress */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-secondary-900'} mb-4`}>Overall Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-primary-50'} p-4 rounded-lg text-center`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-secondary-600'}`}>Average Grade</p>
              <p className="text-2xl font-bold text-primary-600">{studentStats.averageGrade}</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <p className="text-sm text-secondary-600">Completion Rate</p>
              <p className="text-2xl font-bold text-primary-600">{studentStats.completionRate}%</p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <p className="text-sm text-secondary-600">Assignments</p>
              <p className="text-2xl font-bold text-primary-600">
                {studentStats.completedAssignments}/{studentStats.totalAssignments}
              </p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <p className="text-sm text-secondary-600">Learning Streak</p>
              <p className="text-2xl font-bold text-primary-600">5 days</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-secondary-600">Total Credits</p>
              <p className="text-3xl font-bold text-secondary-900">{progressData.totalCredits}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-secondary-600">Completed Credits</p>
              <p className="text-3xl font-bold text-primary-600">{progressData.completedCredits}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-secondary-600">Remaining Credits</p>
              <p className="text-3xl font-bold text-secondary-900">{progressData.remainingCredits}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="h-4 bg-primary-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600"
                style={{ width: `${(progressData.completedCredits / progressData.totalCredits) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-center text-sm text-secondary-600">
              {Math.round((progressData.completedCredits / progressData.totalCredits) * 100)}% Complete
            </p>
          </div>
        </div>

        {/* Category Selector */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 
                (darkMode ? 'bg-gray-700 text-white' : 'bg-primary-100 text-primary-600') : 
                (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-secondary-600 hover:bg-primary-50')}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {progressData.categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-lg ${selectedCategory === category.name ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-primary-50'}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {progressData.categories
            .filter(category => selectedCategory === 'all' || selectedCategory === category.name)
            .map((category) => (
              <div key={category.name} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-secondary-900'}`}>{category.name}</h2>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-secondary-600'}`}>
                    {category.completed} of {category.total} Completed
                  </span>
                </div>
                <div className="space-y-4">
                  {category.courses.map((course) => (
                    <div
                      key={course.code}
                      className="p-4 bg-primary-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-secondary-900">{course.code}</p>
                        <p className="text-sm text-secondary-600">{course.name}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {course.grade && (
                          <span className="px-2 py-1 rounded bg-primary-100 text-primary-800">
                            {course.grade}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded ${getStatusColor(course.status)}`}>
                          {getStatusText(course.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default ProgressTracker;