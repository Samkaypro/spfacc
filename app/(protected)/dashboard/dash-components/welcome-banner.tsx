// app/components/WelcomeBanner.tsx
import { getCurrentUser } from "@/lib/session";
import { Card, CardContent } from "@/components/ui/card";

export default async function WelcomeBanner() {
  const user = await getCurrentUser(); 
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h1 className="mb-2 text-2xl font-bold">
          {`Welcome ${user?.name || "Guest"}`}
        </h1>
        <p className="text-muted-foreground">{currentDate}</p>
      </CardContent>
    </Card>
  );
}
