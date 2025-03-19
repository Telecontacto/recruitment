import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Get the file content as arrayBuffer
    const data = await response.arrayBuffer();
    
    // Get content type from original response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Return the file with appropriate headers
    return new NextResponse(data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${url.split('/').pop()}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
