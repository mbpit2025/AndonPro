// app/api/locations/[locationId]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/app/lib/prisma';

// ✅ Fix 1: Update the type to include `Promise<...>`
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ locationId: string }> } // ← Promise wrapper
) {
  // ✅ Fix 2: `await params` — required by TS, safe at runtime
  const { locationId } = await params;

  if (!locationId) {
    return NextResponse.json(
      { error: 'locationId is required' },
      { status: 400 }
    );
  }

  try {
    const location = await prisma.location.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}