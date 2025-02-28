import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, complaintStatus } from '@prisma/client';
import { getCurrentUser } from '@/lib/session';

const prisma = new PrismaClient();

interface MetricResult {
  title: string;
  value: string;
  description: string;
}

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser?.role === 'TEAM') {
      return NextResponse.json({ error: "Not a team account" }, { status: 403 });
    }
    
    if (!currentUser) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const teamType = currentUser.typeType;

    // Get all complaints for the specific team type
    const allComplaints = await prisma.complaint.findMany({
      where: {
        assignedTo: teamType,
      },
    });

    // Calculate various complaint counts
    const totalComplaints = allComplaints.length;
    
    const resolvedComplaints = allComplaints.filter(
      complaint => complaint.status === complaintStatus.RESOLVED
    ).length;

    const activeComplaints = allComplaints.filter(
      complaint => complaint.status === complaintStatus.ACTIVE
    ).length;

    const inprogressComplaints = allComplaints.filter(
      complaint => complaint.status === complaintStatus.INPROGRESS
    ).length;

    // Calculate average resolution time
    const resolvedComplaintsList = allComplaints.filter(
      complaint => complaint.status === complaintStatus.RESOLVED
    );
    const averageResolutionTime = calculateAverageResolutionTime(resolvedComplaintsList);

    const metrics: MetricResult[] = [
      {
        title: "Total Complaints Assigned",
        value: totalComplaints.toString(),
        description: "Total number of complaints assigned to the team"
      },
      {
        title: "Complaints Resolved",
        value: resolvedComplaints.toString(),
        description: "Number of complaints that have been resolved"
      },
      {
        title: "Active Complaints",
        value: activeComplaints.toString(),
        description: "Number of assigned complaints that are yet to be started"
      },
      {
        title: "Inprogress Complaints",
        value: inprogressComplaints.toString(),
        description: "Number of complaints currently in progress"
      },
      {
        title: "Average Resolution Time",
        value: `${averageResolutionTime} days`,
        description: "Average time taken to resolve a complaint"
      },
    ];

    return NextResponse.json({ 
      teamType,
      metrics,
      complaints: allComplaints 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

function calculateAverageResolutionTime(resolvedComplaints: any[]): number {
  if (resolvedComplaints.length === 0) return 0;

  const totalDays = resolvedComplaints.reduce((acc, complaint) => {
    const createdDate = new Date(complaint.createdAt);
    const updatedDate = new Date(complaint.updatedAt);
    const diffTime = Math.abs(updatedDate.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return acc + diffDays;
  }, 0);

  return Number((totalDays / resolvedComplaints.length).toFixed(1));
}