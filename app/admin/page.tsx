"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "../../lib/supabase";

const blankSettings:any={church_name:"",slogan:"",pastor_name:"",associate_pastor:"",elder_name:"",denomination:"",founded_date:"",hero_title:"",hero_text:"",address:"",phone:"",youtube_url:"",map_url:"",sunday_service:"",sunday_afternoon_service:"",sunday_school_service:"",youth_service:"",wednesday_service:"",friday_service:"",dawn_service:"",bus_routes:""};
const today = () => new Date().toISOString().slice(0,10);
const daysAgo = (days:number) => { const d=new Date(); d.setDate(d.getDate()-days); return d.toISOString().slice(0,10); };

const CHURCH_IMAGE_BUCKET = "교회 이미지";
const MAX_SOURCE_IMAGE_BYTES = 25 * 1024 * 1024;

async function compressForHomepage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/")) throw new Error("사진 파일만 선택해 주세요.");
  if (file.size > MAX_SOURCE_IMAGE_BYTES) throw new Error("원본 사진은 25MB 이하로 선택해 주세요.");
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("사진을 읽을 수 없습니다."));
      img.src = objectUrl;
    });
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("사진 압축을 시작할 수 없습니다.");
    ctx.drawImage(image, 0, 0, width, height);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("사진 압축에 실패했습니다.")), "image/webp", 0.82);
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function Admin(){
 const router=useRouter();
 const [ready,setReady]=useState(false); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
 const [settings,setSettings]=useState<any>(blankSettings); const [sermons,setSermons]=useState<any[]>([]); const [notices,setNotices]=useState<any[]>([]); const [bulletins,setBulletins]=useState<any[]>([]); const [photos,setPhotos]=useState<any[]>([]);
 const [tab,setTab]=useState<"dashboard"|"settings"|"sermons"|"notices"|"bulletins">("dashboard");
 const sb=getBrowserClient();

 useEffect(()=>{(async()=>{if(!sb){setMsg("Supabase 환경변수가 없습니다. DEPLOY_GUIDE_KO.md를 확인하세요.");setReady(true);return;} const {data:{session}}=await sb.auth.getSession(); if(!session){router.replace("/admin/login");return;} await load(); setReady(true);})();},[]);

 async function load(){if(!sb)return; const [a,b,c,d,e]=await Promise.all([
   sb.from("site_settings").select("*").eq("id",1).maybeSingle(),
   sb.from("sermons").select("*").order("service_date",{ascending:false}),
   sb.from("notices").select("*").order("published_at",{ascending:false}),
   sb.from("bulletins").select("*").order("service_date",{ascending:false}),
   sb.storage.from(CHURCH_IMAGE_BUCKET).list("photos",{limit:100,sortBy:{column:"created_at",order:"desc"}})
 ]); if(a.data)setSettings({...blankSettings,...a.data}); setSermons(b.data||[]);setNotices(c.data||[]);setBulletins(d.data||[]);setPhotos(e.data||[]);}

 const oldNoticeCutoff=daysAgo(30);
 const recentNotices=useMemo(()=>notices.filter(x=>!x.published_at||x.published_at>=oldNoticeCutoff),[notices,oldNoticeCutoff]);
 const pastNotices=useMemo(()=>notices.filter(x=>x.published_at&&x.published_at<oldNoticeCutoff),[notices,oldNoticeCutoff]);
 const recentBulletins=useMemo(()=>bulletins.slice(0,8),[bulletins]);
 const pastBulletins=useMemo(()=>bulletins.slice(8),[bulletins]);
 const recentSermons=useMemo(()=>sermons.slice(0,12),[sermons]);
 const pastSermons=useMemo(()=>sermons.slice(12),[sermons]);

 async function saveSettings(e:FormEvent){e.preventDefault();if(!sb)return;setBusy(true);const {error}=await sb.from("site_settings").upsert({id:1,...settings,updated_at:new Date().toISOString()});setMsg(error?error.message:"교회 기본정보를 저장했습니다.");setBusy(false);}

 async function addSermon(e:FormEvent<HTMLFormElement>){e.preventDefault();if(!sb)return;setBusy(true);const form=e.currentTarget;const f=new FormData(form);const row={title:f.get("title"),scripture:f.get("scripture"),preacher:f.get("preacher"),youtube_url:f.get("youtube_url")||"",service_date:f.get("service_date")};const {error}=await sb.from("sermons").insert(row);setMsg(error?error.message:"설교를 등록했습니다.");if(!error){form.reset();await load();}setBusy(false);}

 async function addNotice(e:FormEvent<HTMLFormElement>){
   e.preventDefault(); if(!sb)return; setBusy(true);
   const form=e.currentTarget; const f=new FormData(form);
   const row={title:f.get("title"),body:f.get("body"),published_at:f.get("published_at")};
   const {error}=await sb.from("notices").insert(row);
   setMsg(error?error.message:"광고를 등록했습니다."); if(!error){form.reset();await load();} setBusy(false);
 }

 async function listAllPhotos(){
   if(!sb)return [] as any[]; const all:any[]=[]; let offset=0;
   while(true){const r=await sb.storage.from(CHURCH_IMAGE_BUCKET).list("photos",{limit:100,offset,sortBy:{column:"created_at",order:"asc"}}); if(r.error)throw r.error; const rows=r.data||[]; all.push(...rows); if(rows.length<100)break; offset+=rows.length;}
   return all;
 }

 async function cleanupPhotoStorage(){
   if(!sb)return 0; const LIMIT=500*1024*1024; const TARGET=450*1024*1024; const rows=await listAllPhotos();
   let total=rows.reduce((n,x)=>n+Number(x.metadata?.size||0),0); if(total<=LIMIT)return 0;
   const remove:string[]=[]; for(const x of rows){if(total<=TARGET)break; remove.push(`photos/${x.name}`); total-=Number(x.metadata?.size||0);}
   if(remove.length){const r=await sb.storage.from(CHURCH_IMAGE_BUCKET).remove(remove); if(r.error)throw r.error;} return remove.length;
 }

 async function addPhoto(e:FormEvent<HTMLFormElement>){
   e.preventDefault(); if(!sb)return; setBusy(true); setMsg("사진을 압축하고 있습니다.");
   const form=e.currentTarget; const f=new FormData(form); const image=f.get("image") as File; const date=String(f.get("photo_date")||today());
   if(!image?.size){setMsg("사진을 선택해 주세요.");setBusy(false);return;}
   try{const compressed=await compressForHomepage(image); const path=`photos/${date}__${Date.now()}.webp`;
     const up=await sb.storage.from(CHURCH_IMAGE_BUCKET).upload(path,compressed,{contentType:"image/webp",upsert:false,cacheControl:"3600"}); if(up.error)throw up.error;
     const removed=await cleanupPhotoStorage(); setMsg(`사진을 ${(compressed.size/1024).toFixed(0)}KB로 압축해 등록했습니다.${removed?` 오래된 사진 ${removed}개를 자동 정리했습니다.`:""}`); form.reset(); await load();
   }catch(err:any){setMsg(`사진 등록에 실패했습니다. ${err?.message||err}`);} setBusy(false);
 }

 async function delPhoto(name:string){
   if(!sb||!confirm("이 사진을 삭제하시겠습니까?"))return; setBusy(true); const r=await sb.storage.from(CHURCH_IMAGE_BUCKET).remove([`photos/${name}`]); setMsg(r.error?r.error.message:"사진을 삭제했습니다."); if(!r.error)await load(); setBusy(false);
 }

 async function addBulletin(e:FormEvent<HTMLFormElement>){
   e.preventDefault(); if(!sb)return; setBusy(true); const form=e.currentTarget; const f=new FormData(form); const file=f.get("file") as File; const serviceDate=String(f.get("service_date")||""); const title=String(f.get("title")||"");
   if(!file?.size){setMsg("주보 파일을 선택해 주세요.");setBusy(false);return;}
   const ext=(file.name.split(".").pop()||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf";
   const path=`${serviceDate}.${ext}`;
   const existing=bulletins.filter(x=>x.service_date===serviceDate);
   const oldPaths=[...new Set(existing.map(x=>x.storage_path).filter(Boolean))] as string[];
   const up=await sb.storage.from("bulletins").upload(path,file,{contentType:file.type||undefined,upsert:true});
   if(up.error){setMsg(up.error.message);setBusy(false);return;}
   const obsolete=oldPaths.filter(p=>p!==path); if(obsolete.length) await sb.storage.from("bulletins").remove(obsolete);
   const {data:url}=sb.storage.from("bulletins").getPublicUrl(path);
   let error:any=null;
   if(existing.length){
     const keep=existing[0];
     const r=await sb.from("bulletins").update({title,service_date:serviceDate,file_url:url.publicUrl,storage_path:path}).eq("id",keep.id); error=r.error;
     const duplicateIds=existing.slice(1).map(x=>x.id); if(!error&&duplicateIds.length) await sb.from("bulletins").delete().in("id",duplicateIds);
   } else {
     const r=await sb.from("bulletins").insert({title,service_date:serviceDate,file_url:url.publicUrl,storage_path:path}); error=r.error;
   }
   setMsg(error?error.message:`${serviceDate} 주보를 저장했습니다. 같은 날짜 주보는 자동으로 교체됩니다.`); if(!error){form.reset();await load();} setBusy(false);
 }

 async function del(table:string,id:number,storagePath?:string){
   if(!sb||!confirm("정말 삭제하시겠습니까? 삭제한 자료는 복구할 수 없습니다."))return; setBusy(true);
   if(table==="notices") await sb.storage.from(CHURCH_IMAGE_BUCKET).remove([`${id}.webp`]);
   if(storagePath) await sb.storage.from("bulletins").remove([storagePath]);
   const {error}=await sb.from(table).delete().eq("id",id); setMsg(error?error.message:"삭제했습니다."); if(!error)await load(); setBusy(false);
 }

 async function clearPastNotices(){
   if(!sb||!pastNotices.length)return; if(!confirm(`30일이 지난 광고 ${pastNotices.length}개를 모두 삭제하시겠습니까?`))return; setBusy(true);
   const ids=pastNotices.map(x=>x.id); const paths=ids.map(id=>`${id}.webp`); if(paths.length) await sb.storage.from(CHURCH_IMAGE_BUCKET).remove(paths);
   const {error}=await sb.from("notices").delete().in("id",ids); setMsg(error?error.message:`지난 광고 ${ids.length}개를 정리했습니다.`); if(!error)await load(); setBusy(false);
 }

 async function logout(){if(sb)await sb.auth.signOut();router.push("/admin/login");}
 if(!ready)return <div className="admin-shell">관리자 정보를 확인하고 있습니다.</div>;

 const nav=[
   ["dashboard","관리 현황"],["settings","교회 기본정보"],["sermons",`설교 ${sermons.length}`],["notices",`교회소식 ${notices.length}`],["bulletins",`주보 ${bulletins.length}`]
 ] as const;

 return <div className="admin-shell">
   <div className="admin-head"><div><div className="mini-label">SEOJAE CHURCH ADMIN</div><h1>홈페이지 관리자</h1><p className="section-lead">매주 사용하는 자료만 빠르게 등록하고, 지난 자료는 깔끔하게 정리합니다.</p></div><button className="btn danger" onClick={logout}>로그아웃</button></div>
   {msg&&<div className="status">{msg}</div>}
   <div className="tabs admin-tabs">{nav.map(([key,label])=><button key={key} className={`tab ${tab===key?"active":""}`} onClick={()=>setTab(key as any)}>{label}</button>)}</div>

   {tab==="dashboard"&&<>
     <div className="admin-summary">
       <button className="summary-card" onClick={()=>setTab("sermons")}><span>설교</span><strong>{sermons.length}</strong><small>최근 12개 우선 관리</small></button>
       <button className="summary-card" onClick={()=>setTab("notices")}><span>교회소식</span><strong>{recentNotices.length + photos.length}</strong><small>광고 {recentNotices.length} · 사진 {photos.length}</small></button>
       <button className="summary-card" onClick={()=>setTab("bulletins")}><span>주보</span><strong>{bulletins.length}</strong><small>최근 8주 우선 표시</small></button>
     </div>
     <div className="spacer"/>
     <section className="card clean-panel"><div><div className="mini-label">CLEANUP</div><h2>지난 자료 정리</h2><p>광고와 사진만 간단히 관리합니다. 사진은 자동 압축되고 500MB를 넘으면 오래된 사진부터 자동 정리됩니다.</p></div><button className="btn danger" disabled={!pastNotices.length||busy} onClick={clearPastNotices}>지난 광고 {pastNotices.length}개 일괄 삭제</button></section>
   </>}

   {tab==="settings"&&<section className="card"><h2>교회 기본정보</h2><form className="form" onSubmit={saveSettings}>{Object.entries({church_name:"교회 이름",slogan:"교회 표어",pastor_name:"담임목사",associate_pastor:"부목사",elder_name:"장로",denomination:"교단",founded_date:"설립일",hero_title:"메인 제목",hero_text:"메인 설명",address:"주소",phone:"전화번호",youtube_url:"YouTube 주소",map_url:"지도 주소",sunday_service:"주일 1부예배",sunday_afternoon_service:"주일 오후예배",sunday_school_service:"주일학교",youth_service:"중고등부",wednesday_service:"수요예배",friday_service:"금요예배",dawn_service:"새벽예배",bus_routes:"버스 노선"}).map(([k,label])=><label key={k}>{label}<input value={settings[k]||""} onChange={e=>setSettings({...settings,[k]:e.target.value})}/></label>)}<button className="btn" disabled={busy} type="submit">기본정보 저장</button></form></section>}

   {tab==="sermons"&&<><section className="card"><h2>설교 등록</h2><form className="form" onSubmit={addSermon}><input name="title" placeholder="설교 제목" required/><input name="scripture" placeholder="본문 예: 요한복음 3:16" required/><input name="preacher" placeholder="설교자" required/><input name="youtube_url" type="url" placeholder="YouTube 영상 주소 (없으면 비워도 됩니다)"/><input name="service_date" type="date" defaultValue={today()} required/><button className="btn" disabled={busy}>설교 등록</button></form></section><div className="spacer"/><DataSection title="최근 설교" rows={recentSermons} dateKey="service_date" onDelete={(x:any)=>del("sermons",x.id)}/>{pastSermons.length>0&&<><div className="spacer"/><DataSection title="지난 설교" rows={pastSermons} dateKey="service_date" onDelete={(x:any)=>del("sermons",x.id)}/></>}</>}

   {tab==="notices"&&<>
     <section className="card"><h2>교회소식</h2><p className="small">복잡하게 나누지 않고 <strong>광고</strong>와 <strong>사진</strong> 두 가지만 관리합니다.</p></section>
     <div className="spacer"/>
     <section className="card"><h2>광고 등록</h2><form className="form" onSubmit={addNotice}><input name="title" placeholder="광고 제목" required/><textarea name="body" placeholder="광고 내용" required/><input name="published_at" type="date" defaultValue={today()} required/><button className="btn" disabled={busy}>광고 등록</button></form></section>
     <div className="spacer"/>
     <section className="card"><h2>사진 등록</h2><p className="small">휴대폰 사진을 선택하면 최대 1600px, WebP로 자동 압축합니다. 사진 폴더가 500MB를 넘으면 오래된 사진부터 삭제해 약 450MB로 정리합니다.</p><form className="form" onSubmit={addPhoto}><input name="photo_date" type="date" defaultValue={today()} required/><input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" required/><button className="btn" disabled={busy}>사진 등록</button></form></section>
     <div className="spacer"/>
     <DataSection title="최근 광고" rows={recentNotices} dateKey="published_at" onDelete={(x:any)=>del("notices",x.id)}/>
     <div className="spacer"/>
     <section className="card"><h2>최근 사진</h2>{photos.length?<div className="list">{photos.map((x:any)=><div className="list-row admin-row" key={x.name}><div><strong>{String(x.name).split("__")[0]}</strong><div className="meta">{Math.round(Number(x.metadata?.size||0)/1024)}KB</div></div><button className="btn danger compact" onClick={()=>delPhoto(x.name)}>삭제</button></div>)}</div>:<div className="empty-state">등록된 사진이 없습니다.</div>}</section>
     {pastNotices.length>0&&<><div className="spacer"/><section className="card"><div className="section-row"><div><h2>지난 광고</h2><p className="small">30일이 지난 광고입니다.</p></div><button className="btn danger" disabled={busy} onClick={clearPastNotices}>모두 삭제</button></div><DataRows rows={pastNotices} dateKey="published_at" onDelete={(x:any)=>del("notices",x.id)}/></section></>}
   </>}

   {tab==="bulletins"&&<><section className="card"><h2>주보 등록 또는 교체</h2><p className="small">같은 날짜의 주보를 다시 올리면 기존 주보를 자동으로 교체하고 중복 항목을 만들지 않습니다.</p><form className="form" onSubmit={addBulletin}><input name="title" placeholder="예: 2026년 8월 30일 주보" required/><input name="service_date" type="date" defaultValue={today()} required/><input name="file" type="file" accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" required/><button className="btn" disabled={busy}>주보 업로드</button></form></section><div className="spacer"/><DataSection title="최근 주보" rows={recentBulletins} dateKey="service_date" onDelete={(x:any)=>del("bulletins",x.id,x.storage_path)}/>{pastBulletins.length>0&&<><div className="spacer"/><DataSection title="지난 주보" rows={pastBulletins} dateKey="service_date" onDelete={(x:any)=>del("bulletins",x.id,x.storage_path)}/></>}</>}
 </div>;
}

function DataSection({title,rows,dateKey,onDelete}:{title:string,rows:any[],dateKey:string,onDelete:(x:any)=>void}){
 return <section className="card"><h2>{title}</h2><DataRows rows={rows} dateKey={dateKey} onDelete={onDelete}/></section>;
}
function DataRows({rows,dateKey,onDelete}:{rows:any[],dateKey:string,onDelete:(x:any)=>void}){
 if(!rows.length)return <div className="empty-state">등록된 자료가 없습니다.</div>;
 return <div className="list">{rows.map(x=><div className="list-row admin-row" key={x.id}><div><strong>{x.title}</strong><div className="meta">{x[dateKey]}{x.scripture?` · ${x.scripture}`:""}</div></div><button className="btn danger compact" onClick={()=>onDelete(x)}>삭제</button></div>)}</div>;
}
