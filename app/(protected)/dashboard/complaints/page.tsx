export const runtime = 'edge'; // Add this at the top

import { Metadata } from 'next'
import ComplaintList from './components/complaint-list'

export const metadata: Metadata = {
  title: 'View Submitted Complaints',
  description: 'List of all submitted complaints in the system',
}

export default function ComplaintsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Submitted Complaints</h1>
      <ComplaintList />
    </div>
  )
}

