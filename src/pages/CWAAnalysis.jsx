import { useState } from 'react';

function CWAAnalysis() {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [semesterData, setSemesterData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    grade: 'A',
    points: 4.0,
    credits: 3
  });

  const grades = [
    { grade: 'A', range: '70-100' },
    { grade: 'B', range: '60-69' },
    { grade: 'C', range: '50-59' },
    { grade: 'D', range: '40-49' },
    { grade: 'F', range: '0-39' },
  ];

  const addNewSemester = () => {
    const newSemesterNumber = semesterData.length + 1;
    setSemesterData([...semesterData, { semester: newSemesterNumber, courses: [] }]);
    setSelectedSemester(newSemesterNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'grade') {
      const selectedGrade = grades.find(g => g.grade === value);
      setNewCourse(prev => ({
        ...prev,
        grade: value
      }));
    } else {
      setNewCourse(prev => ({
        ...prev,
        [name]: name === 'credits' ? parseFloat(value) : value
      }));
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const updatedSemesterData = semesterData.map(sem => {
      if (sem.semester === selectedSemester) {
        return {
          ...sem,
          courses: [...sem.courses, { ...newCourse }]
        };
      }
      return sem;
    });
    setSemesterData(updatedSemesterData);
    setNewCourse({
      code: '',
      name: '',
      grade: 'A',
      points: 4.0,
      credits: 3
    });
    setShowAddForm(false);
  };


  const calculateCWA = (courses) => {
    if (courses.length === 0) return 0;
    const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
    return totalCredits > 0 ? courses.length / totalCredits * 100 : 0;
  };

  const overallCWA = calculateCWA(semesterData.flatMap(sem => sem.courses));

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">CWA Analysis</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overall CWA Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">Overall CWA</h2>
            <p className="text-4xl font-bold text-primary-600">{overallCWA.toFixed(2)}</p>
          </div>
        </div>

        {/* Semester Controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex space-x-4 mb-4">
            <button
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
              onClick={addNewSemester}
            >
              Add New Semester
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${selectedSemester === 'all' ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-primary-50'}`}
              onClick={() => setSelectedSemester('all')}
            >
              All Semesters
            </button>
            {semesterData.map((sem) => (
              <button
                key={sem.semester}
                className={`px-4 py-2 rounded-lg ${selectedSemester === sem.semester ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-primary-50'}`}
                onClick={() => setSelectedSemester(sem.semester)}
              >
                Semester {sem.semester}
              </button>
            ))}
          </div>
        </div>

        {/* Add Course Form */}
        {selectedSemester !== 'all' && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-secondary-900">Add Course to Semester {selectedSemester}</h2>
              <button
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add Course'}
              </button>
            </div>
            {showAddForm && (
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Course Code</label>
                    <input
                      type="text"
                      name="code"
                      value={newCourse.code}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Course Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newCourse.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Grade</label>
                    <select
                      name="grade"
                      value={newCourse.grade}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      {grades.map(g => (
                        <option key={g.grade} value={g.grade}>{g.grade} ({g.range})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700">Credits</label>
                    <input
                      type="number"
                      name="credits"
                      value={newCourse.credits}
                      onChange={handleInputChange}
                      min="1"
                      max="6"
                      step="1"
                      className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Grade Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Grades */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Course Grades</h2>
            <div className="space-y-4">
              {semesterData
                .filter(sem => selectedSemester === 'all' || selectedSemester === sem.semester)
                .map((sem) => (
                  <div key={sem.semester}>
                    <h3 className="font-medium text-secondary-900 mb-2">Semester {sem.semester}</h3>
                    <div className="space-y-2">
                      {sem.courses.map((course) => (
                        <div
                          key={course.code}
                          className="p-4 bg-primary-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-secondary-900">{course.code}</p>
                            <p className="text-sm text-secondary-600">{course.name}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded ${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Statistics</h2>
            <div className="space-y-6">
              {semesterData
                .filter(sem => selectedSemester === 'all' || selectedSemester === sem.semester)
                .map((sem) => (
                  <div key={sem.semester} className="p-4 bg-primary-50 rounded-lg">
                    <h3 className="font-medium text-secondary-900 mb-2">Semester {sem.semester}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-secondary-600">CWA</p>
                        <p className="text-xl font-bold text-primary-600">{calculateCWA(sem.courses).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-secondary-600">Credits</p>
                        <p className="text-xl font-bold text-primary-600">{sem.courses.reduce((acc, course) => acc + course.credits, 0)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-secondary-600">Courses</p>
                        <p className="text-xl font-bold text-primary-600">{sem.courses.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CWAAnalysis;