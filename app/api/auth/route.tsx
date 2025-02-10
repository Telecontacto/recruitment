import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';
import { sha256 } from 'js-sha256';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const email = searchParams.get('email');
        const passwordParam = searchParams.get('password');

        if (!passwordParam) {
            throw new Error('Password is required');
        }

        // Create hex string of hashed password
        const hashedPassword = sha256(passwordParam);

        const query = `
      select username from USERS
      where email = @param1 and password = @param2
    `;
        const params = [
            email,
            hashedPassword
        ];

        const result = await executeQuery<any[]>(query, params);
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
