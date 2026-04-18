import fs from 'fs';
import { NextResponse } from 'next/server';
import { getPipelinePaths } from '@/lib/haiti-video';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { finalVideoPath } = getPipelinePaths();
  if (!fs.existsSync(finalVideoPath)) {
    return NextResponse.json({ ok: false, error: 'Final video not available yet.' }, { status: 404 });
  }

  const video = fs.readFileSync(finalVideoPath);
  return new NextResponse(video, {
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="haitian-revolution-final.mp4"',
    },
  });
}
