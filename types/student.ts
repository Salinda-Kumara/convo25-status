export interface Student {
    id: string;
    registrationNumber: string;
    name: string;
    department: string;
    program: string;
    documents: DocumentStatus[];
}

export interface DocumentStatus {
    name: string;
    status: 'Submitted' | 'Pending' | 'Approved' | 'Rejected' | 'Not Submitted' | 'Payment received' | 'Confirmed' | 'Not Paid';
    submittedDate?: string;
}

export type StatusType = 'Submitted' | 'Pending' | 'Approved' | 'Rejected' | 'Not Submitted' | 'Payment received' | 'Confirmed' | 'Not Paid';

export interface EligibilityData {
    id: string;
    registrationNumber: string;
    name: string;
    degreeType: string; // General/Special
    classAward: string;
    gpa: string;
}
