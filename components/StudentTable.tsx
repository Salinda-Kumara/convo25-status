'use client';

import { Student } from '@/types/student';

interface StudentTableProps {
    students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved': return 'status-approved';
            case 'submitted': return 'status-submitted';
            case 'pending': return 'status-pending';
            case 'rejected': return 'status-rejected';
            default: return 'status-not-submitted';
        }
    };

    const calculateProgress = (student: Student) => {
        const completed = student.documents.filter(
            doc => doc.status === 'Submitted' || doc.status === 'Approved'
        ).length;
        return student.documents.length > 0 ? (completed / student.documents.length) * 100 : 0;
    };

    if (students.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    No students found
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    Try adjusting your search criteria
                </p>
            </div>
        );
    }

    return (
        <div style={{
            maxHeight: '800px',
            overflowY: 'auto',
            overflowX: 'auto',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            <table className="data-table">
                <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <tr>
                        <th>S. No</th>
                        <th>Registration No.</th>
                        <th>Name with Initials</th>
                        <th>Name Appeared in the Degree Certificate</th>
                        <th>Progress</th>
                        {students[0]?.documents.map((doc, index) => (
                            <th key={index}>{doc.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => {
                        const progress = calculateProgress(student);
                        return (
                            <tr key={student.id}>
                                <td>
                                    <div style={{ fontWeight: '600', color: '#6b7280' }}>
                                        {student.id}
                                    </div>
                                </td>
                                <td>
                                    <div style={{
                                        fontFamily: 'monospace',
                                        fontSize: '13px',
                                        color: '#6b7280'
                                    }}>
                                        {student.registrationNumber}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: '600', color: '#111827' }}>
                                        {student.name}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '13px', color: '#4b5563' }}>
                                        {student.department}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="progress-container">
                                            <div
                                                className={`progress-bar ${progress === 100 ? 'progress-bar-complete' : ''}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>
                                            {Math.round(progress)}%
                                        </span>
                                    </div>
                                </td>
                                {student.documents.map((doc, index) => (
                                    <td key={index}>
                                        <span className={`status-badge ${getStatusClass(doc.status)}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
