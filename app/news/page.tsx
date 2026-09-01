import type { Metadata } from "next";
import { getNotices } from "../../lib/content";

export const metadata: Metadata = {
  title: "교회소식",
  description: "서재교회의 새로운 소식을 확인하세요.",
  alternates: { canonical: "/news" },
  openGraph: { title: "교회소식 | 서재교회", description: "서재교회의 새로운 소식을 확인하세요.", url: "https://seojae-church.vercel.app/news" }
};

export const dynamic = "force-dynamic";

export default async function News() {
  const rows = await getNotices(100);

  return <>
    <div className="page-head"><div className="wrap"><h1>교회소식</h1><p className="section-lead">서재교회의 새로운 소식을 전합니다.</p></div></div>
    <div className="wrap" style={{paddingBottom:70}}>
      <div className="list">{rows.length ? rows.map((n:any)=><article className="card" key={n.id}><h3>{n.title}</h3><p style={{whiteSpace:"pre-wrap"}}>{n.body}</p><div className="meta">{n.published_at}</div></article>) : <div className="card empty-state">등록된 교회소식이 없습니다.</div>}</div>
    </div>
  </>;
}
