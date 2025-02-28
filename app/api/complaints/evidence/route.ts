
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for evidence upload
const EvidenceSchema = z.object({
  complaintId: z.number(),
  evidenceItems: z.array(z.object({
    type: z.enum(['image', 'video', 'audio', 'document']),
    fileUrl: z.string().url(),
    description: z.string().optional()
  }))
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body Q
    
    const body = await req.json();
    const parsedData = EvidenceSchema.parse(body);

    // Verify the complaint belongs to the user
    const complaint = await prisma.complaint.findUnique({
      where: { 
        id: parsedData.complaintId,
        userId: user.id 
      }
    });

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found or unauthorized' }, { status: 403 });
    }

    // Create evidence records
    const evidenceRecords = await prisma.evidence.createMany({
      data: parsedData.evidenceItems.map(item => ({
        type: item.type,
        fileUrl: item.fileUrl,
        description: item.description || '',
        complaintId: parsedData.complaintId
      }))
    });

    return NextResponse.json({ 
      message: 'Evidence uploaded successfully', 
      count: evidenceRecords.count 
    }, { status: 201 });

  } catch (error) {
    console.error('Evidence upload error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid data format', 
        details: error.errors 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Failed to upload evidence' 
    }, { status: 500 });
  }
}