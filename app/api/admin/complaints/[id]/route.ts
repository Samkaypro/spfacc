import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser  } from '@/lib/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const currentUser  = await getCurrentUser ();
    if (!currentUser ) {
        return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
    }

    if (currentUser ?.role !== 'ADMIN') {
        return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
    }

    // Fetch the complaint by ID with specific fields from the evidence
    const complaint = await prisma.complaint.findUnique({
      where: { id: Number(id) }, 
      include: {
        evidence: {
          select: {
            type: true,       // Fetch the type of evidence
            fileUrl: true,    // Fetch the file URL
            description: true, // Fetch the description
          },
        },
      },
    });

    // Check if the complaint exists
    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Return the complaint along with its selected evidence items
    return NextResponse.json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return NextResponse.json({ error: 'Failed to fetch complaint' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}