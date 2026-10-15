"use client";
import {useState} from "react";

export default function AccountCopy(){
 const [copied,setCopied]=useState(false);
 const copy=async()=>{
  const value="110-280-277516";
  try{
   await navigator.clipboard.writeText(value);
  }catch{
   const el=document.createElement("textarea");
   el.value=value;document.body.appendChild(el);el.select();
   document.execCommand("copy");document.body.removeChild(el);
  }
  setCopied(true);window.setTimeout(()=>setCopied(false),2300);
 };
 return <button type="button" onClick={copy} className="inv26-account" style={{width:"100%",cursor:"pointer",borderLeft:0,borderRight:0,borderBottom:0,fontFamily:"inherit"}}>
 <span>계좌 안내</span><span style={{opacity:.5}}> | </span><b>신한은행 110-280-277516</b><span>예금주 천길진</span><span style={{fontSize:11,color:"#4884b3"}}>{copied?"복사 완료 ✓":"눌러서 복사"}</span>
 </button>
}
