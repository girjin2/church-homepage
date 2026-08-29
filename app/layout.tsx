import "./globals.css";
import type { Metadata } from "next";
import { getSettings } from "../lib/content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = { title: "교회 홈페이지", description: "교회 소개와 예배 안내" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return <html lang="ko"><body><Header churchName={settings.church_name}/><main>{children}</main><Footer settings={settings}/></body></html>;
}
