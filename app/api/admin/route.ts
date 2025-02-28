
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Complaint ID from the URL
    const { assignedTo } = await req.json(); // Parse the new `assignedTo` value from the request body

    if (!id || !assignedTo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update the complaint in the database
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: {
        assignedTo,
        dateAssigned: new Date().toISOString(), // Automatically set current date and time
      },
    });

    return NextResponse.json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint:", error);
    return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 });
  }
}
