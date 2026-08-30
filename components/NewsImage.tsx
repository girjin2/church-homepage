"use client";

import { useMemo, useState } from "react";
import { getBrowserClient } from "../lib/supabase";

export default function NewsImage({ noticeId, fallbackSrc, alt }: { noticeId: number; fallbackSrc: string; alt: string }) {
  const primarySrc = useMemo(() => {
    const sb = getBrowserClient();
    if (!sb) return fallbackSrc;
    return sb.storage.from("교회 이미지").getPublicUrl(`${noticeId}.webp`).data.publicUrl || fallbackSrc;
  }, [noticeId, fallbackSrc]);
  const [src, setSrc] = useState(primarySrc);
  return <img src={src} alt={alt} onError={() => { if (src !== fallbackSrc) setSrc(fallbackSrc); }} />;
}
