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
    status: 'Submitted' | 'Pending' | 'Approved' | 'Rejected' | 'Not Submitted';
    submittedDate?: string;
}

export type StatusType = 'Submitted' | 'Pending' | 'Approved' | 'Rejected' | 'Not Submitted';
