import type { Metadata } from "next";
import { getSettings } from "../../lib/content";

export const metadata: Metadata = {
  title: "오시는 길",
  description: "대구 달성군 다사읍 서재로 104 서재교회 오시는 길과 전화번호, 버스 노선을 안내합니다.",
  alternates: { canonical: "/location" },
  openGraph: { title: "오시는 길 | 서재교회", description: "대구 달성군 다사읍 서재로 104 서재교회 오시는 길과 전화번호, 버스 노선을 안내합니다.", url: "https://seojae-church.vercel.app/location" }
};

export default async function Location() {
  const s = await getSettings();
  return <>
    <div className="page-head"><div className="wrap"><div className="mini-label">LOCATION</div><h1>오시는 길</h1></div></div>
    <div className="wrap">
      <div className="grid two">
        <div className="card">
          <h2>{s.church_name}</h2>
          <p><strong>주소</strong><br/>{s.address}</p>
          <p><strong>전화</strong><br/>{s.phone}</p>
          <div className="actions"><a className="btn" href={s.map_url} target="_blank" rel="noreferrer">지도에서 찾기</a></div>
        </div>
        <div className="card">
          <h2>대중교통</h2>
          <p>주보에 안내된 버스 노선</p>
          <p className="route-text">{s.bus_routes}</p>
          <p className="meta">서재초등학교 앞</p>
        </div>
      </div>
    </div>
  </>;
}
