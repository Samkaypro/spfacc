import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, History, Settings, MessagesSquare } from 'lucide-react';

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button aschild className="w-full">
          <Link href="/dashboard/complaints/new" className="flex items-center">
            <PlusCircle className="mr-2 size-4" />
            Submit a New Complaint
          </Link>
        </Button>
        <Button aschild variant="outline" className="w-full">
          <Link href="/dashboard/complaints" className="flex items-center">
            <History className="mr-2 size-4" />
            View Complaint History
          </Link>
        </Button>
        <Button aschild variant="outline" className="w-full">
          <Link href="/dashboard/settings" className="flex items-center">
            <Settings className="mr-2 size-4" />
            Go to Settings      
          </Link>
        </Button>
        <Button aschild variant="outline" className="w-full">
          <Link href="/dashboard/support" className="flex items-center">
            <MessagesSquare className="mr-2 size-4" />
           Contact Support
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
