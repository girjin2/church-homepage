import type { Metadata } from "next";
import { getSermons } from "../../lib/content";
export const metadata: Metadata = {
  title: "설교",
  description: "서재교회 최근 설교와 말씀 본문을 확인하세요. 대구 달성군 다사읍 서재교회 설교 안내입니다.",
  alternates: { canonical: "/sermons" },
  openGraph: { title: "설교 | 서재교회", description: "서재교회 최근 설교와 말씀 본문을 확인하세요. 대구 달성군 다사읍 서재교회 설교 안내입니다.", url: "https://seojae-church.vercel.app/sermons" }
};

export default async function Sermons(){
  const rows=await getSermons();
  return <><div className="page-head"><div className="wrap"><div className="mini-label">SERMON</div><h1>설교</h1></div></div>
  <div className="wrap"><div className="grid">{rows.map((s:any)=><article className="card" key={s.id}><div className="meta">{s.service_date}</div><h3>{s.title}</h3><p>{s.scripture}</p><div className="meta">{s.preacher}</div>{s.youtube_url&&<><div className="spacer"/><a className="btn" href={s.youtube_url} target="_blank" rel="noreferrer">설교 보기</a></>}</article>)}</div></div></>;
}
