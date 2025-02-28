'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from 'lucide-react';
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

// Enum for complaint status
enum ComplaintStatus {
  INCOMPLETEFORM = "Incomplete Form",
  PENDING = "Pending",
  ACTIVE = "Active",
  INPROGRESS = "In Progress",
  RESOLVED = "Resolved",
}

// In your Badge component type definition
type BadgeProps = {
  variant: "default" | "secondary" | "destructive" | "outline" | "warning" | null | undefined;
  // other props...
};

interface Complaint {
  id: string; // or number, depending on your database schema
  type: string;
  createdAt: string; // or Date, depending on how you handle dates
  status: ComplaintStatus; // Use the enum you defined
}
export default function ComplaintList() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'All'>('All');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('/api/dashboard/complaints/fetch-submitted-complaints');
        if (!response.ok) {
          throw new Error('Failed to fetch complaints');
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((complaint) => 
    complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || complaint.status === statusFilter)
  );

  if (filteredComplaints.length === 0) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No Complaints Submitted</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You have not submitted any complaints yet. Please submit a complaint to get started.
        </EmptyPlaceholder.Description>
        <Button asChild>
          <Link href="/dashboard/complaints/new">Submit a Complaint</Link>
        </Button>
      </EmptyPlaceholder>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status: {statusFilter} <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setStatusFilter('All')}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter(ComplaintStatus.PENDING)}>Pending</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter(ComplaintStatus.ACTIVE)}>Active</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter(ComplaintStatus.INPROGRESS)}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter(ComplaintStatus.RESOLVED)}>Resolved</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>{new Date(complaint.createdAt). toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={
                    complaint.status === ComplaintStatus.RESOLVED ? 'default' :
                    complaint.status === ComplaintStatus.ACTIVE ? 'destructive' :
                    complaint.status === ComplaintStatus.INPROGRESS ? 'secondary' : 'secondary'
                  }>
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <Link href={`/dashboard/complaints/${complaint.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}