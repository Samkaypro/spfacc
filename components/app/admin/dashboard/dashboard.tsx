/* eslint-disable tailwindcss/classnames-order */
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Users, Package } from "lucide-react";
import { DashboardMetrics } from "@/components/app/admin/dashboard/metrics";


type DashboardData = {
    totalComplaints: number;
    totalUsers: number;
    totalTeams: number;
    resolvedComplaints: number;
    assignedComplaints: number;
    pendingComplaints: number;
};

const InfoCard = ({ title, value, loading, icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            ) : (
                <>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-muted-foreground text-xs">{title}</p>
                </>
            )}
        </CardContent>
    </Card>
);

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        totalComplaints: 0,
        totalUsers: 0,
        totalTeams: 0,
        resolvedComplaints: 0,
        assignedComplaints: 0,
        pendingComplaints: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('/api/admin/dashboard');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch dashboard data');
                }

                setDashboardData(data as DashboardData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const cardData = [
        {
            title: "Total Complaints",
            value: dashboardData.totalComplaints,
            icon: <DollarSign className="text-muted-foreground" />,
        },
        {
            title: "Total Users",
            value: dashboardData.totalUsers,
            icon: <Users className="text-muted-foreground" />,
        },
        {
            title: "Total Teams",
            value: dashboardData.totalTeams,
            icon: <Users className="text-muted-foreground" />,
        },
        {
            title: "Pending Complaints",
            value: dashboardData.pendingComplaints,
            icon: <Package className="text-muted-foreground" />,
        },
        {
            title: "Assigned Complaints",
            value: dashboardData.assignedComplaints,
            icon: <Users className="text-muted-foreground" />,
        },
        {
            title: "Resolved Complaints",
            value: dashboardData.resolvedComplaints,
            icon: <Users className="text-muted-foreground" />,
        },
    ];

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {cardData.map((card, index) => (
                        <InfoCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            loading={loading}
                            icon={card.icon}
                        />
                    ))}
                </div>
                <DashboardMetrics />

            </main>
        </div>
    );
}