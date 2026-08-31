"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "../../../lib/supabase";

export default function CommunityLogin(){
  const router=useRouter();
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");
  const [busy,setBusy]=useState(false);

  async function login(e:FormEvent){
    e.preventDefault();
    const sb=getBrowserClient();
    if(!sb)return;
    const cleanPhone=phone.replace(/\D/g,"");
    if(cleanPhone.length<10||cleanPhone.length>11){setMsg("연락처를 정확히 입력해 주세요.");return;}
    setBusy(true);setMsg("");
    const internalEmail=`member-${cleanPhone}@members.seojae.local`;
    const {error}=await sb.auth.signInWithPassword({email:internalEmail,password});
    if(error){setMsg("로그인에 실패했습니다. 연락처와 비밀번호를 확인해 주세요.");setBusy(false);return;}
    router.push("/community");router.refresh();
  }

  return <div className="wrap" style={{maxWidth:620,paddingTop:56,paddingBottom:70}}><section className="card">
    <div className="mini-label">COMMUNITY LOGIN</div>
    <h1>소통공간 로그인</h1>
    <p className="section-lead">관리자 승인을 받은 회원은 연락처와 비밀번호로 로그인할 수 있습니다. 한 번 로그인하면 로그인 상태가 자동으로 유지됩니다.</p>
    <form className="form" onSubmit={login}>
      <input inputMode="tel" autoComplete="tel" placeholder="연락처 예: 01012345678" value={phone} onChange={e=>setPhone(e.target.value)} required/>
      <input type="password" autoComplete="current-password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button className="btn" disabled={busy}>{busy?"로그인 중...":"로그인"}</button>
    </form>
    {msg&&<div className="status" style={{marginTop:16}}>{msg}</div>}
    <div className="spacer"/>
    <p className="small">아직 회원이 아니신가요? <Link className="more-link" href="/community/signup">회원가입</Link></p>
  </section></div>;
}
