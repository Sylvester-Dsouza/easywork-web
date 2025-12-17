import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Transform Supabase user to the format expected by components
  const userInfo = {
    name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
    email: user.email!,
    image: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar user={userInfo} />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header user={userInfo} />
        <main className="flex-1 p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
