// pages/api/complaints/fetchComplaints.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    try {
        // Get the current user (you may need to adjust this based on your auth implementation)
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
        }

        // Validate the userId from the request (if you want to allow fetching by userId)
        const userId = currentUser.id;

        // Fetch complaints for the current user
        const complaints = await prisma.complaint.findMany({
            where: {
                userId: userId,
            },
        });

        return NextResponse.json(complaints);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}