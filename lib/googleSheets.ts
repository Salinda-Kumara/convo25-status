import { google } from 'googleapis';
import { Student, DocumentStatus, EligibilityData } from '@/types/student';

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
                { name: 'SAB Alumni Registration Form', index: 5 },
                { name: 'Exit Interview Form', index: 6 },
                { name: 'Finance Clearance Form', index: 7 },
                { name: 'Convocation Payment', index: 8 },
                { name: 'Participation', index: 9 },
                { name: 'No of Guests Allowed', index: 10 },
                { name: 'Cloak Collection', index: 11 },
                { name: 'Degree Certificate And Transcript', index: 12 },
            ];

            for (const doc of documentColumns) {
                if (row[doc.index] !== undefined) {
                    // For these columns, use raw value instead of normalizing
                    const rawValueColumns = ['Participation', 'No of Guests Allowed', 'Cloak Collection', 'Degree Certificate And Transcript'];
                    const status = rawValueColumns.includes(doc.name)
                        ? (row[doc.index] || 'Not Submitted')
                        : normalizeStatus(row[doc.index]);

                    student.documents.push({
                        name: doc.name,
                        status: status as any,
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

    // Handle payment-related statuses
    if (normalized.includes('payment') && normalized.includes('received')) return 'Payment received';
    if (normalized.includes('not') && normalized.includes('paid')) return 'Not Paid';

    // Handle Participation statuses (in person/Absentia)
    if (normalized === 'in person' || normalized.includes('in person')) return 'Confirmed';
    if (normalized === 'absentia' || normalized.includes('absentia')) return 'Confirmed';

    // Handle Cloak Collection (Yes/No)
    if (normalized === 'yes') return 'Approved';
    if (normalized === 'no') return 'Pending';

    // Handle Degree Certificate And Transcript (Ready/Not Ready)
    if (normalized === 'ready') return 'Approved';
    if (normalized === 'not ready') return 'Pending';

    // Handle No of Guests Allowed (numeric count - treat any number as Confirmed)
    if (!isNaN(Number(normalized)) && normalized !== '') return 'Confirmed';

    // Handle confirmation statuses
    if (normalized.includes('confirm')) return 'Confirmed';

    // Handle submission statuses
    if (normalized.includes('submit') && !normalized.includes('not')) return 'Submitted';
    if (normalized.includes('pending')) return 'Pending';
    if (normalized.includes('approve')) return 'Approved';
    if (normalized.includes('reject')) return 'Rejected';

    return 'Not Submitted';
}

// Fetch eligibility data from Mastersheet
export async function fetchEligibilityData(): Promise<EligibilityData[]> {
    try {
        const sheets = await getGoogleSheetsClient();
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = 'Mastersheet!A:Z'; // Hardcoded range for Mastersheet

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        const eligibilityList: EligibilityData[] = [];

        // Process each row (skip header)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];

            if (!row || row.length === 0) continue;

            const student: EligibilityData = {
                id: `eligibility-${i}`,
                registrationNumber: row[1] || '', // Column B: Registration Number
                name: row[2] || '', // Column C: Name
                degreeType: row[3] || '', // Column D: Degree Type
                gpa: row[4] || '', // Column E: GPA
                classAward: row[5] || '', // Column F: Class Award
            };

            eligibilityList.push(student);
        }

        return eligibilityList;
    } catch (error) {
        console.error('Error fetching eligibility data:', error);
        throw new Error('Failed to fetch eligibility data from Google Sheets');
    }
}
