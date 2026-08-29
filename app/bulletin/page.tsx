import { getBulletins } from "../../lib/content";

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
