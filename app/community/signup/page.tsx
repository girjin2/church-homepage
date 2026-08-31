"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getBrowserClient } from "../../../lib/supabase";

export default function CommunitySignup(){
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");
  const [busy,setBusy]=useState(false);

  async function signup(e:FormEvent){
    e.preventDefault();
    const sb=getBrowserClient();
    if(!sb)return;
    setBusy(true);setMsg("");
    const cleanPhone=phone.replace(/\D/g,"");
    if(cleanPhone.length<10||cleanPhone.length>11){setMsg("연락처를 정확히 입력해 주세요.");setBusy(false);return;}
    const {data,error}=await sb.functions.invoke("community-signup",{body:{name,phone:cleanPhone,email,password}});
    if(error){setMsg("가입 실패: "+error.message);setBusy(false);return;}
    if(data?.error){setMsg("가입 실패: "+data.error);setBusy(false);return;}
    setMsg(data?.message||"가입 신청이 접수되었습니다. 관리자 승인 후 로그인해 주세요.");
    setBusy(false);
  }

  return <div className="wrap" style={{maxWidth:620,paddingTop:56,paddingBottom:70}}><section className="card">
    <div className="mini-label">COMMUNITY SIGN UP</div>
    <h1>회원가입</h1>
    <p className="section-lead">이메일이 없어도 가입할 수 있습니다. 연락처는 로그인과 회원 확인을 위해 반드시 입력해 주세요.</p>
    <form className="form" onSubmit={signup}>
      <input placeholder="이름" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/>
      <input inputMode="tel" placeholder="연락처 예: 01012345678" value={phone} onChange={e=>setPhone(e.target.value)} required/>
      <input type="email" placeholder="이메일 선택사항" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="비밀번호 6자 이상" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}/>
      <button className="btn" disabled={busy}>{busy?"가입 중...":"회원가입"}</button>
    </form>
    {msg&&<div className="status" style={{marginTop:16}}>{msg}</div>}
    <div className="spacer"/>
    <p className="small">이미 가입하셨나요? <Link className="more-link" href="/community/login">로그인</Link></p>
  </section></div>;
}
