
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        if (currentUser?.role !== 'TEAM') {
            return NextResponse.json({ error: "Not a team account" }, { status: 403 });
        }

        const teamType = currentUser.teamType;
        if (!teamType) {
            return NextResponse.json({ error: "Team type is missing" }, { status: 400 });
        }

        const complaints = await prisma.complaint.findMany({
            where: {
                assignedTo: teamType,
            },
        });

        console.log("Fetched complaints:", complaints);

        return NextResponse.json(complaints);
    } catch (error) {
        console.error("Error fetching complaints:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
