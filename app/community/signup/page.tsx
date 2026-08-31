"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getBrowserClient } from "../../../lib/supabase";

export default function CommunitySignup(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  async function signup(e:FormEvent){
    e.preventDefault(); const sb=getBrowserClient(); if(!sb)return;
    setBusy(true); setMsg("");
    const {data,error}=await sb.auth.signUp({email,password,options:{data:{display_name:name}}});
    if(error)setMsg("가입 실패: "+error.message);
    else if(data.session)setMsg("가입되었습니다. 관리자 승인 후 소통공간을 사용할 수 있습니다.");
    else setMsg("가입 신청이 접수되었습니다. 이메일 확인이 필요하면 먼저 이메일을 확인한 뒤 관리자 승인을 기다려 주세요.");
    setBusy(false);
  }
  return <div className="wrap" style={{maxWidth:620,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">COMMUNITY SIGN UP</div><h1>회원가입</h1><p className="section-lead">가입 후 관리자 승인을 받으면 소통공간을 이용할 수 있습니다.</p><form className="form" onSubmit={signup}><input placeholder="이름" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/><input type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="비밀번호 6자 이상" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}/><button className="btn" disabled={busy}>{busy?"가입 중...":"회원가입"}</button></form>{msg&&<div className="status" style={{marginTop:16}}>{msg}</div>}<div className="spacer"/><p className="small">이미 가입하셨나요? <Link className="more-link" href="/community/login">로그인</Link></p></section></div>;
}
