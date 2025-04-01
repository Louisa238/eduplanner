import { useState, useEffect } from 'react';

function TimeTable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(1);
  const [studySessionLength, setStudySessionLength] = useState(60);
  const [breakDuration, setBreakDuration] = useState(10);
  const [courses, setCourses] = useState([]);
  const [availableHours, setAvailableHours] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: Array(12).fill(true) }), {})
  );
  const [generatedSchedule, setGeneratedSchedule] = useState({});
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  
    const handleAddCourse = () => {
    if (!courseName) return;
    
    const newCourse = {
      id: Date.now(),
      name: courseName,
      creditHours,
      priority: creditHours,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };
    
    setCourses([...courses, newCourse]);
    setCourseName('');
    setCreditHours(1);
    setShowAddCourse(false);
  };

  const generateTimetable = () => {
    const newSchedule = {};
    days.forEach(day => {
      newSchedule[day] = [];
    });

    // Sort courses by priority (credit hours)
    const sortedCourses = [...courses].sort((a, b) => b.creditHours - a.creditHours);

    sortedCourses.forEach(course => {
      const sessionsPerWeek = course.creditHours * 2;
      const sessionLength = Math.ceil(studySessionLength / 60);
      let sessionsScheduled = 0;

      // Try to distribute sessions evenly across the week
      while (sessionsScheduled < sessionsPerWeek) {
        // Find the day with the least scheduled sessions
        const dayWithLeastSessions = days.reduce((minDay, currentDay) => {
          const currentDaySessions = newSchedule[currentDay].length;
          const minDaySessions = newSchedule[minDay].length;
          return currentDaySessions < minDaySessions ? currentDay : minDay;
        }, days[0]);

        const availableSlots = availableHours[dayWithLeastSessions]
          .map((available, index) => available ? index : -1)
          .filter(slot => slot !== -1);

        // Check if we have enough consecutive slots
        for (let i = 0; i <= availableSlots.length - sessionLength; i++) {
          const consecutive = availableSlots.slice(i, i + sessionLength);
          if (consecutive.length === sessionLength && 
              consecutive.every((slot, index) => 
                slot === consecutive[0] + index)) {
            
            // Check for time conflicts
            const startTime = consecutive[0] + 8;
            const endTime = startTime + sessionLength;
            const hasConflict = newSchedule[dayWithLeastSessions].some(session => {
              const sessionStart = parseInt(session.time);
              const sessionEnd = sessionStart + Math.ceil(session.duration / 60);
              return (startTime < sessionEnd && endTime > sessionStart);
            });

            if (!hasConflict) {
              // Add break time between sessions
              const startSlot = consecutive[0];
              newSchedule[dayWithLeastSessions].push({
                time: `${startSlot + 8}:00`,
                course: course.name,
                duration: studySessionLength,
                color: course.color
              });

              // Mark slots as used
              consecutive.forEach(slot => {
                availableHours[dayWithLeastSessions][slot] = false;
              });

              sessionsScheduled++;
              break;
            }
          }
        }

        // If we can't schedule more sessions, break the loop
        if (sessionsScheduled === sessionsPerWeek) break;
      }
    });

    // Sort sessions by time for each day
    days.forEach(day => {
      newSchedule[day].sort((a, b) => 
        parseInt(a.time) - parseInt(b.time)
      );
    });
    
    setGeneratedSchedule(newSchedule);
  };

  const schedule = generatedSchedule;

  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Timetable</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAddCourse(true)}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-700 rounded-lg transition-colors text-white"
              >
                Add Course
              </button>
              <button 
                onClick={generateTimetable}
                className="px-4 py-2 bg-secondary-500 hover:bg-secondary-700 rounded-lg transition-colors text-white"
              >
                Generate Timetable
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Day selector */}
          <div className="flex border-b border-secondary-200">
            {days.map((day) => (
              <button
                key={day}
                className={`flex-1 py-4 text-center font-medium ${selectedDay === day ? 'bg-primary-100 text-primary-600' : 'text-secondary-600 hover:bg-primary-50'}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Available Hours Toggle */}
          <div className="p-6 border-b border-secondary-200">
            <h3 className="text-lg font-medium text-secondary-900 mb-4">Available Study Hours</h3>
            <div className="grid grid-cols-12 gap-2 items-center text-sm">
              <div className="col-span-2"></div>
              {timeSlots.map((hour) => (
                <div key={hour} className="text-center">{hour}:00</div>
              ))}
            </div>
            {days.map((day) => (
              <div key={day} className="grid grid-cols-12 gap-2 items-center mt-2">
                <div className="col-span-2 font-medium">{day}</div>
                {availableHours[day].map((available, index) => (
                  <button
                    key={index}
                    className={`h-6 rounded ${available ? 'bg-green-100' : 'bg-red-100'}`}
                    onClick={() => {
                      const newHours = { ...availableHours };
                      newHours[day][index] = !available;
                      setAvailableHours(newHours);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Timetable grid */}
          <div className="p-6">
            <div className="space-y-4">
              {(schedule[selectedDay] || []).map((class_, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg transition-colors"
                  style={{ backgroundColor: class_.color + '20' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-secondary-900">{class_.course}</h3>
                      <p className="text-sm text-secondary-600">
                        Duration: {class_.duration} minutes
                      </p>
                    </div>
                    <p className="text-primary-600 font-medium">{class_.time}</p>
                  </div>
                </div>
              ))}
              {(!schedule[selectedDay] || schedule[selectedDay].length === 0) && (
                <div className="text-center text-secondary-600 py-8">
                  No study sessions scheduled for this day
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Input Form */}
        {showAddCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700">Course Name</label>
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700">Credit Hours</label>
                  <select
                    value={creditHours}
                    onChange={(e) => setCreditHours(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(hours => (
                      <option key={hours} value={hours}>{hours}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700">Study Session Length</label>
                  <select
                    value={studySessionLength}
                    onChange={(e) => setStudySessionLength(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700">Break Duration</label>
                  <select
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAddCourse(false)}
                    className="px-4 py-2 text-secondary-700 hover:text-secondary-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCourse}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700"
                  >
                    Add Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Color Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-primary-100"></div>
              <span className="text-sm text-secondary-600">Selected Day</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-primary-50"></div>
              <span className="text-sm text-secondary-600">Class Block</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TimeTable;