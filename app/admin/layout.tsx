import type { Metadata } from "next";
import AdminGuard from "../../components/AdminGuard";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
