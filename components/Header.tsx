import Link from "next/link";

const nav = [
  ["교회소개", "/church"], ["예배안내", "/worship"], ["설교", "/sermons"],
  ["주보", "/bulletin"], ["교회소식", "/news"], ["오시는 길", "/location"]
];

export default function Header({ churchName }: { churchName: string }) {
  return <header className="header">
    <div className="header-inner">
      <Link className="brand" href="/">{churchName}</Link>
      <nav className="nav">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    </div>
  </header>;
}
