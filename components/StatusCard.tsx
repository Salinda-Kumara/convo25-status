'use client';

import { Student } from '@/types/student';

interface StatusCardProps {
    student: Student;
}

export default function StatusCard({ student }: StatusCardProps) {
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'submitted': return 'status-submitted';
            case 'approved': return 'status-approved';
            case 'pending': return 'status-pending';
            case 'rejected': return 'status-rejected';
            case 'payment received': return 'status-payment-received';
            case 'confirmed': return 'status-confirmed';
            case 'not paid': return 'status-not-paid';
            default: return 'status-not-submitted';
        }
    };

    const completedDocs = student.documents.filter(
        doc => doc.status === 'Submitted' || doc.status === 'Approved' || doc.status === 'Payment received' || doc.status === 'Confirmed'
    ).length;
    const totalDocs = student.documents.length;
    const progress = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;

    return (
        <div className="stats-card h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-100 text-lg">
                        {student.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                            {student.registrationNumber}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-slate-100">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container w-full mb-6" style={{ width: '100%' }}>
                <div
                    className="progress-bar"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? '#10b981' : undefined
                    }}
                ></div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                    <p className="text-xs text-slate-400 mb-1">Department</p>
                    <p className="font-medium text-slate-300">{student.department}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 mb-1">Program</p>
                    <p className="font-medium text-slate-300">{student.program}</p>
                </div>
            </div>

            {/* Documents List */}
            <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                {student.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{doc.name}</span>
                        <span className={`status-badge ${getStatusClass(doc.status)}`}>
                            {doc.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
