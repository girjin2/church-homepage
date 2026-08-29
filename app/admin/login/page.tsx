"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "../../../lib/supabase";

export default function AdminLogin(){
  const router=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState("");
  async function login(e:FormEvent){e.preventDefault(); const sb=getBrowserClient(); if(!sb){setMsg("Supabase가 아직 연결되지 않았습니다. .env.local을 설정해 주세요.");return;} const {error}=await sb.auth.signInWithPassword({email,password}); if(error){setMsg("로그인 실패: "+error.message);return;} router.push("/admin"); router.refresh();}
  return <div className="admin-shell"><div className="card" style={{maxWidth:520,margin:"70px auto"}}><h1>관리자 로그인</h1><p className="section-lead">등록된 관리자 이메일과 비밀번호를 입력하세요.</p><form className="form" onSubmit={login}><input type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="비밀번호" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="btn" type="submit">로그인</button>{msg&&<div className="status">{msg}</div>}</form></div></div>
}
