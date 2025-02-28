import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, MessageCircle } from 'lucide-react'

const notifications = [
  { id: 1, type: 'status', message: 'Your complaint #1234 has been updated to "In Progress"' },
  { id: 2, type: 'message', message: 'New message from Officer Smith regarding complaint #5678' },
  { id: 3, type: 'status', message: 'Complaint #9101 has been resolved' },
]

export default function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-start space-x-2">
              {notification.type === 'status' ? (
                <Bell className="mt-0.5 size-5 text-blue-500" />
              ) : (
                <MessageCircle className="mt-0.5 size-5 text-green-500" />
              )}
              <p className="text-sm">{notification.message}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

