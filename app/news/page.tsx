import { getNotices } from "../../lib/content";

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
