'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable } from "../../ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Search } from 'lucide-react'

type Complaint = {
  id: string
  type: string
  dateOfIncident: string
  status: "Pending" | "Under Review" | "Resolved" | "Rejected"
  assignedTo: string
}



export default function ComplaintManagement() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string | undefined>()
  const [typeFilter, setTypeFilter] = useState<string | undefined>()
  const [search, setSearch] = useState("")
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(false)


  

  const columns: ColumnDef<Complaint>[] = [
    {
      accessorKey: "id",
      header: "Complaint ID",
      cell: ({ row }) => {
        const complaintId = row.getValue("id")
        return (
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => router.push(`/team/assigned/${complaintId}`)}
          >
            {complaintId}
          </span>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "dateOfIncident",
      header: "Date of Incident",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={
            status === "Resolved" ? "default" :
            status === "Pending" ? "secondary" :
            status === "Under Review" ? "warning" :
            "destructive"
          }>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
  ]
  
  
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/team/complaints') 
        const data: Complaint[] = await res.json()
        setComplaints(data)
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch complaints", variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  const filteredData = complaints.filter(complaint =>
    (!statusFilter || complaint.status === statusFilter) &&
    (!typeFilter || complaint.type === typeFilter) &&
    (search === "" ||
     complaint.id.toLowerCase().includes(search.toLowerCase()) ||
     complaint.type.toLowerCase().includes(search.toLowerCase()) ||
     complaint.assignedTo.toLowerCase().includes(search.toLowerCase()))
  )

  const resetFilters = () => {
    setStatusFilter(undefined)
    setTypeFilter(undefined)
    setSearch("")
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Assigned Complaints</h2>
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <Select onValueChange={setStatusFilter} value={statusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setTypeFilter} value={typeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Financial Crime">Financial Crime</SelectItem>
            <SelectItem value="Cybercrime">Cybercrime</SelectItem>
            <SelectItem value="Normal Crime">Normal Crime</SelectItem>
            <SelectItem value="Corruption">Corruption</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative grow">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search complaints"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={filteredData} />
      )}
    </div>
  )
}
