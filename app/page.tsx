import Link from "next/link";
import { getBulletins, getNotices, getSermons, getSettings } from "../lib/content";
import { getPublicClient } from "../lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, sermons, notices, bulletins] = await Promise.all([
    getSettings(), getSermons(2), getNotices(5, true), getBulletins(1)
  ]);

  const sb = getPublicClient();
  let photos:any[] = [];
  if (sb) {
    const r = await sb.storage.from("church-images").list("photos", {
      limit: 4,
      sortBy: { column: "created_at", order: "desc" }
    });
    photos = (r.data || []).map((x:any) => ({
      ...x,
      url: sb.storage.from("church-images").getPublicUrl(`photos/${x.name}`).data.publicUrl
    }));
  }

  return <>
    <section className="hero-v5">
      <div className="hero-v5-sky" aria-hidden="true" />
      <img className="hero-v5-church" src="/images/seojae-church-building.png" alt="서재교회 전경" />
      <div className="hero-v5-shade" aria-hidden="true" />
      <div className="hero-v5-inner">
        <div className="hero-v5-copy">
          <h1>{settings.hero_title}</h1>
          <p>{settings.hero_text}</p>
          <div className="actions">
            <Link className="btn hero-primary" href="/worship">예배시간 보기</Link>
            {settings.youtube_url
              ? <a className="btn hero-secondary" href={settings.youtube_url} target="_blank" rel="noreferrer">유튜브</a>
              : <span className="btn hero-secondary disabled-link" aria-disabled="true" title="관리자에서 YouTube 주소를 등록하면 활성화됩니다.">유튜브</span>}
            <Link className="btn hero-secondary" href="/app-download">앱 다운로드</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="wrap motto-wrap">
      <div className="intro-banner">
        <div>
          <span className="mini-label">2026 교회 표어</span>
          <h2>{settings.slogan}</h2>
        </div>
        <div className="intro-meta">{settings.founded_date && `설립 ${settings.founded_date}`}</div>
      </div>
    </section>

    <section className="wrap worship-news-wrap">
      <div className="section-row public-section-row">
        <div><h2 className="section-title">교회소식</h2><p className="section-lead">최근 광고와 사진을 한눈에 확인합니다.</p></div>
        <div style={{display:"flex",gap:16}}><Link className="more-link" href="/news#ads">광고</Link><Link className="more-link" href="/news#photos">사진 더보기</Link></div>
      </div>
      {notices.length ? <div className="list">{notices.map((n:any)=><Link href="/news#ads" className="list-row" key={n.id}><div><strong>{n.title}</strong><div className="meta">{n.published_at}</div></div><span>›</span></Link>)}</div> : <div className="card empty-state">등록된 광고가 없습니다.</div>}

      <div className="spacer"/>
      {photos.length ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>{photos.map((p:any)=>{
        const date=String(p.name).split("__")[0];
        return <Link href="/news#photos" key={p.name} className="card" style={{padding:0,overflow:"hidden",textDecoration:"none"}}>
          <img src={p.url} alt={`서재교회 ${date} 사진`} loading="lazy" style={{display:"block",width:"100%",aspectRatio:"4 / 3",objectFit:"cover"}}/>
          <div className="meta" style={{padding:"10px 12px"}}>{date}</div>
        </Link>;
      })}</div> : <div className="card empty-state">등록된 사진이 없습니다.</div>}
    </section>

    <section className="wrap home-lower">
      <div className="grid two">
        <div>
          <div className="section-row public-section-row">
            <h2 className="section-title">최근 설교</h2>
            <Link className="more-link" href="/sermons">더보기 ›</Link>
          </div>
          <div className="list">
            {sermons.map((s:any)=><article className="card sermon-card compact-sermon" key={s.id}>
              <div className="meta">{s.service_date}</div>
              <h3>{s.title}</h3>
              <p>{s.scripture}</p>
              <div className="meta">{s.preacher}</div>
              {s.youtube_url && <><div className="spacer"/><a className="btn" href={s.youtube_url} target="_blank" rel="noreferrer">설교 보기</a></>}
            </article>)}
          </div>
        </div>
        <div>
          <h2 className="section-title">이번 주 주보</h2>
          {bulletins[0] ? <div className="card bulletin-card">
            <div className="mini-label">주보</div>
            <h3>{bulletins[0].title}</h3>
            <div className="meta">{bulletins[0].service_date}</div>
            <p>이번 주 예배 순서와 교회 소식을 확인하실 수 있습니다.</p>
            <a className="btn" href={bulletins[0].file_url}>주보 열기</a>
          </div> : <div className="card empty-state">등록된 주보가 없습니다.</div>}
        </div>
      </div>
    </section>

    <section className="wrap seo-location">
      <div className="card">
        <div className="mini-label">SEOJAE CHURCH · DAEGU</div>
        <h2 className="section-title">대구 달성군 다사읍 서재교회</h2>
        <p>서재교회는 대구광역시 달성군 다사읍 서재로 104, 서재초등학교 앞에 있습니다. 예배와 설교, 주보, 교회소식을 홈페이지에서 확인하실 수 있습니다.</p>
        <div className="actions">
          <Link className="btn" href="/location">서재교회 오시는 길</Link>
          <Link className="btn light" href="/church">서재교회 소개</Link>
        </div>
      </div>
    </section>
  </>;
}
