"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrowserClient } from "../lib/supabase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(pathname === "/admin/login");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAllowed(true);
      return;
    }
    (async () => {
      const sb = getBrowserClient();
      if (!sb) {
        router.replace("/admin/login");
        return;
      }
      const { data: { session } } = await sb.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      const { data: profile } = await sb.from("member_profiles").select("role,approved").eq("id", session.user.id).maybeSingle();
      if (!profile || profile.role !== "admin" || !profile.approved) {
        router.replace("/community");
        return;
      }
      setAllowed(true);
    })();
  }, [pathname, router]);

  if (!allowed) return <div className="admin-shell">관리자 권한을 확인하고 있습니다.</div>;

  if (pathname === "/admin/login") return children;

  return <>
    <div style={{maxWidth:1180,margin:"14px auto 0",padding:"0 20px",display:"flex",gap:14,justifyContent:"flex-end"}}>
      <Link className="more-link" href="/admin">관리자 홈</Link>
      <Link className="more-link" href="/admin/members">회원 승인</Link>
    </div>
    {children}
  </>;
}
