-- Function to safely increment downloads
create or replace function increment_downloads(plugin_id text)
returns void as $$
begin
  update public.plugins
  set downloads = downloads + 1
  where id = plugin_id;
end;
$$ language plpgsql security definer;
