import Link from "next/link";
import InstallPwaButton from "../../components/InstallPwaButton";

export const metadata = {
  title: "서재교회 앱 설치",
  description: "서재교회 홈페이지를 휴대폰 홈 화면에 앱처럼 설치하는 방법을 안내합니다.",
};

export default function AppDownloadPage() {
  return <>
    <section className="page-head">
      <div className="wrap">
        <h1>서재교회 앱 설치</h1>
        <p className="section-lead">별도 APK 파일 없이 서재교회 홈페이지를 휴대폰 홈 화면에 앱처럼 설치해 사용할 수 있습니다.</p>
      </div>
    </section>

    <section className="wrap">
      <div className="card">
        <div className="mini-label">PWA APP</div>
        <h2 className="section-title">홈 화면에 서재교회 앱 설치</h2>
        <p>한 번 설치하면 홈 화면의 서재교회 아이콘을 눌러 일반 앱처럼 실행할 수 있습니다. 홈페이지의 최신 소식과 실시간 예배도 같은 화면에서 바로 확인할 수 있습니다.</p>
        <div className="actions">
          <InstallPwaButton className="btn" />
          <Link className="btn light" href="/">서재교회 홈페이지 열기</Link>
        </div>
      </div>

      <div className="spacer" />

      <div className="grid two">
        <div className="card">
          <div className="mini-label">ANDROID</div>
          <h2>안드로이드 설치 방법</h2>
          <p>1. Chrome으로 서재교회 홈페이지를 엽니다.</p>
          <p>2. 오른쪽 위 메뉴를 누릅니다.</p>
          <p>3. <strong>앱 설치</strong> 또는 <strong>홈 화면에 추가</strong>를 선택합니다.</p>
          <p>4. 설치를 누르면 홈 화면에 서재교회 아이콘이 생깁니다.</p>
        </div>

        <div className="card">
          <div className="mini-label">IPHONE · IPAD</div>
          <h2>아이폰 · 아이패드 설치 방법</h2>
          <p>1. Safari로 서재교회 홈페이지를 엽니다.</p>
          <p>2. 아래쪽의 <strong>공유</strong> 버튼을 누릅니다.</p>
          <p>3. <strong>홈 화면에 추가</strong>를 선택합니다.</p>
          <p>4. 추가를 누르면 홈 화면에 서재교회 아이콘이 생깁니다.</p>
        </div>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>설치 후 이용</h2>
        <p>설치 후에는 홈 화면의 서재교회 아이콘을 눌러 실행하면 됩니다. 별도의 앱 업데이트 파일을 다시 설치할 필요 없이 홈페이지의 최신 내용이 반영됩니다.</p>
        <p className="meta">기존 APK 설치파일 대신 PWA 방식으로 운영합니다.</p>
      </div>
    </section>
  </>;
}
