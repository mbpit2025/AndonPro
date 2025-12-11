import { NextResponse } from "next/server";
import prisma  from "@/app/lib/prisma"


export async function GET() {
  const locations = await prisma.location.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(locations);
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Nama lokasi diperlukan dan harus berupa string.' },
        { status: 400 }
      );
    }

    const loc = await prisma.location.create({ data: { name } });
    return NextResponse.json(loc, { status: 201 });
  } catch (error) {
    console.error('Error creating location:', error);
    return NextResponse.json(
      { error: 'Gagal membuat lokasi.' },
      { status: 500 }
    );
  }
}