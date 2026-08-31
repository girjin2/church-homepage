"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "../../../lib/supabase";

export default function CommunityLogin(){
  const router=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  async function login(e:FormEvent){
    e.preventDefault(); const sb=getBrowserClient(); if(!sb)return;
    setBusy(true); const {error}=await sb.auth.signInWithPassword({email,password});
    if(error){setMsg("로그인 실패: "+error.message);setBusy(false);return;}
    router.push("/community"); router.refresh();
  }
  return <div className="wrap" style={{maxWidth:620,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">COMMUNITY LOGIN</div><h1>소통공간 로그인</h1><p className="section-lead">승인된 회원은 로그인 후 게시판을 이용할 수 있습니다.</p><form className="form" onSubmit={login}><input type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn" disabled={busy}>{busy?"로그인 중...":"로그인"}</button></form>{msg&&<div className="status" style={{marginTop:16}}>{msg}</div>}<div className="spacer"/><p className="small">아직 회원이 아니신가요? <Link className="more-link" href="/community/signup">회원가입</Link></p></section></div>;
}
