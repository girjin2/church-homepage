export default function Footer({ settings }: { settings: any }) {
  return <footer className="footer">
    <div><strong>{settings.church_name}</strong></div>
    <div>{settings.address}</div>
    <div>{settings.phone}</div>
    <div className="muted">© {new Date().getFullYear()} {settings.church_name}. All rights reserved.</div>
  </footer>;
}
