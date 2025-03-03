import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import AdminDashboard from "@/components/app/admin/dashboard/dashboard";
export const metadata = constructMetadata({
  title: "Admin SPFACC",
  description: "Admin page for only admin management.",
});

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text="SPFACC Admin Panel"
      />
      <AdminDashboard />
      {/* <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </div>
        <TransactionsList />
        <TransactionsList />
      </div> */}
      {/* <Footer /> */}
    </>
  );
}
