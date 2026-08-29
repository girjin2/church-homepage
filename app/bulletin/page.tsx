import type { Metadata } from "next";
import { getBulletins } from "../../lib/content";

export const metadata: Metadata = {
  title: "주보",
  description: "서재교회 이번 주 주보와 지난 주보를 확인하세요. 예배순서와 교회소식을 안내합니다.",
  alternates: { canonical: "/bulletin" },
  openGraph: { title: "주보 | 서재교회", description: "서재교회 이번 주 주보와 지난 주보를 확인하세요. 예배순서와 교회소식을 안내합니다.", url: "https://seojae-church.vercel.app/bulletin" }
};

export default async function Bulletin() {
  const rows = await getBulletins(100);

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <h1>주보</h1>
        </div>
      </div>
      <div className="wrap">
        <div className="list">
          {rows.map((b: any) => (
            <div className="list-row" key={b.id}>
              <div>
                <strong>{b.title}</strong>
                <div className="meta">{b.service_date}</div>
              </div>
              <a className="btn" href={b.file_url} target="_blank" rel="noreferrer">
                주보 보기
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
