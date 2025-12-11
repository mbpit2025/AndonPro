// app/api/locations/[locationId]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import  prisma  from '@/app/lib/prisma'; // ✅ named import

export async function GET(
  _req: NextRequest,
  { params }: { params: { locationId: string } }
) {
  const { locationId } = await params; // ✅ tanpa await

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