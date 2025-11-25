'use client';

import { Student } from '@/types/student';
import StatusCard from './StatusCard';

interface StatusGridProps {
    students: Student[];
    isLoading?: boolean;
}

export default function StatusGrid({ students, isLoading = false }: StatusGridProps) {
    if (isLoading) {
        return (
            <div className="grid-responsive">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="card p-6 h-64 animate-pulse bg-white">
                        <div className="h-6 bg-slate-100 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-slate-100 rounded w-1/2 mb-8"></div>
                        <div className="space-y-3">
                            <div className="h-8 bg-slate-100 rounded"></div>
                            <div className="h-8 bg-slate-100 rounded"></div>
                            <div className="h-8 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (students.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">No students found</h3>
                <p className="text-slate-500">Try adjusting your search criteria</p>
            </div>
        );
    }

    return (
        <div className="grid-responsive">
            {students.map((student) => (
                <StatusCard key={student.id} student={student} />
            ))}
        </div>
    );
}
