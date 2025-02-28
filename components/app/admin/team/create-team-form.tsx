'use client'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus } from 'lucide-react'
import { toast } from 'sonner'

type User = {
  id: string
  name: string
  email: string
}



export function CreateTeamForm() {
  const [email, setEmail] = useState('')
  const [teamName, setTeamName] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEmailSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/search-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.user) {
        setSelectedUser(data.user)
      } else {
        setSelectedUser(null)
      }
    } catch (error) {
      console.error('Error searching user:', error)
      toast.error('Error searching user')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeam = async () => {
    setLoading(true)
    try {
      if (!selectedUser) return
      const response = await fetch('/api/admin/create-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, teamName }),
      })
      const data = await response.json()
      console.log('Team created:', data)
      toast.success('Team created successfully')
      // Here you would typically refresh the page or redirect to a new page
    } catch (error) {
      console.error('Error creating team:', error)
      toast.error('Error creating team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Team</CardTitle>
        <CardDescription>Set up a new team to handle complaints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-search">Search User by Email</Label>
          <div className="flex space-x-2">
            <Input 
              id="email-search" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email to search"
              className="grow"
            />
            <Button onClick={handleEmailSearch} size="icon" disabled={loading}>
              <Search className="size-4" />
            </Button>
          </div>
          {selectedUser && (
            <div className="mt-2">
              <p>Selected User: {selectedUser.name} ({selectedUser.email})</p>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-name">Team Name</Label>
          <Input 
            id="team-name" 
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
            placeholder="Enter team name"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateTeam} 
          className="w-full"
          disabled={!selectedUser || !teamName || loading}
        >
          {loading ? 'Creating...' : 'Create Team'}
        </Button>
      </CardFooter>
    </Card>
  )
}