"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBrowserClient } from "../../lib/supabase";

export default function Album(){
  const [ready,setReady]=useState(false);
  const [session,setSession]=useState<any>(null);
  const [profile,setProfile]=useState<any>(null);
  const [photos,setPhotos]=useState<any[]>([]);
  const [msg,setMsg]=useState("");

  useEffect(()=>{(async()=>{
    const sb=getBrowserClient();
    if(!sb){setReady(true);return;}
    const {data:{session:s}}=await sb.auth.getSession();
    setSession(s);
    if(!s){setReady(true);return;}
    const {data:p}=await sb.from("member_profiles").select("display_name,approved,role").eq("id",s.user.id).maybeSingle();
    setProfile(p);
    if(!p?.approved){setReady(true);return;}

    const list=await sb.storage.from("church-images").list("photos",{limit:100,sortBy:{column:"created_at",order:"desc"}});
    if(list.error){setMsg(list.error.message);setReady(true);return;}
    const rows=await Promise.all((list.data||[]).map(async(x:any)=>{
      const path=`photos/${x.name}`;
      const signed=await sb.storage.from("church-images").createSignedUrl(path,3600);
      return {...x,url:signed.data?.signedUrl||""};
    }));
    setPhotos(rows.filter(x=>x.url));
    setReady(true);
  })();},[]);

  async function logout(){const sb=getBrowserClient();if(sb)await sb.auth.signOut();location.href="/album";}

  if(!ready)return <div className="wrap" style={{paddingTop:50}}>교회앨범을 확인하고 있습니다.</div>;

  if(!session)return <div className="wrap" style={{maxWidth:760,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">CHURCH ALBUM</div><h1>교회앨범</h1><p className="section-lead">교회앨범은 교우들의 사진을 함께 나누는 회원전용 공간입니다. 로그인 후 확인할 수 있습니다.</p><div className="actions"><Link className="btn" href="/community/login">로그인</Link><Link className="btn light" href="/community/signup">회원가입</Link></div></section></div>;

  if(!profile?.approved)return <div className="wrap" style={{maxWidth:760,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">CHURCH ALBUM</div><h1>승인 대기 중입니다</h1><p className="section-lead">관리자 승인 후 교회앨범을 볼 수 있습니다.</p><div className="actions"><button className="btn light" onClick={logout}>로그아웃</button></div></section></div>;

  return <div className="wrap" style={{paddingTop:46,paddingBottom:70}}>
    <div className="section-row public-section-row"><div><div className="mini-label">CHURCH ALBUM</div><h1>교회앨범</h1><p className="section-lead">함께한 예배와 교제의 순간을 나눕니다.</p></div><button className="btn light" onClick={logout}>로그아웃</button></div>
    {msg&&<div className="status" style={{marginBottom:18}}>{msg}</div>}
    {photos.length?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>{photos.map((p:any)=>{
      const date=String(p.name).split("__")[0];
      return <figure className="card" style={{padding:0,overflow:"hidden",margin:0}} key={p.name}><img src={p.url} alt={`서재교회 ${date} 사진`} loading="lazy" style={{display:"block",width:"100%",aspectRatio:"4 / 3",objectFit:"cover"}}/><figcaption className="meta" style={{padding:"11px 14px"}}>{date}</figcaption></figure>;
    })}</div>:<div className="card empty-state">등록된 사진이 없습니다.</div>}
  </div>;
}
