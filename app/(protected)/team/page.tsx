import { Metadata } from 'next'
import DashboardMetrics from '@/components/app/team/dashboard/dashboard-metrics'

export const metadata: Metadata = {
  title: 'Team Dashboard',
  description: 'Manage assigned complaints and track progress',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardMetrics />
    </div>
  )
}

