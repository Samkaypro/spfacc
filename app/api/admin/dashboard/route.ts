
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

        // Fetch total complaints
        const totalComplaints = await prisma.complaint.count();

        // Fetch total users
        const totalUsers = await prisma.user.count();

        // Fetch total teams (users with role TEAM)
        const totalTeams = await prisma.user.count({
            where: { role: 'TEAM' },
        });

        // Fetch resolved complaints
        const resolvedComplaints = await prisma.complaint.count({
            where: { status: 'RESOLVED' },
        });

        // Fetch assigned complaints (status INPROGRESS)
        const assignedComplaints = await prisma.complaint.count({
            where: { status: 'INPROGRESS' },
        });

        // Fetch pending complaints (status PENDING)
        const pendingComplaints = await prisma.complaint.count({
            where: { status: 'PENDING' },
        });

        const dashboardData: DashboardData = {
            totalComplaints,
            totalUsers,
            totalTeams,
            resolvedComplaints,
            assignedComplaints,
            pendingComplaints,
        };

        return NextResponse.json(dashboardData, { status: 200 });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}