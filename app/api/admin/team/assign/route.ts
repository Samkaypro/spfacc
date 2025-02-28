import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser  } from '@/lib/session';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {

 const currentUser  = await getCurrentUser ();
    if (!currentUser ) {
        return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    if (currentUser?.role !== 'ADMIN') {
        return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
    }
    
    const { complaintId, teamId } = await req.json();
    await prisma.complaint.update({
      where: { id: complaintId },
      data: { assignedTo: teamId },
    });
    return NextResponse.json({ message: 'Team assigned successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error assigning team:', error);
    return NextResponse.json({ error: 'Failed to assign team' }, { status: 500 });
  }
}