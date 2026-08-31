import type { Metadata } from "next";
import { getNotices } from "../../lib/content";
import { getPublicClient } from "../../lib/supabase";

export const metadata: Metadata = {
  title: "교회소식",
  description: "서재교회 광고와 사진을 확인하세요.",
  alternates: { canonical: "/news" },
  openGraph: { title: "교회소식 | 서재교회", description: "서재교회 광고와 사진을 확인하세요.", url: "https://seojae-church.vercel.app/news" }
};

export default async function News() {
  const rows = await getNotices(100);
  const sb = getPublicClient();
  let photos:any[] = [];
  if (sb) {
    const r = await sb.storage.from("church-images").list("photos", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    photos = (r.data || []).map((x:any) => ({ ...x, url: sb.storage.from("church-images").getPublicUrl(`photos/${x.name}`).data.publicUrl }));
  }

  return <>
    <div className="page-head"><div className="wrap"><h1>교회소식</h1><p className="section-lead">광고와 사진, 두 가지만 간단히 확인합니다.</p></div></div>
    <div className="wrap">
      <div className="actions" style={{marginTop:0, marginBottom:30}}><a className="btn" href="#ads">광고</a><a className="btn light" href="#photos">사진</a></div>

      <section id="ads" style={{scrollMarginTop:110, marginBottom:54}}>
        <h2 className="section-title">광고</h2>
        <div className="list">{rows.length ? rows.map((n:any)=><article className="card" key={n.id}><h3>{n.title}</h3><p>{n.body}</p><div className="meta">{n.published_at}</div></article>) : <div className="card empty-state">등록된 광고가 없습니다.</div>}</div>
      </section>

      <section id="photos" style={{scrollMarginTop:110, marginBottom:54}}>
        <h2 className="section-title">사진</h2>
        {photos.length ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>{photos.map((p:any)=>{
          const date=String(p.name).split("__")[0];
          return <figure className="card" style={{padding:0,overflow:"hidden",margin:0}} key={p.name}><img src={p.url} alt={`서재교회 ${date} 사진`} loading="lazy" style={{display:"block",width:"100%",aspectRatio:"4 / 3",objectFit:"cover"}}/><figcaption className="meta" style={{padding:"11px 14px"}}>{date}</figcaption></figure>;
        })}</div> : <div className="card empty-state">등록된 사진이 없습니다.</div>}
      </section>
    </div>
  </>;
}
