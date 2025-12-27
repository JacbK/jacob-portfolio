import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import yaml from 'js-yaml';

export async function GET() {
  try {
    const configPath = join(process.cwd(), 'profile.yaml');
    const fileContents = await readFile(configPath, 'utf-8');
    const config = yaml.load(fileContents) as Record<string, unknown>;

    return NextResponse.json({
      exists: true,
      config
    });
  } catch {
    // File doesn't exist or can't be read
    return NextResponse.json({
      exists: false,
      config: null
    });
  }
}
