'use client'
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Complaint = {
  id: number
  type: string
  dateOfIncident: string
  status: string
  assignedTo?: string
  evidence: {
    type: string
    fileUrl: string
    description: string
  }[]
  user: {
    teamType: string
    name: string
  }
}

type Team = {
  id: number
  name: string
  teamType: string
}

export function ComplaintsTable() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [team, setTeam] = useState<Team[]>([])
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([])
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('/api/admin/complaints')
        const data = await response.json()
        setComplaints(data)
        setFilteredComplaints(data)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      }
    }
    fetchComplaints()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterComplaints(term, typeFilter, statusFilter)
  }

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type)
    filterComplaints(searchTerm, type, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterComplaints(searchTerm, typeFilter, status)
  }

  const filterComplaints = (search: string, type: string, status: string) => {
    const filtered = complaints.filter(complaint => 
      (search === '' || complaint.id.toString().includes(search) || complaint.type.toLowerCase().includes(search.toLowerCase())) &&
      (type === 'all' || complaint.type === type) &&
      (status === 'all' || complaint.status === status)
    )
    setFilteredComplaints(filtered)
  }

  return (
    <div>
      <div className="flex items-center justify-between space-x-2 pb-4">
        <Input
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          <Select onValueChange={handleTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Financial Crime">Financial Crime</SelectItem>
              <SelectItem value="Cybercrime">Cybercrime</SelectItem>
              <SelectItem value="Corruption">Corruption</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="INCOMPLETEFORM">Incomplete Form</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INPROGRESS">In Progress</SelectItem>
              <SelectItem value="RESOLVED">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
  
          </TableHeader>
          <TableBody>
            {filteredComplaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>#SPFACC{complaint.id}</TableCell>
                <TableCell>{complaint.type}</TableCell>
                <TableCell>{complaint.user.name}</TableCell>
                <TableCell>
                  <Badge variant={
                    complaint.status === 'RESOLVED' ? 'default' :
                    complaint.status === 'ACTIVE' ? 'secondary' :
                    complaint.status === 'INPROGRESS' ? 'warning' :
                    complaint.status === 'PENDING' ? 'outline' :
                    'destructive'
                  }>
                    {complaint.status}
                  </Badge>
                </TableCell>
                <TableCell>{complaint.user.teamType || 'Unassigned'}</TableCell>
                <TableCell>
                  <AssignTeamDialog complaint={complaint} />
                </TableCell>
                <TableCell>
                  View Details 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function AssignTeamDialog({ complaint }: { complaint: Complaint }) {
  const [selectedTeam, setSelectedTeam] = useState('')
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/admin/team')
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error('Error fetching teams:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeams()
  }, [])

  const handleAssign = async () => {
    if (!selectedTeam) return
    try {
      const response = await fetch('/api/admin/team/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaintId: complaint.id, teamId: selectedTeam }),
      })
      const data = await response.json()
      console.log(data)
      // After successful assignment, you might want to refresh the complaints list
    } catch (error) {
      console.error('Error assigning team:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Assign to Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Complaint to Team</DialogTitle>
          <DialogDescription>
            Select a team to assign this complaint to. The team will be notified once assigned.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team" className="text-right">
              Team
            </Label>
            <Select onValueChange={setSelectedTeam} value={selectedTeam}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem>Loading...</SelectItem>
                ) : (
                  teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.teamType}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAssign}>Assign Team</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}