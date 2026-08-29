import type { Metadata } from "next";
import { getSettings } from "../../lib/content";

export const metadata: Metadata = {
  title: "교회소개",
  description: "대구 달성군 다사읍 서재교회의 표어, 교단, 설립일과 섬기는 이를 소개합니다.",
  alternates: { canonical: "/church" },
  openGraph: { title: "교회소개 | 서재교회", description: "대구 달성군 다사읍 서재교회의 표어, 교단, 설립일과 섬기는 이를 소개합니다.", url: "https://seojae-church.vercel.app/church" }
};

export default async function Church() {
  const s = await getSettings();
  return <>
    <div className="page-head"><div className="wrap"><div className="mini-label">ABOUT</div><h1>교회소개</h1></div></div>
    <div className="wrap">
      <div className="card church-vision">
        <div className="mini-label">서재교회 표어</div>
        <h2>{s.slogan}</h2>
        <p className="lead-quote">예수님을 닮아 사랑으로 섬기는 교회</p>
      </div>
      <div className="spacer"/>
      <div className="grid two">
        <div className="card">
          <h2>{s.church_name}</h2>
          <p><strong>교단</strong> {s.denomination}</p>
          <p><strong>설립</strong> {s.founded_date}</p>
          <p>하나님의 사랑과 은혜로 생명을 살리며 말씀과 기도로 지역과 이웃을 섬기는 교회입니다.</p>
        </div>
        <div className="card">
          <h2>섬기는 이</h2>
          <p>{s.pastor_name}</p>
          {s.associate_pastor && <p>{s.associate_pastor}</p>}
          {s.elder_name && <p>{s.elder_name}</p>}
        </div>
      </div>
    </div>
  </>;
}
