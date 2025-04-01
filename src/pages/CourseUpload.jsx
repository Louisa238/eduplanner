import { useState } from 'react';

function CourseUpload() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);

  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    semester: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      id: courses.length + 1,
      ...newCourse,
      credits: parseInt(newCourse.credits),
      semester: parseInt(newCourse.semester),
    };
    setCourses(prev => [...prev, courseData]);
    setNewCourse({ code: '', name: '', credits: '', semester: '' });
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.type.includes('pdf') && !uploadedFile.type.includes('word')) {
      setError('Please upload a PDF or Word document');
      return;
    }

    setFile(uploadedFile);
    setError('');
  };

  const processDocument = async () => {
    if (!file) {
      setError('Please upload a document first');
      return;
    }

    setLoading(true);
    try {
      // Here we would integrate with a backend API for document processing
      // For now, we'll simulate the response
      const simulatedSummary = `This is a summary of ${file.name}. The document contains course materials and key concepts.`;
      const simulatedQuestions = [
        { id: 1, question: 'What are the main topics covered in this material?', answer: 'The main topics include key concepts and course materials.' },
        { id: 2, question: 'How does this material relate to the course objectives?', answer: 'The material aligns with the course learning outcomes.' },
      ];

      setSummary(simulatedSummary);
      setQuestions(simulatedQuestions);
    } catch (err) {
      setError('Failed to process document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Course Upload</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Upload Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-secondary-700">
                  Course Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={newCourse.code}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700">
                  Course Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={newCourse.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="credits" className="block text-sm font-medium text-secondary-700">
                    Credits
                  </label>
                  <input
                    type="number"
                    id="credits"
                    name="credits"
                    required
                    min="1"
                    max="6"
                    className="mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={newCourse.credits}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-secondary-700">
                    Semester
                  </label>
                  <input
                    type="number"
                    id="semester"
                    name="semester"
                    required
                    min="1"
                    max="8"
                    className="mt-1 block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={newCourse.semester}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Course
              </button>
            </form>
          </div>

          {/* Document Upload and Processing */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Upload Course Material</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Course Document (PDF/DOCX)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-secondary-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary-50 file:text-primary-700
                    hover:file:bg-primary-100"
                />
              </div>
              {file && (
                <button
                  onClick={processDocument}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:bg-secondary-300"
                >
                  {loading ? 'Processing...' : 'Process Document'}
                </button>
              )}
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
            </div>

            {summary && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-secondary-900 mb-2">Document Summary</h3>
                <p className="text-secondary-600 text-sm bg-secondary-50 p-4 rounded-lg">{summary}</p>
              </div>
            )}

            {questions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-secondary-900 mb-2">Practice Questions</h3>
                <div className="space-y-4">
                  {questions.map((q) => (
                    <div key={q.id} className="bg-secondary-50 p-4 rounded-lg">
                      <p className="font-medium text-secondary-900 mb-2">{q.question}</p>
                      <p className="text-secondary-600 text-sm">{q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Course List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Uploaded Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-secondary-900">{course.code}</h3>
                      <p className="text-sm text-secondary-600">{course.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary-600">{course.credits} Credits</p>
                      <p className="text-sm text-secondary-600">Semester {course.semester}</p>
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

export default CourseUpload;