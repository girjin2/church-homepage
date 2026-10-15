import type { Metadata } from "next";
import AccountCopy from "./AccountCopy";

const BASE = "https://seojae-church.vercel.app/invitation-2026";
const kakao = "https://map.kakao.com/link/to/" + encodeURIComponent("서재교회") + ",35.8726356,128.4976413";
const naverMap = "https://map.naver.com/p/search/" + encodeURIComponent("대구광역시 달성군 다사읍 서재로 104");
const naverNavi = "nmap://navigation?dlat=35.8726356&dlng=128.4976413&dname=" + encodeURIComponent("서재교회 (서재로 104)") + "&appname=" + encodeURIComponent(BASE);
const osm = "https://www.openstreetmap.org/export/embed.html?bbox=128.49515%2C35.87135%2C128.50015%2C35.87395&layer=mapnik&marker=35.8726356%2C128.4976413";

export const metadata: Metadata = {
  title: "은퇴 및 위임 감사예배 초청장",
  description: "2026년 11월 14일 토요일 오전 11시, 서재교회 본당. 은퇴 천성일 목사, 위임 천길진 목사. 서재로 104 길찾기 안내.",
  alternates: { canonical: "/invitation-2026" },
  openGraph: {
    type: "website", locale: "ko_KR",
    title: "서재교회 은퇴 및 위임 감사예배 초청장",
    description: "2026년 11월 14일(토) 오전 11시 · 서재교회 본당 · 은퇴 천성일 목사 · 위임 천길진 목사",
    url: BASE, siteName: "서재교회"
  }
};

const styles = `
.inv26-shell{background:#e8f5ff;padding:18px 12px 48px;font-family:Arial,'Apple SD Gothic Neo','Malgun Gothic',sans-serif}
.inv26-paper{max-width:760px;margin:auto;position:relative;isolation:isolate;overflow:hidden;text-align:center;background:linear-gradient(160deg,#e9f7ff 0%,#fff 25%,#fafdff 75%,#e4f3ff 100%);border:9px solid #cde8f7;border-radius:24px;box-shadow:0 8px 32px #0e47771b;color:#173d6c}
.inv26-paper::before{content:'';position:absolute;z-index:-1;width:350px;height:300px;left:-78px;top:-76px;border-radius:50%;background:radial-gradient(ellipse at 20% 20%,#95cc60b3 0 18%,transparent 19%),radial-gradient(ellipse at 60% 38%,#a3d47194 0 20%,transparent 21%),radial-gradient(ellipse at 25% 73%,#93bd6c88 0 18%,transparent 19%),radial-gradient(ellipse at 83% 73%,#c5df9990 0 18%,transparent 19%)}
.inv26-paper::after{content:'';position:absolute;z-index:-1;inset:auto -12% -150px -12%;height:350px;background:radial-gradient(ellipse at 15% 80%,#a9d7eb8a,transparent 52%),radial-gradient(ellipse at 88% 85%,#a8c68a99,transparent 47%)}
.inv26-top{padding:38px 30px 18px}
.inv26-flourish{font-size:25px;color:#467bad;letter-spacing:10px;line-height:1.1}
.inv26-head{margin:12px auto 0;font-family:Georgia,'Nanum Myeongjo','Batang',serif;color:#104883;line-height:1.32;font-size:clamp(25px,5vw,34px);font-weight:800;word-break:keep-all}
.inv26-head span{display:block;font-size:1em;font-weight:inherit}
.inv26-thinline{width:70%;height:1px;background:#9dc7e5;margin:21px auto 0}
.inv26-label{font-weight:800;letter-spacing:.06em;color:#15538f;font-size:22px;margin:24px 0 14px}
.inv26-invite{font-family:'Nanum Myeongjo','Batang',serif;word-break:keep-all;line-height:1.95;font-size:clamp(14px,2.9vw,18px);color:#263b58;margin:0 auto;max-width:460px}
.inv26-invite p{margin:0 0 15px}
.inv26-info{background:#e6f2fdcc;margin:24px 24px 19px;padding:14px 15px;border-radius:16px;font-weight:700;line-height:2;color:#093a70}
.inv26-info b{font-weight:900}
.inv26-people{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0 24px 26px}
.inv26-person{border:1px solid #d7e6ee;border-radius:15px;background:linear-gradient(140deg,#f4f8ed,#e5f4ee);padding:16px 6px}
.inv26-person:nth-child(2){background:linear-gradient(140deg,#ebf8ff,#e0eef9)}
.inv26-role{display:block;font-weight:800;font-size:15px;color:#fff;background:#569984;border-radius:20px;padding:3px 12px;margin:0 auto 8px;width:max-content}
.inv26-person:nth-child(2) .inv26-role{background:#4c8fcc}
.inv26-person strong{font-family:'Nanum Myeongjo','Batang',serif;display:block;font-size:clamp(22px,5vw,31px);color:#173c66}
.inv26-way{padding:0 20px 25px}
.inv26-way h2{font-size:24px;color:#174e88;margin:10px 0 12px}
.inv26-address{display:block;word-break:keep-all;color:#174e88;text-decoration:underline;text-underline-offset:4px;font-size:16px;font-weight:800;margin:5px 0}
.inv26-address-sub{display:block;color:#4b647b;font-size:14px;margin-bottom:12px}
.inv26-realmap{background:#fff;border:1px solid #bdd8ec;border-radius:14px;overflow:hidden;margin:12px auto}
.inv26-realmap iframe{width:100%;height:246px;display:block;border:0}
.inv26-realmap small{display:block;text-align:left;padding:8px 12px;font-size:11px;color:#566e82;background:#fafcff}
.inv26-directions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0 0}
.inv26-mapbtn{text-decoration:none;display:flex;justify-content:center;align-items:center;min-height:51px;border-radius:12px;font-size:16px;font-weight:850}
.inv26-kakao{background:#ffe04c;color:#342b21}
.inv26-naver{background:#03b65f;color:white}
.inv26-navibtn{display:block;margin-top:12px;padding:10px;border:1px solid #169b61;border-radius:10px;color:#087b4b;background:#f5fff9;text-decoration:none;font-size:14px;font-weight:700}
.inv26-tip{margin:10px 0 0;font-size:12px;line-height:1.6;color:#536b7d}
.inv26-account{display:flex;justify-content:center;align-items:center;gap:7px;flex-wrap:wrap;border-top:1px solid #c1dfee;background:#eff8ff;padding:15px 8px 18px;font-size:clamp(11px,2.8vw,15px);white-space:nowrap;color:#15477c}
.inv26-account b{font-weight:850}
.inv26-end{padding:14px 18px 24px;color:#54728f;font-size:12px}
@media(min-width:900px){.inv26-shell{padding:32px 12px 60px}.inv26-top{padding-top:52px}}
@media(max-width:390px){.inv26-top{padding:27px 15px 15px}.inv26-info,.inv26-people{margin-left:10px;margin-right:10px}.inv26-way{padding-left:12px;padding-right:12px}.inv26-mapbtn{font-size:14px}.inv26-label{font-size:20px}}
`;

