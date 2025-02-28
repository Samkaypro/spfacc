export const runtime = 'edge'; // Add this at the top

import { Metadata } from 'next'
import { UserList } from '@/components/app/admin/users/users-list'

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage users in the complaint management system',
}

export default function UserManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <UserList />
    </div>
  )
}

