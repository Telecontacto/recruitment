import { NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/data-mssql';
import { changeAttendantStatus } from '@/app/lib/definitions';

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('ID');
        const stage = searchParams.get('stage');

        if (!id || !stage) {
            return NextResponse.json({
                success: false,
                message: 'Missing required parameters: ID or stage'
            }, { status: 400 });
        }

        const params = [stage, id];

        // First update ENTREVISTA_INICIAL
        const updateEntrevistaQuery = `
            UPDATE ENTREVISTA_INICIAL 
            SET Status = @param1
            WHERE solicitorId = @param2;
            SELECT @@ROWCOUNT as affectedRows;
        `;

        const entrevistaResult = await executeQuery<{ affectedRows: number }[]>(updateEntrevistaQuery, params);
        
        // Third update for EVALUATION_TABLE
        const updateEvaluationQuery = `
            UPDATE ENTREVISTA_PRESENCIAL 
            SET status = @param1
            WHERE solicitorId = @param2;
            SELECT @@ROWCOUNT as affectedRows;
        `;

        const evaluationResult = await executeQuery<{ affectedRows: number }[]>(updateEvaluationQuery, params);

        // Then update RECLUTAMIENTO_SOLICITUDES
        const updateReclutamientoQuery = `
            UPDATE RECLUTAMIENTO_SOLICITUDES 
            SET StatusSolicitud = @param1
            WHERE ID = @param2;
            SELECT StatusSolicitud, ID 
            FROM RECLUTAMIENTO_SOLICITUDES 
            WHERE ID = @param2;
        `;

        const reclutamientoResult = await executeQuery<changeAttendantStatus[]>(updateReclutamientoQuery, params);

        return NextResponse.json({
            success: true,
            data: {
                entrevistaUpdated: entrevistaResult[0]?.affectedRows > 0,
                reclutamientoStatus: reclutamientoResult[0] || null,
                evaluationUpdated: evaluationResult[0]?.affectedRows > 0
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}