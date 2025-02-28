
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser   } from '@/lib/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // Authenticate the user
        const currentUser  = await getCurrentUser  ();
        if (!currentUser ) {
            return NextResponse.json({ error: "User   not authenticated" }, { status: 401 });
        }

        // Check if the user is an admin
        if (currentUser .role !== 'ADMIN') {
            return NextResponse.json({ error: "Not authorized to access this resource" }, { status: 403 });
        }

        // Fetch total active users
        const totalActiveUsers = await prisma.user.count({
            where: { role: 'USER' }, // Assuming active users have the role 'USER'
        });
        const totalActiveUsersNumber = Number(totalActiveUsers);

        // Fetch total active teams
        const totalActiveTeams = await prisma.user.count({
            where: { role: 'TEAM' }, // Assuming active teams have the role 'TEAM'
        });
        const totalActiveTeamsNumber = Number(totalActiveTeams);

        // Fetch total complaints submitted
        const totalComplaintsSubmitted = await prisma.complaint.count();
        const totalComplaintsSubmittedNumber = Number(totalComplaintsSubmitted);

        // Fetch complaint status distribution
        const complaintStatusData = await prisma.complaint.groupBy({
            by: ['status'],
            _count: {
                status: true,
            },
        });

        // Format complaint status data for the PieChart
        const formattedComplaintStatusData = complaintStatusData.map((status) => ({
            name: status.status,
            value: status._count.status,
        }));

        // Fetch monthly complaint trends
        const monthlyComplaintData = await prisma.$queryRaw`
            SELECT 
                TO_CHAR("created_at", 'Mon') AS name,
                COUNT(*) AS complaints
            FROM 
                "Complaint"
            GROUP BY 
                TO_CHAR("created_at", 'Mon')
            ORDER BY 
                MIN("created_at")
        `;

        // Fetch team performance data
        const teamPerformanceData = await prisma.user.findMany({
            where: { role: 'TEAM' },
            select: {
                name: true,
                _count: {
                    select: { Complaint: true }, // Count of complaints assigned to the team
                },
                Complaint: {
                    select: {
                        status: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        // Format team performance data
        const formattedTeamPerformanceData = teamPerformanceData.map((team) => {
            const resolvedComplaints = team.Complaint.filter(
                (complaint) => complaint.status === 'RESOLVED'
            );
            const avgResolutionTime =
                resolvedComplaints.length > 0
                    ? resolvedComplaints.reduce((sum, complaint) => {
                          const resolutionTime =
                              new Date(complaint.updatedAt).getTime() -
                              new Date(complaint.createdAt).getTime();
                          return sum + resolutionTime;
                      }, 0) / resolvedComplaints.length
                    : 0;

            return {
                name: team.name,
                assignedComplaints: team._count.Complaint,
                avgResolutionTime: Math.floor(avgResolutionTime / (1000 * 60 * 60 * 24)), // Convert to days
            };
        });

        // Return the dashboard data
        const dashboardData = {
            totalMetrics: [
                { title: "Total Active Users", value: totalActiveUsersNumber.toString() },
                { title: "Total Active Teams", value: totalActiveTeamsNumber.toString() },
                { title: "Total Complaints Submitted", value: totalComplaintsSubmittedNumber.toString() },
            ],
            complaintStatusData: formattedComplaintStatusData,
            monthlyComplaintData,
            teamPerformanceData: formattedTeamPerformanceData,
        };

        return NextResponse.json(dashboardData, { status: 200 });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}