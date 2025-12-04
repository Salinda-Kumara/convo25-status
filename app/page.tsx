'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StudentTable from '@/components/StudentTable';
import { Student } from '@/types/student';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      if (students.length === 0) setIsLoading(true);
      const response = await fetch('/api/students', { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
        if (searchQuery) filterData(data.data, searchQuery);
        else setFilteredStudents(data.data);
      }
    } catch (err) {
      console.error(err);
      if (students.length === 0) setError('Unable to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = (data: Student[], query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = data.filter(student =>
      student.name.toLowerCase().includes(lowerQuery) ||
      student.registrationNumber.toLowerCase().includes(lowerQuery) ||
      student.department.toLowerCase().includes(lowerQuery)
    );
    setFilteredStudents(filtered);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterData(students, searchQuery);
  }, [searchQuery, students]);

  const approvedCount = students.filter(s =>
    s.documents.every(d => d.status === 'Approved')
  ).length;

  const pendingCount = students.filter(s =>
    s.documents.some(d => d.status === 'Pending')
  ).length;

  return (
    <main className="main-layout">
      <Header />

      {/* Convocation 2025 Banner */}
      <div className="banner-container">
        <img
          src="/convocation-banner.png"
          alt="9th Annual Convocation 2025 - CA SAB Campus"
          className="banner-image"
        />
      </div>
      <div className="container content-container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Student Document Submission Status
            </h1>
            <p className="page-description">
              Track and monitor document submission progress for all students
            </p>
          </div>

          <a
            href="https://sablms.casrilanka.com/course/index.php?categoryid=1045"
            target="_blank"
            rel="noopener noreferrer"
            className="submit-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            Submit your Pending Documents
          </a>
        </div>

        {/* Search & Filters */}
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-icon">
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, registration number, or department..."
              className="search-input"
            />
          </div>
        </div>

        {/* Data Table */}
        {error ? (
          <div className="error-container">
            <div style={{ marginBottom: '16px', color: '#dc2626' }}>
              <svg style={{ width: '48px', height: '48px', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Unable to Load Data
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
              {error}
            </p>
            <button
              onClick={fetchData}
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
              Loading student data...
            </p>
          </div>
        ) : (
          <StudentTable students={filteredStudents} />
        )}

        {/* Statistics Cards - Bottom */}
        {/* {!isLoading && !error && (
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-label">
                Total Students
              </div>
              <div className="stats-value">
                {students.length}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">
                Fully Approved
              </div>
              <div className="stats-value stats-value-success">
                {approvedCount}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">
                Pending Review
              </div>
              <div className="stats-value stats-value-warning">
                {pendingCount}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-label">
                Completion Rate
              </div>
              <div className="stats-value stats-value-info">
                {students.length > 0 ? Math.round((approvedCount / students.length) * 100) : 0}%
              </div>
            </div>
          </div>
        )} */}
      </div>
    </main>
  );
}
