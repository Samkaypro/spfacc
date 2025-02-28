import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const currentUser  = await getCurrentUser ();
        if (!currentUser ) {
            return NextResponse.json({ error: "User  not authenticated" }, { status: 401 });
        }
    
        if (currentUser?.role !== 'ADMIN') {
            return NextResponse.json({ error: "Not an Admin account" }, { status: 403 });
        }

        const complaints = await prisma.complaint.findMany({
            where: {
                status: {
                    not: 'INCOMPLETEFORM',
                },
            },
            include: {
                user: {
                    select: {
                        teamType: true,
                        name: true,
                    },
                },
            },
        });

        const formattedComplaints = complaints.map((complaint) => {
            if (complaint.assignedTo) {
                const assignedUser = prisma.user.findUnique({
                    where: {
                        id: complaint.assignedTo,
                    },
                    select: {
                        teamType: true,
                    },
                });
                return {
                    ...complaint,
                    assignedTeam: assignedUser.teamType,
                };
            } else {
                return {
                    ...complaint,
                    assignedTeam: 'Unassigned',
                };
            }
        });

        console.log("Fetched complaints:", formattedComplaints);

        return NextResponse.json(formattedComplaints);
    } catch (error) {
        console.error("Error fetching complaints:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}