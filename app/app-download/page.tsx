import Link from "next/link";

export const metadata = {
  title: "서재교회 앱 다운로드",
  description: "서재교회 Android 앱 APK를 다운로드하고 설치하는 방법을 안내합니다.",
};

export default function AppDownloadPage() {
  return <>
    <section className="page-head">
      <div className="wrap">
        <h1>서재교회 앱 다운로드</h1>
        <p className="section-lead">안드로이드 휴대폰에서 서재교회 홈페이지를 앱처럼 편리하게 이용하실 수 있습니다.</p>
      </div>
    </section>

    <section className="wrap">
      <div className="card">
        <div className="mini-label">ANDROID APP</div>
        <h2 className="section-title">서재교회 앱</h2>
        <p>아래 버튼을 누르면 최신 서재교회 Android APK 파일을 내려받습니다.</p>
        <div className="actions">
          <a className="btn" href="/downloads/SeojaeChurch.apk" download>APK 다운로드</a>
          <Link className="btn light" href="/">홈으로</Link>
        </div>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>설치 방법</h2>
        <p>1. 위의 <strong>APK 다운로드</strong> 버튼을 누릅니다.</p>
        <p>2. 다운로드된 <strong>SeojaeChurch.apk</strong> 파일을 엽니다.</p>
        <p>3. Android에서 처음 설치할 경우 브라우저에 대해 <strong>알 수 없는 앱 설치 허용</strong>을 요청할 수 있습니다.</p>
        <p>4. 허용 후 설치를 누르면 서재교회 앱이 휴대폰에 설치됩니다.</p>
        <p className="meta">이 APK는 서재교회 공식 홈페이지를 앱 화면으로 여는 Android 앱입니다.</p>
      </div>
    </section>
  </>;
}
