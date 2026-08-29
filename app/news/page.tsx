import type { Metadata } from "next";
import { getNotices } from "../../lib/content";

export const metadata: Metadata = {
  title: "교회소식",
  description: "서재교회 예배와 모임, 공동의회, 성경공부 등 최신 교회소식을 확인하세요.",
  alternates: { canonical: "/news" },
  openGraph: { title: "교회소식 | 서재교회", description: "서재교회 예배와 모임, 공동의회, 성경공부 등 최신 교회소식을 확인하세요.", url: "https://seojae-church.vercel.app/news" }
};

export default async function News() {
  const rows = await getNotices(100);

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <h1>교회소식</h1>
        </div>
      </div>
      <div className="wrap">
        <div className="list">
          {rows.map((n: any) => (
            <article className="card" key={n.id}>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
              <div className="meta">{n.published_at}</div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
