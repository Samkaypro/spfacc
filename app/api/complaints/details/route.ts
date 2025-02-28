
import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';
import { undefined } from 'zod';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const currentUser  = await getCurrentUser ();

        if (!currentUser ) {
            return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
        }

        const { complaintDetails } = await req.json();

        const newComplaint = await prisma.complaint.create({
            data: {
                userId: currentUser .id,
                //victimType: complaintDetails.victimType,
                type: complaintDetails.complaintType,
                description: complaintDetails.description,
                dateOfIncident: complaintDetails.incidentDate,
                timeOfIncident: complaintDetails.incidentTime || null,
                location: `${complaintDetails.location.address}, ${complaintDetails.location.city}, ${complaintDetails.location.state}`,
                suspectedEntities: complaintDetails.suspectedIndividuals || null,
                witnesses: complaintDetails.witnessInfo || null,
                status: 'INCOMPLETEFORM'
            }
        });

        return NextResponse.json(newComplaint, { status: 201 });
    } catch (error) {
        console.error("Error creating complaint:", error);
        return NextResponse.json({ error: "Failed to create complaint" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const currentUser  = await getCurrentUser ();

        if (!currentUser ) {
            return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const complaintId = searchParams.get("id");

        if (!complaintId) {
            return NextResponse.json({ error: "Complaint ID is required" }, { status: 400 });
        }

        const complaint = await prisma.complaint.findUnique({
            where: {
                id: Number(complaintId),
                userId: currentUser .id
            }
        });

        if (!complaint) {
            return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
        }

        return NextResponse.json(complaint);
    } catch (error) {
        console.error("Error fetching complaint:", error);
        return NextResponse.json({ error: "Failed to fetch complaint" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const currentUser  = await getCurrentUser ();

        if (!currentUser ) {
            return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
        }

        const { complaintId, complaintDetails } = await req.json();

        const existingComplaint = await prisma.complaint.findUnique({
            where: {
                id: complaintId,
                userId: currentUser .id
            }
        });

        if (!existingComplaint) {
            return NextResponse.json({ error: "Complaint not found or unauthorized" }, { status: 404 });
        }

        // Prevent updates if status is already PENDING
        if (existingComplaint.status === 'PENDING') {
            return NextResponse.json({ error: "Complaint cannot be modified after submission" }, { status: 400 });
        }

        const updatedComplaint = await prisma.complaint.update({
            where: { id: complaintId },
            data: {
                type: complaintDetails.complaintType,
                victimType: complaintDetails.victimType,
                description: complaintDetails.description,
                dateOfIncident: complaintDetails.incidentDate,
                timeOfIncident: complaintDetails.incidentTime || null,
                location: `${complaintDetails.location.address}, ${complaintDetails.location.city}, ${complaintDetails.location.state}`,
                suspectedEntities: complaintDetails.suspectedIndividuals || null,
                witnesses: complaintDetails.witnessInfo || null,
                status: complaintDetails.status || existingComplaint.status
            }
        });

        return NextResponse.json(updatedComplaint);
    } catch (error) {
        console.error("Error updating complaint:", error);
        return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 });
    }
}