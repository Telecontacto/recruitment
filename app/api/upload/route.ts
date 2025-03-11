import { NextRequest, NextResponse } from 'next/server';

const REMOTE_UPLOAD_URL = 'https://reports.telecontacto.com/reclutamiento/upload.php';
const MAX_FILE_SIZE = 10000000; // 10MB in bytes
const ALLOWED_FILE_TYPES = ['pdf', 'docx'];

export async function POST(request: NextRequest) {
    try {
        console.log('🚀 Starting file upload process...');
        
        // Log the request headers
        console.log('Headers:', Object.fromEntries(request.headers));
        
        const formData = await request.formData();
        console.log('FormData entries:', Array.from(formData.entries()));
        
        const file = formData.get('file') as File | null;
        console.log('Retrieved file:', file ? {
            name: file.name,
            size: file.size,
            type: file.type
        } : 'No file found');

        const id = formData.get('id') as string || Date.now().toString();

        console.log('form data:', JSON.stringify(formData));
        
        console.log('📁 File details:', {
            name: file?.name,
            size: file?.size,
            type: file?.type
        });

        if (!file) {
            console.error('❌ No file received in request');
            return NextResponse.json({ 
                success: false,
                message: 'No file was uploaded or an error occurred.',
                debug: { formDataKeys: Array.from(formData.keys()) }
            }, { status: 400 });
        }

        // File size validation
        if (file.size > MAX_FILE_SIZE) {
            console.error('❌ File size exceeded:', file.size);
            return NextResponse.json({
                success: false,
                message: 'File size exceeds the 10MB limit.'
            }, { status: 400 });
        }

        // File type validation
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        console.log('📄 File extension:', fileExtension);
        if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
            console.error('❌ Invalid file type:', fileExtension);
            return NextResponse.json({
                success: false,
                message: 'Invalid file type. Only PDF and DOCX are allowed.'
            }, { status: 400 });
        }

        console.log('🌐 Initiating remote upload to:', REMOTE_UPLOAD_URL);
        // Create new FormData for remote upload
        const remoteFormData = new FormData();
        remoteFormData.append('file', file);
        remoteFormData.append('id', id);

        console.log('🌐 Sending to remote:', {
            url: REMOTE_UPLOAD_URL,
            fileName: file.name,
            fileSize: file.size
        });

        console.time('Remote upload');
        // Send to remote server
        const response = await fetch(REMOTE_UPLOAD_URL, {
            method: 'POST',
            body: remoteFormData,
        });
        console.timeEnd('Remote upload');

        console.log('📡 Remote server response status:', response.status);
        
        if (!response.ok) {
            console.error('❌ Remote server error:', response.status, response.statusText);
            throw new Error(`Remote server responded with status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Upload successful:', result);
        
        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully.',
            ...result
        });
        
    } catch (error) {
        console.error('💥 Upload failed:', error);
        return NextResponse.json({
            success: false,
            message: 'Error occurred while uploading the file to remote server.',
            debug: { error: error instanceof Error ? error.message : String(error) }
        }, { status: 500 });
    }
}
