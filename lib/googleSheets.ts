import { google } from 'googleapis';
import { Student, DocumentStatus } from '@/types/student';

// Initialize Google Sheets API
export async function getGoogleSheetsClient() {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        return sheets;
    } catch (error) {
        console.error('Error initializing Google Sheets client:', error);
        throw new Error('Failed to initialize Google Sheets client');
    }
}

// Fetch student data from Google Sheets
export async function fetchStudentData(): Promise<Student[]> {
    try {
        const sheets = await getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:Z';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        // First row contains headers
        // S. No | Registration Number | Name with initials | Name Appeared in the Degree Certificate | Forms...
        const students: Student[] = [];

        // Process each row (skip header)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            // Skip empty rows
            if (!row || row.length === 0) continue;

            // Extract basic student info based on actual sheet structure
            const student: Student = {
                id: row[0] || `student-${i}`, // Column 0: S. No
                registrationNumber: row[1] || '', // Column 1: Registration Number
                name: row[2] || '', // Column 2: Name with initials
                department: row[3] || '', // Column 3: Name Appeared in the Degree Certificate
                program: '', // No Program column
                documents: [],
            };

            // Extract document statuses (columns 4 onwards)
            const documentColumns = [
                { name: 'Supplication Form', index: 4 },
                { name: 'SAB Alumni Registration', index: 5 },
                { name: 'Exit Interview Form', index: 6 },
                { name: 'Finance Clearance', index: 7 },
                { name: 'Application Form', index: 8 },
            ];

            for (const doc of documentColumns) {
                if (row[doc.index] !== undefined) {
                    const status = normalizeStatus(row[doc.index]);
                    student.documents.push({
                        name: doc.name,
                        status: status,
                        submittedDate: undefined,
                    });
                }
            }

            students.push(student);
        }

        return students;
    } catch (error) {
        console.error('Error fetching student data:', error);
        throw new Error('Failed to fetch student data from Google Sheets');
    }
}

// Normalize status values from sheet
function normalizeStatus(value: string): DocumentStatus['status'] {
    if (!value) return 'Not Submitted';

    const normalized = value.toLowerCase().trim();

    if (normalized.includes('submit') && !normalized.includes('not')) return 'Submitted';
    if (normalized.includes('pending')) return 'Pending';
    if (normalized.includes('approve')) return 'Approved';
    if (normalized.includes('reject')) return 'Rejected';

    return 'Not Submitted';
}
