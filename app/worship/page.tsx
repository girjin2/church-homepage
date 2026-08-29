import { getSettings } from "../../lib/content";

export default async function Worship() {
  const s = await getSettings();
  const items = [
    ["주일 1부예배", s.sunday_service],
    ["주일 오후예배", s.sunday_afternoon_service],
    ["주일학교", s.sunday_school_service],
    ["중고등부", s.youth_service],
    ["수요예배", s.wednesday_service],
    ["금요예배", s.friday_service],
    ["새벽예배", s.dawn_service],
  ].filter(([, value]) => value);
  return <>
    <div className="page-head"><div className="wrap"><div className="mini-label">WORSHIP</div><h1>예배안내</h1><p className="section-lead">함께 예배드리기를 기다립니다.</p></div></div>
    <div className="wrap"><div className="grid service-grid">
      {items.map(([name,time])=><div className="card service-card" key={name}><h3>{name}</h3><p>{time}</p></div>)}
    </div></div>
  </>;
}
