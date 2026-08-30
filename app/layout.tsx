import "./globals.css";
import type { Metadata, Viewport } from "next";
import { getSettings } from "../lib/content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PwaRegister from "../components/PwaRegister";

const SITE_URL = "https://seojae-church.vercel.app";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover"
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "서재교회",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "서재교회",
    statusBarStyle: "default"
  },
  icons: {
    icon: [
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  title: {
    default: "서재교회 | 대구 달성군 다사읍",
    template: "%s | 서재교회"
  },
  description: "대구 달성군 다사읍 서재로 104에 위치한 서재교회입니다. 주일예배, 수요예배, 금요예배, 새벽예배, 설교, 주보와 교회소식을 안내합니다.",
  keywords: [
    "서재교회",
    "대구 서재교회",
    "다사 서재교회",
    "달성군 서재교회",
    "대구 교회",
    "다사읍 교회",
    "대구 달성군 교회",
    "서재로 교회"
  ],
  authors: [{ name: "서재교회" }],
  creator: "서재교회",
  publisher: "서재교회",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "서재교회",
    title: "서재교회 | 대구 달성군 다사읍",
    description: "하나님의 사랑과 은혜로 생명을 살리는 서재교회. 예배시간, 설교, 주보, 교회소식과 오시는 길을 안내합니다."
  },
  twitter: {
    card: "summary",
    title: "서재교회 | 대구 달성군 다사읍",
    description: "대구 달성군 다사읍 서재로 104 서재교회 공식 홈페이지"
  },
  category: "religion"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const churchJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "서재교회",
    url: SITE_URL,
    description: "하나님의 사랑과 은혜로 생명을 살리는 서재교회",
    foundingDate: "1985-04-22",
    telephone: ["053-585-3608", "010-2254-3608"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "서재로 104",
      addressLocality: "다사읍",
      addressRegion: "대구광역시 달성군",
      addressCountry: "KR"
    }
  };

  return <html lang="ko">
    <body>
      <PwaRegister />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }} />
      <Header churchName={settings.church_name}/>
      <main>{children}</main>
      <Footer settings={settings}/>
    </body>
  </html>;
}
