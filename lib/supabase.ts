import { createClient } from "@supabase/supabase-js";

function mapStorageBucket(client: ReturnType<typeof createClient>) {
  const storage = client.storage;
  const originalFrom = storage.from.bind(storage);
  storage.from = ((bucketId: string) => originalFrom(bucketId === "교회 이미지" ? "church-images" : bucketId)) as typeof storage.from;
  return client;
}

export function getBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return mapStorageBucket(createClient(url, key));
}

export function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return mapStorageBucket(createClient(url, key, { auth: { persistSession: false } }));
}
