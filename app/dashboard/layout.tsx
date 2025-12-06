import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { DashboardSidebar } from "./components/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Check publisher status
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single();

    const isPublisher = !!publisher;

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <DashboardSidebar isPublisher={isPublisher} />

            {/* Main Content Area - Offset for Sidebar and Navbar */}
            <main className="pl-64 pt-24 min-h-screen transition-all duration-300">
                <div className="container max-w-6xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
