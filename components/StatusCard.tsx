'use client';

import { Student } from '@/types/student';

interface StatusCardProps {
    student: Student;
}

export default function StatusCard({ student }: StatusCardProps) {
    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'submitted': return 'badge-info';
            case 'approved': return 'badge-success';
            case 'pending': return 'badge-warning';
            case 'rejected': return 'badge-error';
            default: return 'badge-neutral';
        }
    };

    const completedDocs = student.documents.filter(
        doc => doc.status === 'Submitted' || doc.status === 'Approved'
    ).length;
    const totalDocs = student.documents.length;
    const progress = totalDocs > 0 ? (completedDocs / totalDocs) * 100 : 0;

    return (
        <div className="card p-5 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                        {student.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {student.registrationNumber}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-slate-900">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bg h-2 w-full mb-6">
                <div
                    className="progress-fill h-full"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: progress === 100 ? '#16a34a' : '#2563eb'
                    }}
                ></div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                    <p className="text-xs text-slate-500 mb-1">Department</p>
                    <p className="font-medium text-slate-700">{student.department}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 mb-1">Program</p>
                    <p className="font-medium text-slate-700">{student.program}</p>
                </div>
            </div>

            {/* Documents List */}
            <div className="mt-auto border-t border-slate-100 pt-4 space-y-3">
                {student.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{doc.name}</span>
                        <span className={`badge ${getStatusClass(doc.status)}`}>
                            {doc.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
