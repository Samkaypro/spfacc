export const runtime = 'edge'; // Add this at the top

import { Metadata } from 'next'
import { ComplaintsTable } from '@/components/app/admin/complaints/complaints'

export const metadata: Metadata = {
  title: 'Complaints Management',
  description: 'Manage and assign complaints in the system',
}

export default function ComplaintsManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Complaints Management</h1>
      <ComplaintsTable />
    </div>
  )
}

