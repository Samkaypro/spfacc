import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const complaintData = {
  total: 15,
  pending: 3,
  active: 5,
  inProgress: 4,
  resolved: 3
}

export default function ActivitySummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Total Complaints</p>
            <p className="text-2xl font-bold">{complaintData.total}</p>
          </div>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Pending</span>
                <span>{complaintData.pending}</span>
              </div>
              <Progress value={(complaintData.pending / complaintData.total) * 100} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Active</span>
                <span>{complaintData.active}</span>
              </div>
              <Progress value={(complaintData.active / complaintData.total) * 100} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>In Progress</span>
                <span>{complaintData.inProgress}</span>
              </div>
              <Progress value={(complaintData.inProgress / complaintData.total) * 100} className="h-2" />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Resolved</span>
                <span>{complaintData.resolved}</span>
              </div>
              <Progress value={(complaintData.resolved / complaintData.total) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

