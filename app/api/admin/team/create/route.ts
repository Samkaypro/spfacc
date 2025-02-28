
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser  } from '@/lib/session';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const currentUser   = await getCurrentUser  ();
    if (!currentUser  ) {
      return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    if (currentUser  ?.role !== 'ADMIN') {
      return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
    }

    const { userId, teamName } = await req.json();

    // Update the user's role to TEAM and set the teamType
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: 'TEAM',
        teamType: teamName,
      },
    });

    return NextResponse.json({ message: 'Team created successfully' });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}