"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { getBrowserClient } from "../../lib/supabase";

export default function Community(){
  const [ready,setReady]=useState(false); const [session,setSession]=useState<any>(null); const [profile,setProfile]=useState<any>(null); const [posts,setPosts]=useState<any[]>([]); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);

  async function loadPosts(sb:any){
    const {data,error}=await sb.from("community_posts").select("id,author_id,author_name,title,body,created_at").order("created_at",{ascending:false}).limit(100);
    if(error)setMsg(error.message); else setPosts(data||[]);
  }

  useEffect(()=>{(async()=>{
    const sb=getBrowserClient(); if(!sb){setReady(true);return;}
    const {data:{session:s}}=await sb.auth.getSession(); setSession(s);
    if(!s){setReady(true);return;}
    const {data:p}=await sb.from("member_profiles").select("display_name,approved,role").eq("id",s.user.id).maybeSingle(); setProfile(p);
    if(p?.approved)await loadPosts(sb);
    setReady(true);
  })();},[]);

  async function addPost(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); const sb=getBrowserClient(); if(!sb||!session)return;
    setBusy(true); const form=e.currentTarget; const f=new FormData(form);
    const {error}=await sb.from("community_posts").insert({author_id:session.user.id,title:String(f.get("title")||"").trim(),body:String(f.get("body")||"").trim()});
    setMsg(error?error.message:"글을 등록했습니다."); if(!error){form.reset();await loadPosts(sb);} setBusy(false);
  }

  async function delPost(id:number){
    if(!confirm("이 글을 삭제하시겠습니까?"))return; const sb=getBrowserClient(); if(!sb)return;
    setBusy(true); const {error}=await sb.from("community_posts").delete().eq("id",id); setMsg(error?error.message:"글을 삭제했습니다."); if(!error)await loadPosts(sb); setBusy(false);
  }

  async function logout(){const sb=getBrowserClient();if(sb)await sb.auth.signOut();location.href="/community";}

  if(!ready)return <div className="wrap" style={{paddingTop:50}}>소통공간을 확인하고 있습니다.</div>;

  if(!session)return <div className="wrap" style={{maxWidth:760,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">COMMUNITY</div><h1>소통공간</h1><p className="section-lead">서재교회 교우들이 함께 소식을 나누는 공간입니다. 회원가입 후 관리자 승인을 받으면 이용할 수 있습니다.</p><div className="actions"><Link className="btn" href="/community/login">로그인</Link><Link className="btn light" href="/community/signup">회원가입</Link></div></section></div>;

  if(!profile?.approved)return <div className="wrap" style={{maxWidth:760,paddingTop:56,paddingBottom:70}}><section className="card"><div className="mini-label">WAITING APPROVAL</div><h1>승인 대기 중입니다</h1><p className="section-lead">회원가입은 완료되었습니다. 관리자가 승인하면 소통공간 글을 읽고 작성할 수 있습니다.</p><div className="actions"><button className="btn light" onClick={logout}>로그아웃</button></div></section></div>;

  return <div className="wrap" style={{paddingTop:46,paddingBottom:70}}>
    <div className="section-row public-section-row"><div><div className="mini-label">COMMUNITY</div><h1>소통공간</h1><p className="section-lead">{profile.display_name||"회원"}님, 함께 소식을 나누세요.</p></div><button className="btn light" onClick={logout}>로그아웃</button></div>
    {msg&&<div className="status" style={{marginBottom:18}}>{msg}</div>}
    <section className="card"><h2>글쓰기</h2><form className="form" onSubmit={addPost}><input name="title" placeholder="제목" maxLength={120} required/><textarea name="body" placeholder="내용" maxLength={5000} required rows={6}/><button className="btn" disabled={busy}>{busy?"등록 중...":"글 등록"}</button></form></section>
    <div className="spacer"/>
    <section><div className="section-row public-section-row"><h2 className="section-title">게시글</h2><span className="meta">{posts.length}개</span></div>{posts.length?<div className="list">{posts.map(p=><article className="card" key={p.id}><div className="section-row"><div><h3 style={{marginBottom:6}}>{p.title}</h3><div className="meta">{p.author_name||"회원"} · {new Date(p.created_at).toLocaleString("ko-KR")}</div></div>{(p.author_id===session.user.id||profile.role==="admin")&&<button className="btn danger compact" disabled={busy} onClick={()=>delPost(p.id)}>삭제</button>}</div><p style={{whiteSpace:"pre-wrap",marginTop:14}}>{p.body}</p></article>)}</div>:<div className="card empty-state">아직 등록된 글이 없습니다.</div>}</section>
  </div>;
}
