
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser  } from '@/lib/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const currentUser  = await getCurrentUser ();
    if (!currentUser ) {
        return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    if (currentUser ?.role !== 'ADMIN') {
        return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        nationalId: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        gender: true,
        image: true,
        teamType: true,
        createdAt: true,
        role: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}