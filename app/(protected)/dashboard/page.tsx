import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import WelcomeBanner from './dash-components/welcome-banner'
import QuickActions from './dash-components/quick-actions'
import ActivitySummary from './dash-components/activity-summary'
import NotificationsSection from './dash-components/notifications-section'

export const metadata = constructMetadata({
  title: "Dashboard – SPFACC",
  description: "Create and manage complaints.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();
   if (!user || user.role !== "USER") redirect("/login");
  return (
    <main className="container mx-auto px-4 py-8">
    <WelcomeBanner />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <QuickActions />
      <ActivitySummary />
      <NotificationsSection />
    </div>
  </main>
  );
}
