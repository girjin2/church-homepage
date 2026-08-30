import Link from "next/link";
import { getBulletins, getNotices, getSermons, getSettings } from "../lib/content";

export default async function Home() {
  const [settings, sermons, notices, bulletins] = await Promise.all([
    getSettings(), getSermons(3), getNotices(4), getBulletins(1)
  ]);

  const serviceCards = [
    ["주일 1부예배", settings.sunday_service],
    ["주일 오후예배", settings.sunday_afternoon_service],
    ["주일학교", settings.sunday_school_service],
    ["중고등부", settings.youth_service],
    ["수요예배", settings.wednesday_service],
    ["금요예배", settings.friday_service],
    ["새벽예배", settings.dawn_service],
  ].filter(([, value]) => value);

  return <>
    <section className="hero hero-photo">
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner hero-content">
        <h1>{settings.hero_title}</h1>
        <p>{settings.hero_text}</p>
        <div className="actions">
          <Link className="btn hero-primary" href="/worship">예배시간 보기</Link>
          {settings.youtube_url
            ? <a className="btn hero-secondary" href={settings.youtube_url} target="_blank" rel="noreferrer">유튜브</a>
            : <span className="btn hero-secondary disabled-link" aria-disabled="true" title="관리자에서 YouTube 주소를 등록하면 활성화됩니다.">유튜브</span>}
        </div>
      </div>
    </section>

    <section className="wrap">
      <div className="intro-banner">
        <div>
          <span className="mini-label">2026 교회 표어</span>
          <h2>{settings.slogan}</h2>
        </div>
        <div className="intro-meta">{settings.founded_date && `설립 ${settings.founded_date}`}</div>
      </div>
    </section>

    <section className="wrap compact-top">
      <h2 className="section-title">예배 안내</h2>
      <p className="section-lead">서재교회 예배 시간입니다.</p>
      <div className="grid service-grid">
        {serviceCards.map(([name, time]) =>
          <div className="card service-card" key={name}>
            <div className="feature">{name}</div>
            <div>{time}</div>
          </div>
        )}
      </div>
    </section>

    <section className="wrap">
      <h2 className="section-title">이번 주 말씀</h2>
      <div className="grid two">
        {sermons.map((s:any)=>
          <article className="card sermon-card" key={s.id}>
            <div className="meta">{s.service_date}</div>
            <h3>{s.title}</h3>
            <p>{s.scripture}</p>
            <div className="meta">{s.preacher}</div>
            {s.youtube_url && <><div className="spacer"/><a className="btn" href={s.youtube_url} target="_blank" rel="noreferrer">설교 보기</a></>}
          </article>
        )}
      </div>
    </section>

    <section className="wrap seo-location">
      <div className="card">
        <div className="mini-label">SEOJAE CHURCH · DAEGU</div>
        <h2 className="section-title">대구 달성군 다사읍 서재교회</h2>
        <p>서재교회는 대구광역시 달성군 다사읍 서재로 104, 서재초등학교 앞에 있습니다. 주일예배와 수요예배, 금요예배, 새벽예배를 드리며 설교와 주보, 교회소식을 홈페이지에서 확인하실 수 있습니다.</p>
        <div className="actions">
          <Link className="btn" href="/location">서재교회 오시는 길</Link>
          <Link className="btn light" href="/church">서재교회 소개</Link>
        </div>
      </div>
    </section>

    <section className="wrap">
      <div className="grid two">
        <div>
          <h2 className="section-title">교회소식</h2>
          <div className="list">
            {notices.map((n:any)=><div className="card" key={n.id}>
              <h3>{n.title}</h3><p>{n.body}</p><div className="meta">{n.published_at}</div>
            </div>)}
          </div>
        </div>
        <div>
          <h2 className="section-title">이번 주 주보</h2>
          {bulletins[0]&&<div className="card bulletin-card">
            <div className="mini-label">주보</div>
            <h3>{bulletins[0].title}</h3>
            <div className="meta">{bulletins[0].service_date}</div>
            <p>이번 주 예배 순서와 교회 소식을 확인하실 수 있습니다.</p>
            <a className="btn" href={bulletins[0].file_url}>주보 열기</a>
          </div>}
        </div>
      </div>
    </section>
  </>;
}
