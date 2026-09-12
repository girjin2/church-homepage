import Link from "next/link";

export const metadata = {
  title: "예배 리더 설치",
  description: "태블릿에서 설교문과 예배 자료를 편하게 읽는 예배 리더 PWA 설치 안내입니다.",
};

const READER_URL = "https://worship-reader-tablet.girjin2.chatgpt.site/";

export default function WorshipReaderPage() {
  return <>
    <section className="page-head">
      <div className="wrap">
        <div className="mini-label">WORSHIP READER</div>
        <h1>예배 리더</h1>
        <p className="section-lead">설교문과 예배 자료를 태블릿에서 크게, 안정적으로 읽기 위한 독립 리더입니다.</p>
      </div>
    </section>

    <section className="wrap">
      <div className="card">
        <div className="mini-label">독립 실행</div>
        <h2 className="section-title">ChurchStudio와 분리된 예배용 리더</h2>
        <p>예배 리더는 ChurchStudio 방송 프로그램과 별도로 동작합니다. 설치하거나 사용해도 ChurchStudio의 방송, 카메라, 찬송, 성경 기능에는 영향을 주지 않습니다.</p>
        <div className="actions">
          <a className="btn" href={READER_URL} target="_blank" rel="noreferrer">예배 리더 열기</a>
          <Link className="btn light" href="/">홈으로</Link>
        </div>
      </div>

      <div className="spacer" />

      <div className="grid two">
        <div className="card">
          <div className="mini-label">GALAXY TAB · ANDROID</div>
          <h2>갤럭시탭 설치</h2>
          <p>1. Chrome에서 <strong>예배 리더 열기</strong>를 누릅니다.</p>
          <p>2. 브라우저 메뉴에서 <strong>앱 설치</strong> 또는 <strong>홈 화면에 추가</strong>를 선택합니다.</p>
          <p>3. 홈 화면의 예배 리더 아이콘으로 실행합니다.</p>
          <p>4. 설교문을 내려받은 뒤 예배 리더의 <strong>파일 열기</strong>에서 선택합니다.</p>
        </div>

        <div className="card">
          <div className="mini-label">IPAD</div>
          <h2>아이패드 설치</h2>
          <p>1. Safari에서 <strong>예배 리더 열기</strong>를 누릅니다.</p>
          <p>2. Safari 공유 버튼을 누릅니다.</p>
          <p>3. <strong>홈 화면에 추가</strong>를 선택합니다.</p>
          <p>4. 설치된 아이콘으로 실행한 뒤 Files 앱의 설교문을 열어 사용합니다.</p>
        </div>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>지원 자료</h2>
        <p><strong>바로 읽기:</strong> HWPX, DOCX, TXT, PDF</p>
        <p><strong>PPTX:</strong> 현재는 보관할 수 있으며, 읽으려면 PDF로 변환한 파일을 사용하는 것이 가장 안정적입니다.</p>
        <p>Google Drive, 네이버 MYBOX, 카카오톡, 이메일 등 어느 곳에서 받은 파일이든 태블릿에 내려받은 뒤 예배 리더에서 열 수 있습니다.</p>
      </div>

      <div className="spacer" />

      <div className="card">
        <h2>예배 전에 이렇게 사용하세요</h2>
        <p>1. 사용할 설교문을 태블릿에 내려받습니다.</p>
        <p>2. 예배 리더에서 파일을 한 번 열어 보관함에 저장합니다.</p>
        <p>3. 글자 크기, 줄 간격, 여백을 읽으면서 맞춥니다.</p>
        <p>4. 예배 직전 처음 위치로 이동하고 예배 모드를 켭니다.</p>
        <p>5. 인터넷이 끊겨도 보관함에 저장된 자료는 계속 읽을 수 있습니다.</p>
      </div>
    </section>
  </>;
}
