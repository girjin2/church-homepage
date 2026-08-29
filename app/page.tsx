import Link from "next/link";
import { getBulletins, getNotices, getSermons, getSettings } from "../lib/content";

export default async function Home() {
  const [settings, sermons, notices, bulletins] = await Promise.all([getSettings(), getSermons(3), getNotices(3), getBulletins(1)]);
  return <>
    <section className="hero"><div className="hero-inner"><div className="eyebrow">WELCOME TO {settings.church_name}</div><h1>{settings.hero_title}</h1><p>{settings.hero_text}</p><div className="actions"><Link className="btn light" href="/worship">예배시간 보기</Link><a className="btn outline" href={settings.youtube_url} target="_blank">YouTube 예배</a></div></div></section>
    <section className="wrap"><h2 className="section-title">예배 안내</h2><p className="section-lead">함께 예배드리기를 기다립니다.</p><div className="grid"><div className="card"><div className="feature">주일예배</div>{settings.sunday_service}</div><div className="card"><div className="feature">수요예배</div>{settings.wednesday_service}</div><div className="card"><div className="feature">새벽기도회</div>{settings.dawn_service}</div></div></section>
    <section className="wrap"><h2 className="section-title">최근 설교</h2><div className="grid">{sermons.map((s:any)=><article className="card" key={s.id}><div className="meta">{s.service_date}</div><h3>{s.title}</h3><p>{s.scripture}</p><div className="meta">{s.preacher}</div><div className="spacer"/><a className="btn" href={s.youtube_url} target="_blank">설교 보기</a></article>)}</div></section>
    <section className="wrap"><div className="grid two"><div><h2 className="section-title">교회소식</h2><div className="list">{notices.map((n:any)=><div className="card" key={n.id}><h3>{n.title}</h3><p>{n.body}</p><div className="meta">{n.published_at}</div></div>)}</div></div><div><h2 className="section-title">이번 주 주보</h2>{bulletins[0]&&<div className="card"><h3>{bulletins[0].title}</h3><div className="meta">{bulletins[0].service_date}</div><div className="spacer"/><a className="btn" href={bulletins[0].file_url}>주보 보기</a></div>}</div></div></section>
  </>;
}
