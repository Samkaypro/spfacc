export const runtime = 'edge'; // Add this at the top

import { Metadata } from 'next'
import { TeamList } from '@/components/app/admin/team/team-list'
import { CreateTeamForm } from '@/components/app/admin/team/create-team-form'

export const metadata: Metadata = {
  title: 'Team Management',
  description: 'Manage teams in the complaint management system',
}

export default function TeamManagementPage() {
  return (
    <div className="container mx-auto space-y-10 py-10">
      <h1 className="text-3xl font-bold">Team Management</h1>
      <CreateTeamForm />
      <TeamList />
    </div>
  )
}

