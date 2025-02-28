
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const currentUser  = await getCurrentUser ();
    if (!currentUser ) {
      return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    if (currentUser ?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
    }

    const { email } = await req.json()
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
 },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error searching user:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}