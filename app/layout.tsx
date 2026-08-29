import "./globals.css";
import type { Metadata } from "next";
import { getSettings } from "../lib/content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "서재교회",
  description: "하나님의 사랑과 은혜로 생명을 살리는 서재교회"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return <html lang="ko"><body><Header churchName={settings.church_name}/><main>{children}</main><Footer settings={settings}/></body></html>;
}
