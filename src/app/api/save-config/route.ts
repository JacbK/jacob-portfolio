import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { yaml } = await request.json();

    if (!yaml || typeof yaml !== 'string') {
      return NextResponse.json({ error: 'Invalid YAML content' }, { status: 400 });
    }

    // Write to project root
    const filePath = join(process.cwd(), 'profile.yaml');
    await writeFile(filePath, yaml, 'utf-8');

    return NextResponse.json({ success: true, path: filePath });
  } catch (error) {
    console.error('Failed to save profile.yaml:', error);
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}
