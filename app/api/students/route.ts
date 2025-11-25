import { NextResponse } from 'next/server';
import { fetchStudentData } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const students = await fetchStudentData();

        return NextResponse.json({
            success: true,
            data: students,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('API Error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch student data',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
