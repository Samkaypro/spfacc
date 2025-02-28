'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, BarChart2, AlertCircle, Table } from 'lucide-react'
import { toast } from 'sonner'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

type Team = {
  id: string
  teamType: string
  complaints: {
    id: number
    type: string
    dateOfIncident: string
    status: string
    assignedTo: string
  }[]
}

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTeams = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/team')
      const data = await response.json()
      setTeams(data.map((team: any) => team.team))
    } catch (error) {
      console.error('Error fetching teams:', error)
      toast.error('Error fetching teams')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Good': return 'bg-green-100 text-green-800'
      case 'Average': return 'bg-yellow-100 text-yellow-800'
      case 'Poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Active Teams</h2>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id} className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {team.teamType}
                  <Badge className={getPerformanceColor('Good')}>Good</Badge>
                </CardTitle>
                <CardDescription>Team ID: {team.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 size-5 text-blue-500" />
                    {/* <span>{team.members} members</span> */}
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="mr-2 size-5 text-orange-500" />
                    {/* <span>{team.complaintsAssigned} assigned</span> */}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{team.teamType} Details</DialogTitle>
                      <DialogDescription>
                        Detailed information about the team and its performance.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Team Members</span>
                        <Badge variant="outline">0 members</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Complaints Assigned</span>
                        <Badge variant="outline">{team.complaints?.length || 0} complaints</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Performance</span>
                        <Badge variant="secondary" className={getPerformanceColor('Good')}>
                          Good
                        </Badge>
                      </div>
                      <div className="pt-4">
                        <h3 className="text-lg font-bold">Complaints</h3>
                        {/* <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Complaint ID</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date of Incident</TableHead>
                              <TableHead >Status</TableHead>
                              <TableHead>Assigned To</TableHead>
                        
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {team.complaints.map((complaint) => (
                              <TableRow key={complaint.id}>
                                <TableCell>{complaint.id}</TableCell>
                                <TableCell>{complaint.type}</TableCell>
                                <TableCell>{new Date(complaint.dateOfIncident).toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    complaint.status === 'INCOMPLETEFORM' ? 'outline' :
                                    complaint.status === 'PENDING' ? 'warning' :
                                    'default'
                                  }>
                                    {complaint.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{complaint.assignedTo}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table> */}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost">Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}