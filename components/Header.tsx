import Link from "next/link";

const nav = [
  ["교회소개", "/church"], ["예배안내", "/worship"], ["설교", "/sermons"],
  ["주보", "/bulletin"], ["교회소식", "/news"], ["오시는 길", "/location"]
];

export default function Header({ churchName }: { churchName: string }) {
  return <header className="header">
    <div className="header-inner">
      <Link className="brand brand-logo" href="/" aria-label={`${churchName} 홈`}>
        <img src="/images/seojae-header-logo.png" alt="대한예수교장로회 서재교회" />
      </Link>
      <nav className="nav" aria-label="주요 메뉴">
        {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </div>
  </header>;
}
