"use client";

import { useEffect, useState } from "react";
import { getBrowserClient } from "../../../lib/supabase";

export default function AdminMembers(){
  const [rows,setRows]=useState<any[]>([]);
  const [msg,setMsg]=useState("");
  const [busy,setBusy]=useState(false);

  async function load(){
    const sb=getBrowserClient(); if(!sb)return;
    const {data,error}=await sb.from("member_profiles").select("id,display_name,contact_phone,contact_email,approved,role,created_at,approved_at").order("created_at",{ascending:false});
    if(error)setMsg(error.message); else setRows(data||[]);
  }

  useEffect(()=>{load();},[]);

  async function setApproval(id:string,approved:boolean){
    const sb=getBrowserClient(); if(!sb)return;
    setBusy(true);
    const {error}=await sb.from("member_profiles").update({approved,approved_at:approved?new Date().toISOString():null}).eq("id",id);
    setMsg(error?error.message:(approved?"회원 사용을 승인했습니다.":"회원 승인을 해제했습니다."));
    if(!error)await load();
    setBusy(false);
  }

  const pending=rows.filter(x=>x.role!=="admin"&&!x.approved);
  const approved=rows.filter(x=>x.role!=="admin"&&x.approved);
  const contact=(x:any)=>[x.contact_phone||"연락처 없음",x.contact_email||"이메일 없음"].join(" · ");

  return <div className="admin-shell">
    <div className="admin-head"><div><div className="mini-label">MEMBER APPROVAL</div><h1>회원 승인</h1><p className="section-lead">이름과 연락처를 확인한 뒤 소통공간 사용을 승인합니다. 이메일은 선택사항입니다.</p></div></div>
    {msg&&<div className="status">{msg}</div>}
    <section className="card"><h2>승인 대기 {pending.length}명</h2>{pending.length?<div className="list">{pending.map(x=><div className="list-row admin-row" key={x.id}><div><strong>{x.display_name||"이름 없음"}</strong><div className="meta">{contact(x)}</div><div className="meta">가입 {new Date(x.created_at).toLocaleDateString("ko-KR")}</div></div><button className="btn" disabled={busy} onClick={()=>setApproval(x.id,true)}>승인</button></div>)}</div>:<div className="empty-state">승인 대기 회원이 없습니다.</div>}</section>
    <div className="spacer"/>
    <section className="card"><h2>승인된 회원 {approved.length}명</h2>{approved.length?<div className="list">{approved.map(x=><div className="list-row admin-row" key={x.id}><div><strong>{x.display_name||"이름 없음"}</strong><div className="meta">{contact(x)}</div><div className="meta">승인됨</div></div><button className="btn danger compact" disabled={busy} onClick={()=>setApproval(x.id,false)}>승인 해제</button></div>)}</div>:<div className="empty-state">승인된 일반 회원이 없습니다.</div>}</section>
  </div>;
}
