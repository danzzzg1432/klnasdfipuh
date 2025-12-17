import { useState, useMemo } from 'react';
import './App.css';
import studentsData from './data/students.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return studentsData.students;

    const lowerSearch = searchTerm.toLowerCase();
    return studentsData.students.filter(student => {
      return (
        student['Family Name']?.toLowerCase().includes(lowerSearch) ||
        student['First Name/s']?.toLowerCase().includes(lowerSearch) ||
        student['School Name']?.toLowerCase().includes(lowerSearch) ||
        Object.keys(student)
          .filter(key => key.startsWith('Course Name'))
          .some(key => student[key]?.toLowerCase().includes(lowerSearch))
      );
    });
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="title-main">HSC</span>
            <span className="title-sub">DISTINGUISHED ACHIEVERS</span>
          </h1>
          <p className="subtitle">
            The Year 12 HSC Honour Roll names students who achieved the highest marks - a Band 6 or E4 - in one or more subjects.
          </p>
        </div>
      </header>

      <main className="main-content">
        <div className="search-section">
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by school name, family name, or course..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button className="clear-button" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>
          <div className="results-info">
            Showing {filteredStudents.length.toLocaleString()} of {studentsData.students.length.toLocaleString()} achievers
          </div>
        </div>

        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Family Name</th>
                <th>First Name/s</th>
                <th>School Name</th>
                <th>Courses</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => {
                const courses = Object.keys(student)
                  .filter(key => key.startsWith('Course Name') && student[key])
                  .map(key => student[key]);

                return (
                  <tr key={startIndex + index} className="student-row">
                    <td className="family-name">{student['Family Name']}</td>
                    <td>{student['First Name/s']}</td>
                    <td className="school-name">{student['School Name']}</td>
                    <td className="courses">
                      {courses.length > 0 ? (
                        <div className="course-list">
                          {courses.map((course, i) => (
                            <span key={i} className="course-badge">{course}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="no-courses">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>HSC Distinguished Achievers 2025</p>
      </footer>
    </div>
  );
}

export default App;
