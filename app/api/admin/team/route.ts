
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
    const teams = await prisma.user.findMany({
      where: { role: 'TEAM' },
      select: { id: true, teamType: true },
    });

    const complaints = await Promise.all(teams.map(async (team) => {
      const teamComplaints = await prisma.complaint.findMany({
        where: { assignedTo: team.id },
        select: {
          id: true,
          type: true,
          dateOfIncident: true,
          status: true,
          assignedTo: true,
        },
      });
      return { team, complaints: teamComplaints };
    }));

    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
}