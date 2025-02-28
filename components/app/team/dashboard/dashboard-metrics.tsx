'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"

// Define the structure of the metrics data
interface Metric {
  title: string;
  value: string;
  description: string;
}

// Define the structure of the complaint categories data
interface ComplaintCategory {
  name: string;
  value: number;
}

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [complaintCategories, setComplaintCategories] = useState<ComplaintCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch metrics and complaint categories data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/team/dashboard'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMetrics(data.metrics);
        setComplaintCategories(data.complaintCategories);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Dashboard</h1>
          <p className="text-muted-foreground">Manage assigned complaints and track progress</p>
        </div>
      </header>
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="size-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Complaint Categories</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={complaintCategories}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}