import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function DashboardMetrics() {
    const [totalMetrics, setTotalMetrics] = useState([]);
    const [complaintStatusData, setComplaintStatusData] = useState([]);
    const [monthlyComplaintData, setMonthlyComplaintData] = useState([]);
    const [teamPerformanceData, setTeamPerformanceData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch('/api/admin/metrics');
                if (!response.ok) {
                    throw new Error('Failed to fetch metrics');
                }
                const data = await response.json();
                setTotalMetrics(data.totalMetrics);
                setComplaintStatusData(data.complaintStatusData);
                setMonthlyComplaintData(data.monthlyComplaintData);
                setTeamPerformanceData(data.teamPerformanceData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchMetrics();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Complaint Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={complaintStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {complaintStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Complaint Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyComplaintData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="complaints" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {teamPerformanceData.map((team) => (
                            <div key={team.name} className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{team.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Assigned Complaints: {team.assignedComplaints}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Avg. Resolution Time: {team.avgResolutionTime} days
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}