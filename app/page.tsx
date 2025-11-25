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
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a0b2e 0%, #16213e 50%, #0f1729 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <Header />

      {/* Convocation 2025 Banner */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        overflow: 'hidden',
        borderBottom: '4px solid #1e3a8a'
      }}>
        <img
          src="/convocation-banner.png"
          alt="9th Annual Convocation 2025 - CA SAB Campus"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      <div className="container" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        {/* Page Header */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#f0f6fc',
              marginBottom: '8px'
            }}>
              Student Document Submission Status
            </h1>
            <p style={{ fontSize: '14px', color: '#8b949e' }}>
              Track and monitor document submission progress for all students
            </p>
          </div>

          <a
            href="https://sablms.casrilanka.com/course/view.php?id=3128"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 24px',
              backgroundColor: '#61067cff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#7a0a9fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(97, 6, 124, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#61067cff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
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
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <div style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <svg style={{ width: '18px', height: '18px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div style={{
            padding: '80px 20px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '8px',
            border: '1px solid #fee2e2'
          }}>
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
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <div style={{
            padding: '80px 20px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid #e5e7eb',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              margin: '0 auto',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
              Loading student data...
            </p>
          </div>
        ) : (
          <StudentTable students={filteredStudents} />
        )}

        {/* Statistics Cards - Bottom */}
        {!isLoading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '32px'
          }}>
            <div className="stats-card">
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Students
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#f8fafc' }}>
                {students.length}
              </div>
            </div>
            <div className="stats-card">
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Fully Approved
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#34d399' }}>
                {approvedCount}
              </div>
            </div>
            <div className="stats-card">
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pending Review
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#fbbf24' }}>
                {pendingCount}
              </div>
            </div>
            <div className="stats-card">
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Completion Rate
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#60a5fa' }}>
                {students.length > 0 ? Math.round((approvedCount / students.length) * 100) : 0}%
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
