import { NextResponse } from 'next/server';
import { fetchEligibilityData } from '@/lib/googleSheets';

export async function GET() {
    try {
        const data = await fetchEligibilityData();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch eligibility data' },
            { status: 500 }
        );
    }
}
