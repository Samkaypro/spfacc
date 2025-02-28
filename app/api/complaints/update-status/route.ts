// app/api/complaints/update-status/route.ts

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
    const { complaintId } = await req.json(); // Extract complaintId from the request body

    if (!complaintId) {
      return NextResponse.json({ error: 'Complaint ID is required' }, { status: 400 });
    }

    // Update the complaint status to PENDING
    const updatedComplaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: { status: 'PENDING' },
    });

    return NextResponse.json({ message: 'Complaint status updated successfully', updatedComplaint });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    return NextResponse.json({ error: 'Failed to update complaint status' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}