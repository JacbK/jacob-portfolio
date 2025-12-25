import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Determine target folder (documents or images)
    const targetFolder = folder === 'images' ? 'images' : 'documents';
    const materialsPath = join(process.cwd(), 'materials', targetFolder);

    // Ensure directory exists
    await mkdir(materialsPath, { recursive: true });

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = join(materialsPath, safeName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: `materials/${targetFolder}/${safeName}`,
      name: safeName
    });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