const extraStyles = `
html:has(.inv26-shell){color-scheme:light!important;background:#f2f9ff!important}
body:has(.inv26-shell){color-scheme:light!important;background:#f2f9ff!important;color:#173d6c!important}
body:has(.inv26-shell) .header,body:has(.inv26-shell) .footer{display:none!important}
body:has(.inv26-shell) main{min-height:100vh!important}
.inv26-shell,.inv26-paper,.inv26-top,.inv26-info,.inv26-person,.inv26-realmap,.inv26-way,.inv26-end,.inv26-account{color-scheme:light!important}
.inv26-shell{min-height:100vh!important;background:#eaf7ff!important;padding:12px 10px 35px!important}
.inv26-paper{background:linear-gradient(165deg,#f3fbff 0%,#fff 24%,#fff 78%,#eaf6ff 100%)!important;color:#143e71!important;border-color:#cde8f7!important}
.inv26-head{font-size:clamp(23px,5.2vw,33px)!important;color:#12509c!important;line-height:1.35!important}
.inv26-top{padding:26px 15px 12px!important}
.inv26-label{font-size:20px!important;margin:16px 0 12px!important}
.inv26-invite{font-size:clamp(14px,3.5vw,17px)!important;line-height:1.72!important;color:#16395f!important;max-width:95%!important}
.inv26-invite p{margin:0 0 13px!important}
.inv26-info{background:#e7f3fc!important;color:#0b427c!important;margin:17px 14px 18px!important;padding:12px!important;line-height:1.45!important}
.inv26-date{display:flex;align-items:flex-start;gap:10px;justify-content:center;margin:8px 0;flex-wrap:wrap;word-break:keep-all!important;overflow-wrap:normal!important}
.inv26-date>span{flex:0 0 auto;white-space:nowrap;color:#235c9d}
.inv26-date>b{font-size:clamp(14px,3.35vw,19px);white-space:normal;word-break:keep-all!important;overflow-wrap:normal!important;color:#083971!important;max-width:100%;line-height:1.55}
.inv26-people{margin:0 14px 20px!important;gap:8px!important}
.inv26-person{padding:12px 5px!important;color:#173c66!important}
.inv26-person strong{font-size:clamp(18px,4.7vw,27px)!important;color:#143e71!important;word-break:keep-all}
.inv26-way{padding:0 15px 22px!important}
.inv26-way h2{margin:10px 0!important}
.inv26-realmap,.inv26-realmap small{background:#fff!important;color:#425d78!important}
.inv26-mapbtn{font-size:clamp(13px,3.45vw,17px)!important}
.inv26-account{background:#eff8ff!important;color:#15477c!important;line-height:1.5!important}
.inv26-end{color:#496c91!important;background:#edf8ffb0!important}
@media(max-width:380px){.inv26-date>b{font-size:14px!important}.inv26-account{font-size:11px!important}.inv26-date{gap:5px}}
`;
export default function Invitation2026() {
  return <div className="inv26-shell">
    <article className="inv26-paper">
      <div className="inv26-top">
        <div className="inv26-flourish" aria-hidden="true">❧  ✝  ❧</div>
        <h1 className="inv26-head"><span>서재교회</span><span>은퇴 및 위임 감사예배</span></h1>
        <div className="inv26-thinline" />
        <h2 className="inv26-label">초청의 말씀</h2>
        <div className="inv26-invite">
          <p>하나님의 신실하신 인도하심 가운데<br/>서재교회가 새로운 믿음의 걸음을 내딛습니다.</p>
          <p>그동안 말씀과 기도로 교회를 섬기신<br/>천성일 목사님의 은퇴를 감사하며,<br/>천길진 목사님의 위임을 통해<br/>새롭게 맡겨 주실 사명을 바라봅니다.</p>
          <p>지나온 은혜에 감사하고<br/>앞으로의 사역을 하나님께 맡겨 드리는<br/>뜻깊은 감사예배에 귀하를 초청하오니<br/>함께 기도하며 축복해 주시기 바랍니다.</p>
        </div>
      </div>
      <section className="inv26-info" aria-label="예배 일시 및 장소">
        <div className="inv26-date"><span>일시</span><b>2026년 11월 14일 (토) 오전 11시</b></div>
        <div className="inv26-date"><span>장소</span><b>서재교회 본당</b></div>
      </section>
      <section className="inv26-people" aria-label="은퇴 및 위임 목사">
        <div className="inv26-person"><span className="inv26-role">은퇴 목사</span><strong>천성일 목사</strong></div>
        <div className="inv26-person"><span className="inv26-role">위임 목사</span><strong>천길진 목사</strong></div>
      </section>
      <section className="inv26-way" id="directions">
        <h2>찾아오시는 길</h2>
        <a className="inv26-address" href={kakao} target="_blank" rel="noopener noreferrer" aria-label="대구 달성군 다사읍 서재로 104 카카오맵 길찾기">대구광역시 달성군 다사읍 서재로 104 ↗</a>
        <span className="inv26-address-sub">지번: 다사읍 서재리 258-7 · 우편번호 42927</span>
        <div className="inv26-realmap">
          <iframe src={osm} title="서재로 104 실제 도로 지도" loading="lazy" />
          <small>주소 좌표로 표시한 실제 지도입니다. 목적지와 출입구는 방문 전 확인해 주세요.</small>
        </div>
        <div className="inv26-directions">
          <a className="inv26-mapbtn inv26-kakao" href={kakao} target="_blank" rel="noopener noreferrer">카카오맵 길찾기 ↗</a>
          <a className="inv26-mapbtn inv26-naver" href={naverMap} target="_blank" rel="noopener noreferrer">네이버지도 열기 ↗</a>
        </div>
        <a className="inv26-navibtn" href={naverNavi}>네이버 내비 앱으로 길 안내 (앱 설치 시) ↗</a>
        <p className="inv26-tip">약도 대신 지도 버튼을 눌러 길찾기를 열어 주세요.</p>
      </section>
      <AccountCopy />
      <div className="inv26-end">사람이 마땅히 우리를 그리스도의 일꾼이요 하나님의 비밀을 맡은 자로 여길지어다<br/>고린도전서 4:1-2</div>
    </article>
    <style dangerouslySetInnerHTML={{__html:styles + extraStyles}} />
  </div>;
}
