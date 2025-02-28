import { Metadata } from 'next'
import ComplaintManagement from '@/components/app/team/complaints/view/complaint-management'

export const metadata: Metadata = {
  title: 'Team Dashboard',
  description: 'Manage assigned complaints',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ComplaintManagement />
    </div>
  )
}

