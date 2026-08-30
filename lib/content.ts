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
  // Supabase 연결 후에는 빈 목록도 실제 상태로 취급합니다.
  return error ? fallbackSermons.slice(0, limit) : (data || []);
}

export async function getNotices(limit = 20, includeOld = false) {
  const supabase = getPublicClient();
  if (!supabase) return fallbackNotices.slice(0, limit);
  const { data, error } = await supabase.from("notices").select("*").order("published_at", { ascending: false }).limit(limit);
  if (error) return fallbackNotices.slice(0, limit);
  const rows = data || [];
  // 등록된 소식은 삭제하기 전까지 보관합니다. 홈에서는 최신 5개만 표시합니다.
  return rows.slice(0, limit);
}

export async function getBulletins(limit = 20) {
  const supabase = getPublicClient();
  if (!supabase) return fallbackBulletins.slice(0, limit);
  const { data, error } = await supabase.from("bulletins").select("*").order("service_date", { ascending: false }).limit(limit);
  // 삭제 후 샘플 주보가 다시 나타나지 않도록 빈 배열을 그대로 반환합니다.
  return error ? fallbackBulletins.slice(0, limit) : (data || []);
}
