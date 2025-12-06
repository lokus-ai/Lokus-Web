import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UserView } from "./user-view";
import { PublisherView } from "./publisher-view";
import { MarketplaceWidget } from "./marketplace-widget";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is a publisher
  const { data: publisher } = await supabase
    .from('publishers')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (publisher) {
    // Fetch plugins for the publisher
    const { data: plugins } = await supabase
      .from('plugins')
      .select('*')
      .eq('publisher_id', publisher.id)
      .order('updated_at', { ascending: false });

    return <PublisherView publisher={publisher} plugins={plugins || []} />;
  }

  // Standard User Dashboard
  return (
    <UserView
      marketplaceWidget={<MarketplaceWidget />}
    />
  );
}
