import { fallbackBulletins, fallbackNotices, fallbackSermons, fallbackSettings } from "./fallback";
import { getPublicClient } from "./supabase";

export async function getSettings() {
  const supabase = getPublicClient();
  if (!supabase) return fallbackSettings;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return error || !data ? fallbackSettings : { ...fallbackSettings, ...data };
}

export async function getSermons(limit = 20) {
  const supabase = getPublicClient();
  if (!supabase) return fallbackSermons.slice(0, limit);
  const { data, error } = await supabase.from("sermons").select("*").order("service_date", { ascending: false }).limit(limit);
  return error || !data?.length ? fallbackSermons.slice(0, limit) : data;
}

export async function getNotices(limit = 20) {
  const supabase = getPublicClient();
  if (!supabase) return fallbackNotices.slice(0, limit);
  const { data, error } = await supabase.from("notices").select("*").order("published_at", { ascending: false }).limit(limit);
  return error || !data?.length ? fallbackNotices.slice(0, limit) : data;
}

export async function getBulletins(limit = 20) {
  const supabase = getPublicClient();
  if (!supabase) return fallbackBulletins.slice(0, limit);
  const { data, error } = await supabase.from("bulletins").select("*").order("service_date", { ascending: false }).limit(limit);
  return error || !data?.length ? fallbackBulletins.slice(0, limit) : data;
}
