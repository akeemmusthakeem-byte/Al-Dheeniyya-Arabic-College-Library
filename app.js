"use strict";
/* =========================================================================
   Al Dheeniyya Arabic College — Management System (new functional build)
   Vanilla JS single-page app. Data persists in localStorage.
   ========================================================================= */

/* ---------------- Icons (inline SVG) ---------------- */
const I = {
  dash:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
  students:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  staff:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  att:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  exam:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/></svg>',
  tt:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  lib:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  backup:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>',
  roles:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  settings:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  plus:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>',
  edit:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  trash:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
  search:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  download:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  print:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  book:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  users:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  chart:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',
  alert:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>'
};

/* ---------------- Constants ---------------- */
const CLASSES = ["Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Hifz Class"];
const SUBJECTS = ["Quran","Hifz","Arabic","Islamic Studies","Mathematics","Science","English","Tamil","History","ICT"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const PERIOD_TIMES = ["08:00–08:40","08:40–09:20","09:20–10:00","10:20–11:00","11:00–11:40","11:40–12:20","13:00–13:40","13:40–14:20"];
const MODULES = [
  {key:"dashboard", label:"Dashboard"},
  {key:"students", label:"Students"},
  {key:"staff", label:"Staff"},
  {key:"attendance", label:"Attendance"},
  {key:"exams", label:"Exams & Marks"},
  {key:"timetable", label:"Timetable"},
  {key:"library", label:"Library"},
  {key:"backups", label:"Backups"},
  {key:"roles", label:"Roles & Permissions"},
  {key:"settings", label:"Settings"}
];
const DEFAULT_PERMS = {
  "Super Admin": MODULES.map(m=>m.key),
  "Admin": MODULES.map(m=>m.key).filter(k=>k!=="roles"),
  "Teacher": ["dashboard","students","staff","attendance","exams","timetable","library"],
  "Librarian": ["dashboard","students","library"],
  "Student": ["dashboard","timetable","library","attendance"]
};
const DB_KEY = "aldheeniyya_db_v2";
const SESSION_KEY = "aldheeniyya_session";

/* ---------------- Seed data ---------------- */
function seedDB(){
  const students = [
    ["AD/2024/001","M. A. F. Rizan","Grade 6","2013-04-12","Male","M. A. M. Rizwan","077 123 4567","Panadura"],
    ["AD/2024/002","F. S. N. Ayesha","Grade 6","2013-08-03","Female","F. M. Siraj","077 234 5678","Panadura"],
    ["AD/2024/003","A. M. H. Shameel","Grade 7","2012-02-19","Male","A. M. Hanifa","077 345 6789","Pallimulla"],
    ["AD/2024/004","S. F. R. Nusrath","Grade 7","2012-11-27","Female","S. M. Farook","077 456 7890","Panadura"],
    ["AD/2024/005","K. M. I. Faizan","Grade 8","2011-06-15","Male","K. M. Ibrahim","077 567 8901","Pallimulla"],
    ["AD/2024/006","R. A. F. Shifana","Grade 8","2011-09-30","Female","R. M. Ashroff","077 678 9012","Panadura"],
    ["AD/2024/007","M. S. M. Hisham","Grade 9","2010-01-22","Male","M. S. M. Hameed","077 789 0123","Pallimulla"],
    ["AD/2024/008","N. M. F. Amina","Grade 9","2010-05-08","Female","N. M. Nazeer","077 890 1234","Panadura"],
    ["AD/2024/009","Z. A. M. Rizwan","Grade 10","2009-03-14","Male","Z. A. M. Zameer","077 901 2345","Panadura"],
    ["AD/2024/010","H. F. S. Fathima","Grade 10","2009-07-25","Female","H. M. Fawzan","077 012 3456","Pallimulla"],
    ["AD/2024/011","I. M. S. Aqeel","Grade 11","2008-10-11","Male","I. M. S. Imran","077 123 5678","Panadura"],
    ["AD/2024/012","B. M. R. Khadeeja","Grade 11","2008-12-02","Female","B. M. Rafi","077 234 6789","Pallimulla"],
    ["AD/2024/013","T. M. A. Sufyan","Hifz Class","2011-04-18","Male","T. M. A. Saleem","077 345 7890","Panadura"],
    ["AD/2024/014","U. M. F. Maryam","Hifz Class","2012-01-09","Female","U. M. Fawaz","077 456 8901","Pallimulla"],
    ["AD/2024/015","Y. M. H. Nihal","Grade 6","2013-06-21","Male","Y. M. H. Nazeem","077 567 9012","Panadura"],
    ["AD/2024/016","D. F. S. Rahmath","Grade 6","2013-09-17","Female","D. M. Feroz","077 678 0123","Pallimulla"],
    ["AD/2024/017","G. M. I. Shafran","Grade 7","2012-05-29","Male","G. M. Irfan","077 789 1234","Panadura"],
    ["AD/2024/018","J. M. F. Nisra","Grade 7","2012-08-13","Female","J. M. Jameel","077 890 2345","Pallimulla"],
    ["AD/2024/019","L. M. A. Thasneem","Grade 8","2011-03-07","Male","L. M. Azeez","077 901 3456","Panadura"],
    ["AD/2024/020","O. M. S. Safa","Grade 8","2011-11-23","Female","O. M. Siraj","077 012 4567","Pallimulla"],
    ["AD/2024/021","P. M. R. Ashfaq","Grade 9","2010-07-31","Male","P. M. Rameez","077 123 6789","Panadura"],
    ["AD/2024/022","Q. M. F. Zunaira","Grade 9","2010-02-26","Female","Q. M. Ziyad","077 234 7890","Pallimulla"],
    ["AD/2024/023","V. M. H. Faizal","Grade 10","2009-09-05","Male","V. M. Hisham","077 345 8901","Panadura"],
    ["AD/2024/024","W. M. F. Raheema","Grade 10","2009-04-16","Female","W. M. Rizwan","077 456 9012","Pallimulla"]
  ].map((r,i)=>({id:i+1,admission_no:r[0],name:r[1],class_name:r[2],dob:r[3],gender:r[4],guardian:r[5],guardian_contact:r[6],address:r[7],status:"Active",created_at:"2024-01-10"}));

  const staff = [
    ["ST/001","M. M. M. Faleel","Principal","Administration","Permanent","2015-01-05",CLASSES],
    ["ST/002","A. M. S. Nazeer","Vice Principal","Administration","Permanent","2016-02-01",["Grade 9","Grade 10","Grade 11"]],
    ["ST/003","F. M. R. Shameem","Teacher","Quran & Hifz","Permanent","2017-03-12",["Hifz Class"]],
    ["ST/004","S. M. F. Ayesha","Teacher","Arabic","Permanent","2018-01-15",["Grade 6","Grade 7","Grade 8"]],
    ["ST/005","K. M. I. Rizwan","Teacher","Mathematics","Permanent","2019-05-20",["Grade 9","Grade 10","Grade 11"]],
    ["ST/006","R. M. S. Fathima","Teacher","Islamic Studies","Permanent","2020-01-06",["Grade 6","Grade 7","Grade 8","Grade 9"]],
    ["ST/007","N. M. A. Hameed","Teacher","Science","Contract","2021-04-11",["Grade 10","Grade 11"]],
    ["ST/008","Z. M. F. Nusrath","Librarian","Library","Permanent","2022-02-14",[]],
    ["ST/009","H. M. S. Farook","Accountant","Finance","Permanent","2018-07-02",[]],
    ["ST/010","B. M. R. Jameel","Clerk","Administration","Contract","2023-01-09",[]]
  ].map((r,i)=>({id:i+1,staff_code:r[0],full_name:r[1],role:r[2],department:r[3],employment_type:r[4],joining_date:r[5],assigned_classes:r[6],is_active:true}));

  const books = [
    ["978-955-0001","The Holy Quran — Translation & Commentary","—","Quran & Hifz","Q-01",6],
    ["978-955-0002","Riyad us-Saliheen","Imam An-Nawawi","Hadith","H-01",4],
    ["978-955-0003","Arabic Grammar for Beginners","M. M. Faleel","Arabic","A-01",5],
    ["978-955-0004","Islamic Studies — Grade 6","Ministry of Education","Islamic Studies","I-01",8],
    ["978-955-0005","Mathematics — Grade 9","Ministry of Education","Mathematics","M-01",7],
    ["978-955-0006","Science — Grade 10","Ministry of Education","Science","S-01",6],
    ["978-955-0007","English Reader — Grade 8","Ministry of Education","English","E-01",5],
    ["978-955-0008","Tamil Reader — Grade 7","Ministry of Education","Tamil","T-01",5],
    ["978-955-0009","History of Sri Lanka","—","History","HS-01",3],
    ["978-955-0010","ICT for Students","—","ICT","ICT-01",4],
    ["978-955-0011","Stories of the Prophets","Ibn Kathir","Islamic Studies","I-02",4],
    ["978-955-0012","Fortress of the Muslim (Hisnul Muslim)","—","Quran & Hifz","Q-02",6],
    ["978-955-0013","Arabic Vocabulary — 1000 Words","—","Arabic","A-02",5],
    ["978-955-0014","Seerah — Life of the Prophet ﷺ","—","Islamic Studies","I-03",4],
    ["978-955-0015","Mathematics — Grade 11","Ministry of Education","Mathematics","M-02",6],
    ["978-955-0016","English Grammar Workbook","—","English","E-02",3],
    ["978-955-0017","Hifz Tracker & Revision Planner","—","Quran & Hifz","Q-03",4],
    ["978-955-0018","Islamic Etiquettes for Students","—","Islamic Studies","I-04",5]
  ].map((r,i)=>({id:i+1,isbn:r[0],title:r[1],author:r[2],category:r[3],shelf:r[4],copies:r[5]}));

  const timetable = {};
  CLASSES.forEach((c,ci)=>{
    timetable[c] = {};
    DAYS.forEach((d,di)=>{
      timetable[c][d] = PERIOD_TIMES.map((_,pi)=>{
        const subj = SUBJECTS[(ci+di+pi) % SUBJECTS.length];
        const teacher = staff[2 + ((ci+di+pi) % 5)].full_name;
        return {subject:subj, teacher};
      });
    });
  });

  const today = new Date(); const iso = d=>d.toISOString().slice(0,10);
  const attendance = {};
  for(let k=0;k<5;k++){
    const d = new Date(today); d.setDate(d.getDate()-k);
    if(d.getDay()===0||d.getDay()===6) continue;
    const key = iso(d);
    attendance[key] = {};
    students.forEach(s=>{
      const r = Math.random();
      attendance[key][s.id] = r<0.88 ? "P" : (r<0.95 ? "L" : "A");
    });
  }
  const marks = {};
  ["Term 1","Term 2","Term 3"].forEach(exam=>{
    marks[exam] = {};
    CLASSES.forEach(c=>{
      SUBJECTS.slice(0,6).forEach(subj=>{
        marks[exam][c+":"+subj] = {};
        students.filter(s=>s.class_name===c).forEach(s=>{
          marks[exam][c+":"+subj][s.id] = Math.round(35 + Math.random()*60);
        });
      });
    });
  });

  const loans = [
    {id:1,book_id:1,member_type:"Student",member_name:"M. A. F. Rizan",issue_date:iso(new Date(Date.now()-20*864e5)),due_date:iso(new Date(Date.now()-6*864e5)),return_date:null},
    {id:2,book_id:3,member_type:"Student",member_name:"F. S. N. Ayesha",issue_date:iso(new Date(Date.now()-10*864e5)),due_date:iso(new Date(Date.now()+4*864e5)),return_date:null},
    {id:3,book_id:5,member_type:"Staff",member_name:"K. M. I. Rizwan",issue_date:iso(new Date(Date.now()-30*864e5)),due_date:iso(new Date(Date.now()-16*864e5)),return_date:iso(new Date(Date.now()-18*864e5))},
    {id:4,book_id:11,member_type:"Student",member_name:"T. M. A. Sufyan",issue_date:iso(new Date(Date.now()-8*864e5)),due_date:iso(new Date(Date.now()+6*864e5)),return_date:null}
  ];

  return {
    version:2,
    settings:{college_name:"Al Dheeniyya Arabic College",college_location:"Pallimulla, Panadura, Sri Lanka",college_motto:"Knowledge with Faith — Ilman wal Iman",college_phone:"+94 38 223 4567",college_email:"info@aldheeniyya.edu.lk",gallery:[{title:"Morning Assembly",caption:"Daily Quran recitation"},{title:"Hifz Class",caption:"Memorisation circle"},{title:"Library",caption:"Reading & research"},{title:"Sports Day",caption:"Annual inter-house meet"}]},
    users:[
      {id:1,username:"admin",full_name:"M. M. M. Faleel",role:"Super Admin",password:"admin123",is_active:true},
      {id:2,username:"teacher",full_name:"F. M. R. Shameem",role:"Teacher",password:"teacher123",is_active:true},
      {id:3,username:"librarian",full_name:"Z. M. F. Nusrath",role:"Librarian",password:"library123",is_active:true},
      {id:4,username:"student",full_name:"M. A. F. Rizan",role:"Student",password:"student123",is_active:true}
    ],
    students, staff, books, timetable, attendance, marks, loans,
    permissions: JSON.parse(JSON.stringify(DEFAULT_PERMS)),
    backup_history:[{id:1,date:iso(today),type:"Manual JSON export",counts:{students:students.length,staff:staff.length,books:books.length,loans:loans.length}}],
    audit:[{id:1,date:iso(today),action:"System seeded",by:"System"}]
  };
}

/* ---------------- DB helpers ---------------- */
let DB;
function loadDB(){
  try{ const raw = localStorage.getItem(DB_KEY); if(raw){ DB = JSON.parse(raw); if(DB.version===2) return; } }catch(e){}
  DB = seedDB(); saveDB();
}
function saveDB(){ localStorage.setItem(DB_KEY, JSON.stringify(DB)); }
function uid(){ return Date.now() + Math.floor(Math.random()*1000); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function fmtDate(iso){ if(!iso) return "—"; const d=new Date(iso+"T00:00:00"); return d.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}); }
function initials(name){ return (name||"?").split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase(); }
function download(name, content, type){
  const blob = new Blob([content],{type:type||"text/plain"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 2000);
}
function toCSV(rows){
  return rows.map(r=>r.map(c=>{ c=String(c==null?"":c); return /[",\n]/.test(c) ? '"'+c.replace(/"/g,'""')+'"' : c; }).join(",")).join("\n");
}
function toast(msg, kind){
  const t = document.createElement("div"); t.className = "toast "+(kind||""); t.textContent = msg;
  document.getElementById("toasts").appendChild(t);
  setTimeout(()=>t.remove(), 3200);
}
function audit(action){ DB.audit.unshift({id:uid(),date:todayISO(),action,by:currentUser?currentUser.full_name:"System"}); DB.audit = DB.audit.slice(0,100); }

/* ---------------- Auth ---------------- */
let currentUser = null;
function tryLogin(u,p){
  const user = DB.users.find(x=>x.username.toLowerCase()===String(u).trim().toLowerCase() && x.password===p && x.is_active);
  if(user){ currentUser = user; sessionStorage.setItem(SESSION_KEY, String(user.id)); return true; }
  return false;
}
function restoreSession(){
  const id = sessionStorage.getItem(SESSION_KEY);
  if(id){ const u = DB.users.find(x=>String(x.id)===id && x.is_active); if(u){ currentUser=u; return true; } }
  return false;
}
function logout(){ currentUser=null; sessionStorage.removeItem(SESSION_KEY); showLogin(); }
function can(module){ if(!currentUser) return false; const p = DB.permissions[currentUser.role]||[]; return p.includes(module); }

/* ---------------- Modal ---------------- */
function openModal(title, bodyHTML, footHTML){
  const root = document.getElementById("modalRoot");
  root.innerHTML = `<div class="modal-backdrop" id="modalBackdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}">
    <div class="modal-head"><h3>${esc(title)}</h3><button class="icon-btn" id="modalClose" aria-label="Close">${I.x}</button></div>
    <div class="modal-body">${bodyHTML}</div>
    ${footHTML?`<div class="modal-foot">${footHTML}</div>`:""}
  </div></div>`;
  const close = ()=>{ root.innerHTML=""; };
  document.getElementById("modalClose").onclick = close;
  document.getElementById("modalBackdrop").addEventListener("click", e=>{ if(e.target.id==="modalBackdrop") close(); });
  document.addEventListener("keydown", function escH(e){ if(e.key==="Escape"){ close(); document.removeEventListener("keydown",escH);} });
  return close;
}
function confirmModal(title, msg, onYes){
  const close = openModal(title, `<p>${esc(msg)}</p>`, `<button class="btn" id="cfNo">Cancel</button><button class="btn btn-danger" id="cfYes">Confirm</button>`);
  document.getElementById("cfNo").onclick = close;
  document.getElementById("cfYes").onclick = ()=>{ close(); onYes(); };
}
function field(label, inputHTML, full){ return `<div class="field ${full?"full":""}"><label>${esc(label)}</label>${inputHTML}</div>`; }
function inp(name, value, type, extra){ return `<input class="input" id="${name}" name="${name}" type="${type||"text"}" value="${esc(value||"")}" ${extra||""} />`; }
function sel(name, options, value){ return `<select class="input" id="${name}" name="${name}">${options.map(o=>`<option value="${esc(o)}" ${o===value?"selected":""}>${esc(o)}</option>`).join("")}</select>`; }

/* ---------------- Navigation ---------------- */
const NAV = [
  {section:"Main"},
  {key:"dashboard", label:"Dashboard", icon:I.dash},
  {section:"Academic"},
  {key:"students", label:"Students", icon:I.students},
  {key:"staff", label:"Staff", icon:I.staff},
  {key:"attendance", label:"Attendance", icon:I.att},
  {key:"exams", label:"Exams & Marks", icon:I.exam},
  {key:"timetable", label:"Timetable", icon:I.tt},
  {section:"Library"},
  {key:"library", label:"Library", icon:I.lib},
  {section:"System"},
  {key:"backups", label:"Backups", icon:I.backup},
  {key:"roles", label:"Roles & Permissions", icon:I.roles},
  {key:"settings", label:"Settings", icon:I.settings}
];
function renderNav(){
  const nav = document.getElementById("mainNav");
  const route = (location.hash||"#/dashboard").replace("#/","");
  nav.innerHTML = NAV.map(n=>{
    if(n.section) return `<div class="nav-label">${esc(n.section)}</div>`;
    if(!can(n.key)) return "";
    return `<a href="#/${n.key}" class="${route===n.key?"active":""}">${n.icon}<span>${esc(n.label)}</span></a>`;
  }).join("");
}
function closeSidebar(){ document.getElementById("sidebar").classList.remove("open"); document.getElementById("navBackdrop").classList.add("hidden"); }

/* ---------------- Router ---------------- */
function router(){
  if(!currentUser){ showLogin(); return; }
  let route = (location.hash||"#/dashboard").replace("#/","");
  if(!MODULES.some(m=>m.key===route)) route = "dashboard";
  if(!can(route)){ toast("You do not have access to that module.","err"); route="dashboard"; location.hash="#/dashboard"; }
  document.getElementById("pageTitle").textContent = MODULES.find(m=>m.key===route).label;
  renderNav(); closeSidebar();
  const views = {dashboard:viewDashboard, students:viewStudents, staff:viewStaff, attendance:viewAttendance, exams:viewExams, timetable:viewTimetable, library:viewLibrary, backups:viewBackups, roles:viewRoles, settings:viewSettings};
  views[route]();
  document.getElementById("content").focus({preventScroll:true});
  window.scrollTo(0,0);
}
window.addEventListener("hashchange", router);

/* ---------------- Shared UI helpers ---------------- */
function statCard(icon, bg, color, num, label, sub){
  return `<div class="card stat-card"><div class="stat-icon" style="background:${bg};color:${color}">${icon}</div><div><div class="stat-num">${num}</div><div class="stat-label">${label}</div><div class="stat-sub">${sub||""}</div></div></div>`;
}
function toolbarHTML(searchPlaceholder, extra){
  return `<div class="toolbar">
    <div class="search-wrap" style="min-width:240px;flex:1;max-width:360px">${I.search}<input class="input" id="q" placeholder="${esc(searchPlaceholder)}" /></div>
    ${extra||""}<div class="spacer"></div>
    <button class="btn btn-sm" id="btnCsv">${I.download} CSV</button>
    <button class="btn btn-sm" id="btnPrint">${I.print} Print</button>
  </div>`;
}
function bindToolbar(onSearch, onCsv){
  const q = document.getElementById("q");
  if(q) q.addEventListener("input", ()=>onSearch(q.value.trim().toLowerCase()));
  const csv = document.getElementById("btnCsv"); if(csv) csv.onclick = onCsv;
  const pr = document.getElementById("btnPrint"); if(pr) pr.onclick = ()=>window.print();
}
function emptyState(title, sub){ return `<div class="empty"><b>${esc(title)}</b>${esc(sub||"No records found.")}</div>`; }
function badge(status){
  const s = String(status||"").toLowerCase();
  if(s==="active"||s==="present"||s==="returned"||s==="pass") return `<span class="badge badge-green">${esc(status)}</span>`;
  if(s==="absent"||s==="fail"||s==="overdue"||s==="inactive") return `<span class="badge badge-red">${esc(status)}</span>`;
  if(s==="late"||s==="issued") return `<span class="badge badge-amber">${esc(status)}</span>`;
  return `<span class="badge badge-slate">${esc(status)}</span>`;
}

/* =========================================================================
   DASHBOARD
   ========================================================================= */
function viewDashboard(){
  const c = document.getElementById("content");
  const s = DB.settings;
  const totalStudents = DB.students.filter(x=>x.status==="Active").length;
  const totalStaff = DB.staff.filter(x=>x.is_active).length;
  const teachers = DB.staff.filter(x=>x.role==="Teacher" && x.is_active).length;
  const activeUsers = DB.users.filter(x=>x.is_active).length;
  const today = todayISO();
  const todayAtt = DB.attendance[today]||{};
  const attVals = Object.values(todayAtt);
  const attPct = attVals.length ? Math.round(attVals.filter(v=>v==="P"||v==="L").length/attVals.length*100) : 0;
  const overdue = DB.loans.filter(l=>!l.return_date && l.due_date < today).length;
  const issued = DB.loans.filter(l=>!l.return_date).length;
  const perClass = CLASSES.map(cl=>({label:cl, val:DB.students.filter(x=>x.class_name===cl).length}));
  const maxVal = Math.max(1,...perClass.map(x=>x.val));
  const recentLoans = [...DB.loans].sort((a,b)=>b.id-a.id).slice(0,5);
  const recentAudit = DB.audit.slice(0,6);

  c.innerHTML = `
  <div class="hero-banner" style="margin-bottom:18px">
    <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#fcd34d;font-weight:700">Assalamu Alaikum</div>
    <h2>${esc(s.college_name)}</h2>
    <p>${esc(s.college_motto)} · ${esc(s.college_location)}</p>
    <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
      <span class="badge" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)">${totalStudents} Students</span>
      <span class="badge" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)">${totalStaff} Staff</span>
      <span class="badge" style="background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.25)">${DB.books.length} Library Titles</span>
    </div>
  </div>

  <div class="grid grid-4" style="margin-bottom:16px">
    ${statCard(I.users,"#ecfdf5","#047857",totalStudents,"Total Students",DB.students.length+" records")}
    ${statCard(I.staff,"#eff6ff","#1d4ed8",totalStaff,"Total Staff",teachers+" teachers")}
    ${statCard(I.att,"#fffbeb","#b45309",attPct+"%","Attendance Today",attVals.length?attVals.length+" marked":"Not marked yet")}
    ${statCard(I.alert,"#fef2f2","#b91c1c",overdue,"Overdue Books",issued+" currently issued")}
  </div>

  <div class="grid grid-2" style="margin-bottom:16px">
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:4px">Students by Class</h3>
      <p class="muted" style="font-size:12px">Enrolment distribution across classes</p>
      <div class="bars">${perClass.map((x,i)=>`
        <div class="bar-col"><div class="bar-val">${x.val}</div><div class="bar ${i%2?"amber":""}" style="height:${Math.round(x.val/maxVal*110)}px"></div><div class="bar-label">${esc(x.label.replace("Grade ","G").replace(" Class",""))}</div></div>`).join("")}
      </div>
    </div>
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:4px">Quick Actions</h3>
      <p class="muted" style="font-size:12px">Common tasks for ${esc(currentUser.role)}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
        ${can("students")?`<a class="btn" href="#/students">${I.plus} Add Student</a>`:""}
        ${can("staff")?`<a class="btn" href="#/staff">${I.plus} Add Staff</a>`:""}
        ${can("attendance")?`<a class="btn" href="#/attendance">${I.att} Mark Attendance</a>`:""}
        ${can("library")?`<a class="btn" href="#/library">${I.lib} Issue a Book</a>`:""}
        ${can("exams")?`<a class="btn" href="#/exams">${I.exam} Enter Marks</a>`:""}
        ${can("backups")?`<a class="btn" href="#/backups">${I.backup} Export Backup</a>`:""}
      </div>
      <div style="margin-top:16px">
        <h4 style="font-size:13px;margin-bottom:8px">Recent Activity</h4>
        ${recentAudit.length?recentAudit.map(a=>`<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 0;border-bottom:1px solid var(--border-soft);font-size:12px"><span>${esc(a.action)}</span><span class="muted mono">${esc(a.date)}</span></div>`).join(""):'<p class="muted" style="font-size:12px">No activity yet.</p>'}
      </div>
    </div>
  </div>

  <div class="grid grid-2">
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:10px">Recent Library Transactions</h3>
      ${recentLoans.length?`<div class="table-wrap"><table><thead><tr><th>Book</th><th>Member</th><th>Due</th><th>Status</th></tr></thead><tbody>
        ${recentLoans.map(l=>{const b=DB.books.find(x=>x.id===l.book_id);const od=!l.return_date&&l.due_date<today;return `<tr><td class="cell-main">${esc(b?b.title:"—")}</td><td>${esc(l.member_name)}</td><td class="mono">${fmtDate(l.due_date)}</td><td>${l.return_date?badge("Returned"):od?badge("Overdue"):badge("Issued")}</td></tr>`;}).join("")}
      </tbody></table></div>`:'<p class="muted" style="font-size:12px">No transactions yet.</p>'}
    </div>
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:10px">College Gallery</h3>
      <div class="gallery">${s.gallery.map((g,i)=>`
        <figure><div style="height:110px;background:linear-gradient(135deg,${["#0b2239,#047857","#123354,#d97706","#047857,#0ea5e9","#0b2239,#d97706"][i%4]});display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-weight:700;font-size:15px;padding:10px;text-align:center">${esc(g.title)}</div><figcaption><b>${esc(g.title)}</b><br/><span class="muted">${esc(g.caption)}</span></figcaption></figure>`).join("")}
      </div>
      <div class="kv" style="margin-top:14px">
        <div><span>Phone</span><b>${esc(s.college_phone)}</b></div>
        <div><span>Email</span><b>${esc(s.college_email)}</b></div>
        <div><span>Active Accounts</span><b>${activeUsers}</b></div>
      </div>
    </div>
  </div>`;
}

/* =========================================================================
   STUDENTS
   ========================================================================= */
let studentFilter = {q:"", cls:"All"};
function viewStudents(){
  const c = document.getElementById("content");
  const canEdit = can("students") && currentUser.role!=="Student";
  c.innerHTML = `
  <div class="page-head"><div><h2>Students</h2><p>${DB.students.length} records · admissions, guardians and class enrolment</p></div>
    ${canEdit?`<button class="btn btn-primary" id="addStudent">${I.plus} Add Student</button>`:""}</div>
  ${toolbarHTML("Search name, admission no, guardian…", `<select class="input" id="clsFilter" style="width:auto"><option>All</option>${CLASSES.map(x=>`<option ${x===studentFilter.cls?"selected":""}>${x}</option>`).join("")}</select>`)}
  <div class="card"><div class="table-wrap" id="studentTable"></div></div>`;
  const render = ()=>{
    const q = studentFilter.q;
    const rows = DB.students.filter(s=>{
      const okCls = studentFilter.cls==="All"||s.class_name===studentFilter.cls;
      const hay = (s.name+" "+s.admission_no+" "+s.guardian+" "+s.class_name).toLowerCase();
      return okCls && (!q || hay.includes(q));
    });
    document.getElementById("studentTable").innerHTML = rows.length ? `<table>
      <thead><tr><th>Admission No</th><th>Student</th><th>Class</th><th>Guardian</th><th>Contact</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead><tbody>
      ${rows.map(s=>`<tr>
        <td class="mono">${esc(s.admission_no)}</td>
        <td><div style="display:flex;gap:9px;align-items:center"><div class="avatar" style="width:30px;height:30px;font-size:11px">${esc(initials(s.name))}</div><div><div class="cell-main">${esc(s.name)}</div><div class="cell-sub">${esc(s.gender)} · DOB ${fmtDate(s.dob)}</div></div></div></td>
        <td>${esc(s.class_name)}</td>
        <td><div class="cell-main" style="font-weight:500">${esc(s.guardian)}</div><div class="cell-sub">${esc(s.address)}</div></td>
        <td class="mono">${esc(s.guardian_contact)}</td>
        <td>${badge(s.status)}</td>
        <td><div class="row-actions">${canEdit?`<button class="icon-btn" data-edit="${s.id}" title="Edit">${I.edit}</button><button class="icon-btn" data-del="${s.id}" title="Delete">${I.trash}</button>`:""}</div></td>
      </tr>`).join("")}</tbody></table>` : emptyState("No students found","Try a different search or add a new student.");
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>studentForm(DB.students.find(x=>x.id==b.dataset.edit)));
    document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>confirmModal("Delete student","Delete this student record permanently?",()=>{
      DB.students = DB.students.filter(x=>x.id!=b.dataset.del); saveDB(); audit("Deleted a student record"); toast("Student deleted."); render();
    }));
  };
  render();
  bindToolbar(v=>{studentFilter.q=v;render();}, ()=>{
    const rows = [["Admission Number","Name with Initials","Class Name","Date of Birth","Gender","Guardian Name","Guardian Contact","Address","Status"]];
    DB.students.forEach(s=>rows.push([s.admission_no,s.name,s.class_name,s.dob,s.gender,s.guardian,s.guardian_contact,s.address,s.status]));
    download("students.csv", toCSV(rows), "text/csv"); toast("students.csv downloaded.");
  });
  document.getElementById("clsFilter").onchange = e=>{ studentFilter.cls=e.target.value; render(); };
  const add = document.getElementById("addStudent"); if(add) add.onclick = ()=>studentForm(null);
}
function studentForm(s){
  const isNew = !s; s = s||{admission_no:"AD/"+new Date().getFullYear()+"/"+String(DB.students.length+1).padStart(3,"0"),name:"",class_name:CLASSES[0],dob:"",gender:"Male",guardian:"",guardian_contact:"",address:"",status:"Active"};
  const close = openModal(isNew?"Add Student":"Edit Student", `
    <form id="studentForm"><div class="form-grid">
      ${field("Admission Number", inp("admission_no",s.admission_no,"text","required"))}
      ${field("Name with Initials", inp("name",s.name,"text","required"))}
      ${field("Class", sel("class_name",CLASSES,s.class_name))}
      ${field("Date of Birth", inp("dob",s.dob,"date","required"))}
      ${field("Gender", sel("gender",["Male","Female"],s.gender))}
      ${field("Guardian Name", inp("guardian",s.guardian,"text","required"))}
      ${field("Guardian Contact", inp("guardian_contact",s.guardian_contact,"tel","required"))}
      ${field("Address", inp("address",s.address,"text"))}
      ${field("Status", sel("status",["Active","Inactive"],s.status))}
    </div></form>`,
    `<button class="btn" id="sfCancel">Cancel</button><button class="btn btn-primary" id="sfSave">Save Student</button>`);
  document.getElementById("sfCancel").onclick = close;
  document.getElementById("sfSave").onclick = ()=>{
    const f = document.getElementById("studentForm");
    if(!f.reportValidity()) return;
    const data = Object.fromEntries(new FormData(f).entries());
    if(isNew){ data.id = uid(); DB.students.push(data); audit("Added student "+data.name); }
    else { Object.assign(DB.students.find(x=>x.id===s.id), data); audit("Updated student "+data.name); }
    saveDB(); close(); toast("Student saved."); viewStudents();
  };
}

/* =========================================================================
   STAFF
   ========================================================================= */
let staffFilter = {q:"", dept:"All"};
function viewStaff(){
  const c = document.getElementById("content");
  const canEdit = can("staff") && currentUser.role!=="Student";
  const depts = [...new Set(DB.staff.map(x=>x.department))];
  c.innerHTML = `
  <div class="page-head"><div><h2>Staff</h2><p>${DB.staff.length} records · teachers, administration and support staff</p></div>
    ${canEdit?`<button class="btn btn-primary" id="addStaff">${I.plus} Add Staff</button>`:""}</div>
  ${toolbarHTML("Search name, staff code, role…", `<select class="input" id="deptFilter" style="width:auto"><option>All</option>${depts.map(x=>`<option ${x===staffFilter.dept?"selected":""}>${esc(x)}</option>`).join("")}</select>`)}
  <div class="card"><div class="table-wrap" id="staffTable"></div></div>`;
  const render = ()=>{
    const q = staffFilter.q;
    const rows = DB.staff.filter(s=>{
      const okD = staffFilter.dept==="All"||s.department===staffFilter.dept;
      const hay = (s.full_name+" "+s.staff_code+" "+s.role+" "+s.department).toLowerCase();
      return okD && (!q || hay.includes(q));
    });
    document.getElementById("staffTable").innerHTML = rows.length ? `<table>
      <thead><tr><th>Staff Code</th><th>Staff Member</th><th>Role</th><th>Department</th><th>Employment</th><th>Joined</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead><tbody>
      ${rows.map(s=>`<tr>
        <td class="mono">${esc(s.staff_code)}</td>
        <td><div style="display:flex;gap:9px;align-items:center"><div class="avatar" style="width:30px;height:30px;font-size:11px">${esc(initials(s.full_name))}</div><div><div class="cell-main">${esc(s.full_name)}</div><div class="cell-sub">${s.assigned_classes&&s.assigned_classes.length?esc(s.assigned_classes.join(", ")):"No classes assigned"}</div></div></div></td>
        <td>${esc(s.role)}</td><td>${esc(s.department)}</td><td>${esc(s.employment_type)}</td>
        <td class="mono">${fmtDate(s.joining_date)}</td><td>${badge(s.is_active?"Active":"Inactive")}</td>
        <td><div class="row-actions">${canEdit?`<button class="icon-btn" data-edit="${s.id}" title="Edit">${I.edit}</button><button class="icon-btn" data-del="${s.id}" title="Delete">${I.trash}</button>`:""}</div></td>
      </tr>`).join("")}</tbody></table>` : emptyState("No staff found","Try a different search.");
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>staffForm(DB.staff.find(x=>x.id==b.dataset.edit)));
    document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>confirmModal("Delete staff","Delete this staff record permanently?",()=>{
      DB.staff = DB.staff.filter(x=>x.id!=b.dataset.del); saveDB(); audit("Deleted a staff record"); toast("Staff record deleted."); render();
    }));
  };
  render();
  bindToolbar(v=>{staffFilter.q=v;render();}, ()=>{
    const rows = [["Staff Code","Full Name","Role","Department","Employment Type","Joining Date","Assigned Classes","Active"]];
    DB.staff.forEach(s=>rows.push([s.staff_code,s.full_name,s.role,s.department,s.employment_type,s.joining_date,(s.assigned_classes||[]).join("; "),s.is_active?"Yes":"No"]));
    download("staff.csv", toCSV(rows), "text/csv"); toast("staff.csv downloaded.");
  });
  document.getElementById("deptFilter").onchange = e=>{ staffFilter.dept=e.target.value; render(); };
  const add = document.getElementById("addStaff"); if(add) add.onclick = ()=>staffForm(null);
}
function staffForm(s){
  const isNew = !s; s = s||{staff_code:"ST/"+String(DB.staff.length+1).padStart(3,"0"),full_name:"",role:"Teacher",department:"",employment_type:"Permanent",joining_date:todayISO(),assigned_classes:[],is_active:true};
  const close = openModal(isNew?"Add Staff":"Edit Staff", `
    <form id="staffForm"><div class="form-grid">
      ${field("Staff Code", inp("staff_code",s.staff_code,"text","required"))}
      ${field("Full Name", inp("full_name",s.full_name,"text","required"))}
      ${field("Role", inp("role",s.role,"text","required"))}
      ${field("Department", inp("department",s.department,"text","required"))}
      ${field("Employment Type", sel("employment_type",["Permanent","Contract","Volunteer"],s.employment_type))}
      ${field("Joining Date", inp("joining_date",s.joining_date,"date","required"))}
      ${field("Assigned Classes (comma separated)", inp("assigned_classes",(s.assigned_classes||[]).join(", "),"text"), true)}
      ${field("Active", sel("is_active",["Yes","No"], s.is_active?"Yes":"No"))}
    </div></form>`,
    `<button class="btn" id="sfCancel">Cancel</button><button class="btn btn-primary" id="sfSave">Save Staff</button>`);
  document.getElementById("sfCancel").onclick = close;
  document.getElementById("sfSave").onclick = ()=>{
    const f = document.getElementById("staffForm");
    if(!f.reportValidity()) return;
    const d = Object.fromEntries(new FormData(f).entries());
    const data = {staff_code:d.staff_code, full_name:d.full_name, role:d.role, department:d.department, employment_type:d.employment_type, joining_date:d.joining_date, assigned_classes:String(d.assigned_classes||"").split(",").map(x=>x.trim()).filter(Boolean), is_active:d.is_active==="Yes"};
    if(isNew){ data.id = uid(); DB.staff.push(data); audit("Added staff "+data.full_name); }
    else { Object.assign(DB.staff.find(x=>x.id===s.id), data); audit("Updated staff "+data.full_name); }
    saveDB(); close(); toast("Staff saved."); viewStaff();
  };
}

/* =========================================================================
   ATTENDANCE
   ========================================================================= */
let attState = {cls:CLASSES[0], date:todayISO(), marks:{}};
function viewAttendance(){
  const c = document.getElementById("content");
  if(!DB.attendance[attState.date]) attState.marks = {};
  else attState.marks = {...DB.attendance[attState.date]};
  c.innerHTML = `
  <div class="page-head"><div><h2>Attendance</h2><p>Daily register — mark Present, Absent or Late, then save</p></div></div>
  <div class="card card-pad" style="margin-bottom:14px">
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:end">
      ${field("Class", sel("attCls",CLASSES,attState.cls))}
      ${field("Date", inp("attDate",attState.date,"date"))}
      <button class="btn btn-primary" id="attSave">${I.att} Save Register</button>
      <div class="spacer" style="flex:1"></div>
      <div id="attSummary"></div>
    </div>
  </div>
  <div class="card"><div class="table-wrap" id="attTable"></div></div>
  <div class="card card-pad" style="margin-top:16px">
    <h3 style="font-size:15px;margin-bottom:10px">Attendance % by Student (all recorded days)</h3>
    <div class="table-wrap" id="attPctTable"></div>
  </div>`;
  const students = ()=>DB.students.filter(s=>s.class_name===attState.cls);
  const renderSummary = ()=>{
    const vals = Object.values(attState.marks);
    const p = vals.filter(v=>v==="P").length, a = vals.filter(v=>v==="A").length, l = vals.filter(v=>v==="L").length;
    document.getElementById("attSummary").innerHTML = `<span class="badge badge-green">Present ${p}</span> <span class="badge badge-amber">Late ${l}</span> <span class="badge badge-red">Absent ${a}</span> <span class="badge badge-slate">${vals.length}/${students().length} marked</span>`;
  };
  const render = ()=>{
    const list = students();
    document.getElementById("attTable").innerHTML = list.length ? `<table>
      <thead><tr><th>Admission No</th><th>Student</th><th style="text-align:center">Status</th></tr></thead><tbody>
      ${list.map(s=>{const v = attState.marks[s.id]||"P"; return `<tr>
        <td class="mono">${esc(s.admission_no)}</td>
        <td><div style="display:flex;gap:9px;align-items:center"><div class="avatar" style="width:30px;height:30px;font-size:11px">${esc(initials(s.name))}</div><span class="cell-main">${esc(s.name)}</span></div></td>
        <td style="text-align:center"><div style="display:inline-flex;gap:6px">
          ${["P","A","L"].map(k=>`<button class="btn btn-sm att-btn" data-id="${s.id}" data-v="${k}" style="${v===k?(k==="P"?"background:var(--emerald);color:#fff;border-color:var(--emerald)":k==="A"?"background:var(--red);color:#fff;border-color:var(--red)":"background:var(--amber);color:#fff;border-color:var(--amber)"):""}">${k==="P"?"Present":k==="A"?"Absent":"Late"}</button>`).join("")}
        </div></td></tr>`;}).join("")}</tbody></table>` : emptyState("No students in this class","Select another class.");
    document.querySelectorAll(".att-btn").forEach(b=>b.onclick=()=>{ attState.marks[b.dataset.id]=b.dataset.v; render(); });
    renderSummary();
  };
  const renderPct = ()=>{
    const rows = DB.students.map(s=>{
      let total=0, present=0;
      Object.values(DB.attendance).forEach(day=>{ if(day[s.id]){ total++; if(day[s.id]==="P"||day[s.id]==="L") present++; } });
      const pct = total? Math.round(present/total*100):0;
      return {s,total,present,pct};
    }).sort((a,b)=>a.pct-b.pct);
    document.getElementById("attPctTable").innerHTML = `<table><thead><tr><th>Student</th><th>Class</th><th>Days</th><th>Present</th><th style="min-width:160px">Attendance %</th></tr></thead><tbody>
      ${rows.map(r=>`<tr><td class="cell-main">${esc(r.s.name)}</td><td>${esc(r.s.class_name)}</td><td class="mono">${r.total}</td><td class="mono">${r.present}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress" style="flex:1"><div style="width:${r.pct}%;${r.pct<75?"background:var(--red)":""}"></div></div><b class="mono">${r.pct}%</b></div></td></tr>`).join("")}
    </tbody></table>`;
  };
  document.getElementById("attCls").onchange = e=>{ attState.cls=e.target.value; attState.marks={...(DB.attendance[attState.date]||{})}; render(); };
  document.getElementById("attDate").onchange = e=>{ attState.date=e.target.value; attState.marks={...(DB.attendance[attState.date]||{})}; render(); };
  document.getElementById("attSave").onclick = ()=>{
    DB.attendance[attState.date] = {...attState.marks};
    saveDB(); audit("Saved attendance for "+attState.cls+" on "+attState.date);
    toast("Attendance saved for "+fmtDate(attState.date)+"."); renderPct();
  };
  render(); renderPct();
}

/* =========================================================================
   EXAMS & MARKS
   ========================================================================= */
let examState = {exam:"Term 1", cls:CLASSES[0], subject:SUBJECTS[0], max:100, marks:{}};
function gradeOf(pct){ return pct>=80?"A":pct>=65?"B":pct>=55?"C":pct>=40?"S":"F"; }
function viewExams(){
  const c = document.getElementById("content");
  const exams = Object.keys(DB.marks);
  if(!exams.includes(examState.exam)) examState.exam = exams[0]||"Term 1";
  if(!DB.marks[examState.exam]) DB.marks[examState.exam] = {};
  const key = examState.cls+":"+examState.subject;
  examState.marks = {...(DB.marks[examState.exam][key]||{})};
  c.innerHTML = `
  <div class="page-head"><div><h2>Exams &amp; Marks</h2><p>Enter marks per subject — grades are calculated automatically</p></div></div>
  <div class="card card-pad" style="margin-bottom:14px">
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:end">
      ${field("Exam", sel("exExam",exams,examState.exam))}
      ${field("Class", sel("exCls",CLASSES,examState.cls))}
      ${field("Subject", sel("exSubj",SUBJECTS,examState.subject))}
      ${field("Max Marks", inp("exMax",examState.max,"number","min=1"))}
      <button class="btn btn-primary" id="exSave">${I.exam} Save Marks</button>
      <div class="spacer" style="flex:1"></div><div id="exSummary"></div>
    </div>
  </div>
  <div class="card"><div class="table-wrap" id="exTable"></div></div>`;
  const list = ()=>DB.students.filter(s=>s.class_name===examState.cls);
  const render = ()=>{
    const max = Number(document.getElementById("exMax").value)||100;
    const rows = list();
    document.getElementById("exTable").innerHTML = rows.length ? `<table>
      <thead><tr><th>Admission No</th><th>Student</th><th>Marks / ${max}</th><th>Percentage</th><th>Grade</th><th>Result</th></tr></thead><tbody>
      ${rows.map(s=>{const m = examState.marks[s.id]; const pct = (m==null||m==="")?null:Math.round(Number(m)/max*100); const g = pct==null?"—":gradeOf(pct);
        return `<tr><td class="mono">${esc(s.admission_no)}</td><td class="cell-main">${esc(s.name)}</td>
        <td><input class="input mark-in" data-id="${s.id}" type="number" min="0" max="${max}" value="${m==null?"":esc(m)}" style="width:100px" /></td>
        <td class="mono">${pct==null?"—":pct+"%"}</td><td><b>${g}</b></td><td>${pct==null?"":badge(pct>=40?"Pass":"Fail")}</td></tr>`;}).join("")}
      </tbody></table>` : emptyState("No students in this class","Select another class.");
    document.querySelectorAll(".mark-in").forEach(inpEl=>inpEl.onchange=()=>{ examState.marks[inpEl.dataset.id]=inpEl.value; renderSummary(); });
    renderSummary();
  };
  const renderSummary = ()=>{
    const vals = Object.values(examState.marks).filter(v=>v!==""&&v!=null).map(Number);
    const max = Number(document.getElementById("exMax").value)||100;
    if(!vals.length){ document.getElementById("exSummary").innerHTML=""; return; }
    const avg = Math.round(vals.reduce((a,b)=>a+b,0)/vals.length/max*100);
    const pass = vals.filter(v=>v/max*100>=40).length;
    document.getElementById("exSummary").innerHTML = `<span class="badge badge-navy">Average ${avg}%</span> <span class="badge badge-green">${pass}/${vals.length} passed</span>`;
  };
  ["exExam","exCls","exSubj"].forEach(id=>document.getElementById(id).onchange=()=>{
    examState.exam=document.getElementById("exExam").value; examState.cls=document.getElementById("exCls").value; examState.subject=document.getElementById("exSubj").value;
    if(!DB.marks[examState.exam]) DB.marks[examState.exam]={};
    examState.marks={...(DB.marks[examState.exam][examState.cls+":"+examState.subject]||{})}; render();
  });
  document.getElementById("exMax").onchange = render;
  document.getElementById("exSave").onclick = ()=>{
    const max = Number(document.getElementById("exMax").value)||100;
    examState.max = max;
    const clean = {};
    Object.entries(examState.marks).forEach(([k,v])=>{ if(v!==""&&v!=null) clean[k]=Math.min(max,Math.max(0,Number(v))); });
    DB.marks[examState.exam][examState.cls+":"+examState.subject] = clean;
    saveDB(); audit("Saved marks: "+examState.exam+" · "+examState.cls+" · "+examState.subject);
    toast("Marks saved."); render();
  };
  render();
}

/* =========================================================================
   TIMETABLE
   ========================================================================= */
let ttCls = CLASSES[0];
function viewTimetable(){
  const c = document.getElementById("content");
  if(!DB.timetable[ttCls]) DB.timetable[ttCls] = {};
  DAYS.forEach(d=>{ if(!DB.timetable[ttCls][d]) DB.timetable[ttCls][d]=PERIOD_TIMES.map(()=>({subject:"",teacher:""})); });
  c.innerHTML = `
  <div class="page-head"><div><h2>Timetable</h2><p>Weekly period schedule — click a cell to edit</p></div>
    <div style="display:flex;gap:10px;align-items:end">${field("Class", sel("ttClsSel",CLASSES,ttCls))}<button class="btn btn-sm" id="ttPrint">${I.print} Print</button></div></div>
  <div class="card card-pad"><div class="timetable-grid" id="ttGrid"></div></div>`;
  const render = ()=>{
    const g = document.getElementById("ttGrid");
    let html = `<div class="tt-head">Period</div>` + DAYS.map(d=>`<div class="tt-head">${esc(d)}</div>`).join("");
    PERIOD_TIMES.forEach((t,pi)=>{
      html += `<div class="tt-cell tt-time"><div><div>P${pi+1}</div><div style="font-weight:500;font-size:10px">${esc(t)}</div></div></div>`;
      DAYS.forEach(d=>{
        const cell = DB.timetable[ttCls][d][pi]||{subject:"",teacher:""};
        html += `<div class="tt-cell" data-day="${d}" data-pi="${pi}" style="cursor:pointer" title="Click to edit"><b>${esc(cell.subject||"—")}</b><span>${esc(cell.teacher||"")}</span></div>`;
      });
    });
    g.innerHTML = html;
    g.querySelectorAll(".tt-cell[data-day]").forEach(el=>el.onclick=()=>ttEdit(el.dataset.day, Number(el.dataset.pi)));
  };
  document.getElementById("ttClsSel").onchange = e=>{ ttCls=e.target.value; viewTimetable(); };
  document.getElementById("ttPrint").onclick = ()=>window.print();
  render();
}
function ttEdit(day, pi){
  const cell = DB.timetable[ttCls][day][pi];
  const close = openModal("Edit Period — "+ttCls, `
    <form id="ttForm"><div class="form-grid">
      ${field("Day / Period", inp("x", day+" · Period "+(pi+1)+" ("+PERIOD_TIMES[pi]+")","text","disabled"), true)}
      ${field("Subject", sel("subject",SUBJECTS,cell.subject))}
      ${field("Teacher", inp("teacher",cell.teacher,"text","required"))}
    </div></form>`,
    `<button class="btn" id="ttCancel">Cancel</button><button class="btn btn-primary" id="ttSave">Save Period</button>`);
  document.getElementById("ttCancel").onclick = close;
  document.getElementById("ttSave").onclick = ()=>{
    const f = document.getElementById("ttForm"); if(!f.reportValidity()) return;
    const d = Object.fromEntries(new FormData(f).entries());
    DB.timetable[ttCls][day][pi] = {subject:d.subject, teacher:d.teacher};
    saveDB(); close(); toast("Timetable updated."); viewTimetable();
  };
}

/* =========================================================================
   LIBRARY
   ========================================================================= */
let libTab = "catalogue", libQ = "";
function viewLibrary(){
  const c = document.getElementById("content");
  const canEdit = can("library") && currentUser.role!=="Student";
  const today = todayISO();
  const issuedCount = DB.loans.filter(l=>!l.return_date).length;
  const overdueCount = DB.loans.filter(l=>!l.return_date && l.due_date<today).length;
  const totalCopies = DB.books.reduce((a,b)=>a+b.copies,0);
  c.innerHTML = `
  <div class="page-head"><div><h2>Library</h2><p>Catalogue, issue &amp; return, overdue tracking</p></div>
    ${canEdit?`<button class="btn btn-primary" id="addBook">${I.plus} Add Book</button>`:""}</div>
  <div class="grid grid-4" style="margin-bottom:16px">
    ${statCard(I.book,"#ecfdf5","#047857",DB.books.length,"Titles",totalCopies+" total copies")}
    ${statCard(I.lib,"#eff6ff","#1d4ed8",issuedCount,"Currently Issued","")}
    ${statCard(I.alert,"#fef2f2","#b91c1c",overdueCount,"Overdue","Needs follow-up")}
    ${statCard(I.users,"#fffbeb","#b45309",DB.loans.length,"All Transactions","")}
  </div>
  <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
    ${[["catalogue","Catalogue"],["loans","Issue & Return"],["overdue","Overdue"]].map(([k,l])=>`<button class="btn btn-sm lib-tab ${libTab===k?"btn-navy":""}" data-tab="${k}">${l}${k==="overdue"&&overdueCount?` (${overdueCount})`:""}</button>`).join("")}
  </div>
  <div id="libBody"></div>`;
  document.querySelectorAll(".lib-tab").forEach(b=>b.onclick=()=>{ libTab=b.dataset.tab; viewLibrary(); });
  const add = document.getElementById("addBook"); if(add) add.onclick = ()=>bookForm(null);
  if(libTab==="catalogue") renderCatalogue(canEdit);
  else if(libTab==="loans") renderLoans(canEdit);
  else renderOverdue();
}
function availOf(bookId){
  const b = DB.books.find(x=>x.id===bookId); if(!b) return 0;
  const out = DB.loans.filter(l=>l.book_id===bookId && !l.return_date).length;
  return Math.max(0, b.copies - out);
}
function renderCatalogue(canEdit){
  const body = document.getElementById("libBody");
  body.innerHTML = `${toolbarHTML("Search title, author, ISBN, category…","")}
    <div class="card"><div class="table-wrap" id="bookTable"></div></div>`;
  const render = ()=>{
    const rows = DB.books.filter(b=>{
      const hay = (b.title+" "+b.author+" "+b.isbn+" "+b.category+" "+b.shelf).toLowerCase();
      return !libQ || hay.includes(libQ);
    });
    document.getElementById("bookTable").innerHTML = rows.length ? `<table>
      <thead><tr><th>ISBN</th><th>Title</th><th>Author</th><th>Category</th><th>Shelf</th><th>Copies</th><th>Available</th><th style="text-align:right">Actions</th></tr></thead><tbody>
      ${rows.map(b=>{const av=availOf(b.id); return `<tr>
        <td class="mono">${esc(b.isbn)}</td>
        <td class="cell-main">${esc(b.title)}</td><td>${esc(b.author)}</td><td>${esc(b.category)}</td><td class="mono">${esc(b.shelf)}</td>
        <td class="mono">${b.copies}</td><td>${av>0?badge("Available"):badge("Issued out")}<span class="mono" style="margin-left:6px">${av}</span></td>
        <td><div class="row-actions">
          ${canEdit&&av>0?`<button class="btn btn-sm" data-issue="${b.id}">Issue</button>`:""}
          ${canEdit?`<button class="icon-btn" data-edit="${b.id}" title="Edit">${I.edit}</button><button class="icon-btn" data-del="${b.id}" title="Delete">${I.trash}</button>`:""}
        </div></td></tr>`;}).join("")}</tbody></table>` : emptyState("No books found","Add a book to the catalogue.");
    document.querySelectorAll("[data-issue]").forEach(b=>b.onclick=()=>issueForm(DB.books.find(x=>x.id==b.dataset.issue)));
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>bookForm(DB.books.find(x=>x.id==b.dataset.edit)));
    document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>confirmModal("Delete book","Delete this title from the catalogue?",()=>{
      DB.books = DB.books.filter(x=>x.id!=b.dataset.del); saveDB(); audit("Deleted a book title"); toast("Book deleted."); viewLibrary();
    }));
  };
  render();
  bindToolbar(v=>{libQ=v;render();}, ()=>{
    const rows=[["ISBN","Title","Author","Category","Shelf","Copies","Available"]];
    DB.books.forEach(b=>rows.push([b.isbn,b.title,b.author,b.category,b.shelf,b.copies,availOf(b.id)]));
    download("library-catalogue.csv", toCSV(rows), "text/csv"); toast("library-catalogue.csv downloaded.");
  });
}
function bookForm(b){
  const isNew = !b; b = b||{isbn:"978-955-"+String(1000+DB.books.length),title:"",author:"",category:"Islamic Studies",shelf:"",copies:1};
  const close = openModal(isNew?"Add Book":"Edit Book", `
    <form id="bookForm"><div class="form-grid">
      ${field("ISBN", inp("isbn",b.isbn,"text","required"))}
      ${field("Title", inp("title",b.title,"text","required"), true)}
      ${field("Author", inp("author",b.author,"text"))}
      ${field("Category", inp("category",b.category,"text","required"))}
      ${field("Shelf", inp("shelf",b.shelf,"text","required"))}
      ${field("Copies", inp("copies",b.copies,"number","min=1 required"))}
    </div></form>`,
    `<button class="btn" id="bfCancel">Cancel</button><button class="btn btn-primary" id="bfSave">Save Book</button>`);
  document.getElementById("bfCancel").onclick = close;
  document.getElementById("bfSave").onclick = ()=>{
    const f = document.getElementById("bookForm"); if(!f.reportValidity()) return;
    const d = Object.fromEntries(new FormData(f).entries());
    const data = {isbn:d.isbn,title:d.title,author:d.author,category:d.category,shelf:d.shelf,copies:Math.max(1,Number(d.copies)||1)};
    if(isNew){ data.id = uid(); DB.books.push(data); audit("Added book "+data.title); }
    else { Object.assign(DB.books.find(x=>x.id===b.id), data); audit("Updated book "+data.title); }
    saveDB(); close(); toast("Book saved."); viewLibrary();
  };
}
function issueForm(book){
  const members = [...DB.students.map(s=>({name:s.name+" ("+s.class_name+")"})), ...DB.staff.map(s=>({name:s.full_name+" (Staff)"}))];
  const due = new Date(Date.now()+14*864e5).toISOString().slice(0,10);
  const close = openModal("Issue Book", `
    <form id="issueForm"><div class="form-grid">
      ${field("Book", inp("x", book.title,"text","disabled"), true)}
      ${field("Member", `<select class="input" name="member_name">${members.map(m=>`<option>${esc(m.name)}</option>`).join("")}</select>`)}
      ${field("Member Type", sel("member_type",["Student","Staff"],"Student"))}
      ${field("Issue Date", inp("issue_date",todayISO(),"date","required"))}
      ${field("Due Date (14 days)", inp("due_date",due,"date","required"))}
    </div></form>`,
    `<button class="btn" id="ifCancel">Cancel</button><button class="btn btn-primary" id="ifSave">Issue Book</button>`);
  document.getElementById("ifCancel").onclick = close;
  document.getElementById("ifSave").onclick = ()=>{
    const f = document.getElementById("issueForm"); if(!f.reportValidity()) return;
    if(availOf(book.id)<=0){ toast("No copies available.","err"); return; }
    const d = Object.fromEntries(new FormData(f).entries());
    DB.loans.push({id:uid(),book_id:book.id,member_type:d.member_type,member_name:d.member_name,issue_date:d.issue_date,due_date:d.due_date,return_date:null});
    saveDB(); audit("Issued '"+book.title+"' to "+d.member_name); close(); toast("Book issued."); viewLibrary();
  };
}
function loanRows(loans){
  const today = todayISO();
  return loans.length ? `<table><thead><tr><th>Book</th><th>Member</th><th>Issued</th><th>Due</th><th>Returned</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead><tbody>
    ${loans.map(l=>{const b=DB.books.find(x=>x.id===l.book_id);const od=!l.return_date&&l.due_date<today;
      return `<tr><td class="cell-main">${esc(b?b.title:"(deleted)")}</td><td>${esc(l.member_name)}<div class="cell-sub">${esc(l.member_type)}</div></td>
      <td class="mono">${fmtDate(l.issue_date)}</td><td class="mono">${fmtDate(l.due_date)}</td><td class="mono">${l.return_date?fmtDate(l.return_date):"—"}</td>
      <td>${l.return_date?badge("Returned"):od?badge("Overdue"):badge("Issued")}</td>
      <td><div class="row-actions">${!l.return_date?`<button class="btn btn-sm" data-return="${l.id}">Return</button>`:""}</div></td></tr>`;}).join("")}
  </tbody></table>` : emptyState("No transactions","Issue a book from the catalogue to get started.");
}
function bindReturns(){
  document.querySelectorAll("[data-return]").forEach(b=>b.onclick=()=>{
    const l = DB.loans.find(x=>x.id==b.dataset.return);
    l.return_date = todayISO(); saveDB(); audit("Returned a book ("+l.member_name+")"); toast("Book returned."); viewLibrary();
  });
}
function renderLoans(canEdit){
  const body = document.getElementById("libBody");
  const loans = [...DB.loans].sort((a,b)=>b.id-a.id);
  body.innerHTML = `<div class="card"><div class="table-wrap">${loanRows(loans)}</div></div>`;
  if(canEdit) bindReturns();
}
function renderOverdue(){
  const body = document.getElementById("libBody");
  const today = todayISO();
  const loans = DB.loans.filter(l=>!l.return_date && l.due_date<today).sort((a,b)=>a.due_date.localeCompare(b.due_date));
  body.innerHTML = `<div class="card"><div class="table-wrap">${loanRows(loans)}</div></div>`;
  bindReturns();
}

/* =========================================================================
   BACKUPS
   ========================================================================= */
function viewBackups(){
  const c = document.getElementById("content");
  c.innerHTML = `
  <div class="page-head"><div><h2>Backups</h2><p>Export, restore and review backup history — data lives in this browser</p></div></div>
  <div class="grid grid-2" style="margin-bottom:16px">
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:6px">Export Backup</h3>
      <p class="muted" style="font-size:12px;margin-bottom:14px">Download a full copy of students, staff, attendance, marks, timetable and library data.</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        <button class="btn btn-primary" id="bkJson">${I.download} Full JSON Backup (.json)</button>
        <button class="btn btn-navy" id="bkCsv">${I.download} Students CSV</button>
        <button class="btn" id="bkCsv2">${I.download} Staff CSV</button>
        <button class="btn" id="bkCsv3">${I.download} Library CSV</button>
      </div>
      <div class="kv" style="margin-top:16px">
        <div><span>Students</span><b>${DB.students.length}</b></div>
        <div><span>Staff</span><b>${DB.staff.length}</b></div>
        <div><span>Books</span><b>${DB.books.length}</b></div>
        <div><span>Loans</span><b>${DB.loans.length}</b></div>
      </div>
    </div>
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:6px">Restore Backup</h3>
      <p class="muted" style="font-size:12px;margin-bottom:14px">Upload a previously exported JSON file. This replaces all current data.</p>
      <input type="file" id="bkFile" accept=".json,application/json" class="input" />
      <div id="bkMsg" style="margin-top:10px"></div>
      <button class="btn btn-danger" id="bkRestore" style="margin-top:10px" disabled>Restore from File</button>
      <p class="muted" style="font-size:11px;margin-top:12px">Tip: export a backup before restoring, so you can go back if needed.</p>
    </div>
  </div>
  <div class="card card-pad">
    <h3 style="font-size:15px;margin-bottom:10px">Backup History</h3>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>Students</th><th>Staff</th><th>Books</th><th>Loans</th></tr></thead><tbody>
      ${DB.backup_history.map(h=>`<tr><td class="mono">${fmtDate(h.date)}</td><td>${esc(h.type)}</td><td class="mono">${h.counts.students}</td><td class="mono">${h.counts.staff}</td><td class="mono">${h.counts.books}</td><td class="mono">${h.counts.loans}</td></tr>`).join("")}
    </tbody></table></div>
  </div>`;
  const logBackup = (type)=>{
    DB.backup_history.unshift({id:uid(),date:todayISO(),type,counts:{students:DB.students.length,staff:DB.staff.length,books:DB.books.length,loans:DB.loans.length}});
    saveDB(); audit("Created backup ("+type+")");
  };
  document.getElementById("bkJson").onclick = ()=>{
    download("aldheeniyya-backup-"+todayISO()+".json", JSON.stringify(DB,null,2), "application/json");
    logBackup("Full JSON export"); toast("JSON backup downloaded."); viewBackups();
  };
  document.getElementById("bkCsv").onclick = ()=>{
    const rows=[["Admission Number","Name with Initials","Class Name","Date of Birth","Gender","Guardian Name","Guardian Contact","Address","Status"]];
    DB.students.forEach(s=>rows.push([s.admission_no,s.name,s.class_name,s.dob,s.gender,s.guardian,s.guardian_contact,s.address,s.status]));
    download("students.csv", toCSV(rows), "text/csv"); logBackup("Students CSV export"); toast("students.csv downloaded."); viewBackups();
  };
  document.getElementById("bkCsv2").onclick = ()=>{
    const rows=[["Staff Code","Full Name","Role","Department","Employment Type","Joining Date","Assigned Classes","Active"]];
    DB.staff.forEach(s=>rows.push([s.staff_code,s.full_name,s.role,s.department,s.employment_type,s.joining_date,(s.assigned_classes||[]).join("; "),s.is_active?"Yes":"No"]));
    download("staff.csv", toCSV(rows), "text/csv"); logBackup("Staff CSV export"); toast("staff.csv downloaded."); viewBackups();
  };
  document.getElementById("bkCsv3").onclick = ()=>{
    const rows=[["ISBN","Title","Author","Category","Shelf","Copies","Available"]];
    DB.books.forEach(b=>rows.push([b.isbn,b.title,b.author,b.category,b.shelf,b.copies,availOf(b.id)]));
    download("library.csv", toCSV(rows), "text/csv"); logBackup("Library CSV export"); toast("library.csv downloaded."); viewBackups();
  };
  let pending = null;
  document.getElementById("bkFile").onchange = e=>{
    const file = e.target.files[0]; pending = null;
    document.getElementById("bkRestore").disabled = true;
    document.getElementById("bkMsg").innerHTML = "";
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const data = JSON.parse(reader.result);
        if(!data || !Array.isArray(data.students) || !Array.isArray(data.staff)) throw new Error("Not a valid Al Dheeniyya backup file.");
        pending = data;
        document.getElementById("bkMsg").innerHTML = `<div class="alert alert-ok">Valid backup found: ${data.students.length} students, ${data.staff.length} staff, ${(data.books||[]).length} books.</div>`;
        document.getElementById("bkRestore").disabled = false;
      }catch(err){
        document.getElementById("bkMsg").innerHTML = `<div class="alert alert-error">${esc(err.message)}</div>`;
      }
    };
    reader.readAsText(file);
  };
  document.getElementById("bkRestore").onclick = ()=>{
    if(!pending) return;
    confirmModal("Restore backup","This will replace ALL current data with the backup file. Continue?",()=>{
      DB = pending; saveDB(); audit("Restored backup"); toast("Backup restored."); viewBackups();
    });
  };
}

/* =========================================================================
   ROLES & PERMISSIONS
   ========================================================================= */
function viewRoles(){
  const c = document.getElementById("content");
  const roles = Object.keys(DB.permissions);
  c.innerHTML = `
  <div class="page-head"><div><h2>Roles &amp; Permissions</h2><p>Control which modules each role can access (role-based access control)</p></div>
    <button class="btn" id="resetPerms">Reset to Role Defaults</button></div>
  <div class="card"><div class="table-wrap"><table class="perm-table">
    <thead><tr><th>Module</th>${roles.map(r=>`<th style="text-align:center">${esc(r)}</th>`).join("")}</tr></thead>
    <tbody>${MODULES.map(m=>`<tr><td>${esc(m.label)}</td>${roles.map(r=>`<td style="text-align:center"><input type="checkbox" data-role="${esc(r)}" data-mod="${m.key}" ${DB.permissions[r].includes(m.key)?"checked":""} aria-label="${esc(m.label)} for ${esc(r)}" /></td>`).join("")}</tr>`).join("")}</tbody>
  </table></div></div>
  <div class="card card-pad" style="margin-top:16px">
    <h3 style="font-size:15px;margin-bottom:10px">Users &amp; Accounts</h3>
    <div class="table-wrap"><table><thead><tr><th>Username</th><th>Full Name</th><th>Role</th><th>Status</th></tr></thead><tbody>
      ${DB.users.map(u=>`<tr><td class="mono">${esc(u.username)}</td><td class="cell-main">${esc(u.full_name)}</td><td>${esc(u.role)}</td><td>${badge(u.is_active?"Active":"Inactive")}</td></tr>`).join("")}
    </tbody></table></div>
    <p class="muted" style="font-size:12px;margin-top:10px">Changes take effect immediately. The Super Admin always keeps full access.</p>
  </div>`;
  document.querySelectorAll(".perm-table input").forEach(chk=>chk.onchange=()=>{
    const role = chk.dataset.role, mod = chk.dataset.mod;
    if(role==="Super Admin" && !chk.checked){ chk.checked=true; toast("Super Admin always has full access.","err"); return; }
    if(chk.checked){ if(!DB.permissions[role].includes(mod)) DB.permissions[role].push(mod); }
    else { DB.permissions[role] = DB.permissions[role].filter(x=>x!==mod); }
    saveDB(); audit("Updated permissions for "+role); toast("Permissions updated.");
  });
  document.getElementById("resetPerms").onclick = ()=>{
    confirmModal("Reset permissions","Restore default permissions for all roles?",()=>{
      DB.permissions = JSON.parse(JSON.stringify(DEFAULT_PERMS)); saveDB(); audit("Reset permissions to defaults"); toast("Permissions reset."); viewRoles();
    });
  };
}

/* =========================================================================
   SETTINGS
   ========================================================================= */
function viewSettings(){
  const c = document.getElementById("content");
  const s = DB.settings;
  c.innerHTML = `
  <div class="page-head"><div><h2>Settings</h2><p>College information, appearance and account</p></div></div>
  <div class="grid grid-2">
    <div class="card card-pad">
      <h3 style="font-size:15px;margin-bottom:12px">College Information</h3>
      <form id="settingsForm"><div class="form-grid">
        ${field("College Name", inp("college_name",s.college_name,"text","required"), true)}
        ${field("Location", inp("college_location",s.college_location,"text","required"))}
        ${field("Phone", inp("college_phone",s.college_phone,"tel"))}
        ${field("Email", inp("college_email",s.college_email,"email"))}
        ${field("Motto", inp("college_motto",s.college_motto,"text"), true)}
      </div>
      <button class="btn btn-primary" id="saveSettings" style="margin-top:14px">Save Settings</button></form>
    </div>
    <div>
      <div class="card card-pad" style="margin-bottom:16px">
        <h3 style="font-size:15px;margin-bottom:12px">Appearance</h3>
        <div style="display:flex;gap:10px;align-items:center">
          <button class="btn" id="themeLight">Light mode</button>
          <button class="btn" id="themeDark">Dark mode</button>
          <span class="muted" style="font-size:12px">Current: <b id="themeNow"></b></span>
        </div>
      </div>
      <div class="card card-pad" style="margin-bottom:16px">
        <h3 style="font-size:15px;margin-bottom:12px">Change Password</h3>
        <form id="passForm"><div class="form-grid">
          ${field("Current Password", inp("cur","","password","required"))}
          ${field("New Password", inp("nw","","password","required minlength=6"))}
          ${field("Confirm New Password", inp("cf","","password","required"))}
        </div>
        <div id="passMsg" style="margin-top:10px"></div>
        <button class="btn btn-navy" id="savePass" style="margin-top:10px">Update Password</button></form>
      </div>
      <div class="card card-pad" style="border-color:#fecaca">
        <h3 style="font-size:15px;margin-bottom:6px;color:var(--red)">Danger Zone</h3>
        <p class="muted" style="font-size:12px;margin-bottom:12px">Reset all data back to the original demo dataset.</p>
        <button class="btn btn-danger" id="resetData">Reset Demo Data</button>
      </div>
    </div>
  </div>`;
  const themeNow = ()=>{ document.getElementById("themeNow").textContent = document.documentElement.classList.contains("dark")?"Dark":"Light"; };
  themeNow();
  document.getElementById("themeLight").onclick = ()=>{ setTheme(false); themeNow(); };
  document.getElementById("themeDark").onclick = ()=>{ setTheme(true); themeNow(); };
  document.getElementById("saveSettings").onclick = e=>{
    e.preventDefault();
    const f = document.getElementById("settingsForm"); if(!f.reportValidity()) return;
    Object.assign(DB.settings, Object.fromEntries(new FormData(f).entries()));
    saveDB(); audit("Updated college settings"); applyBranding(); toast("Settings saved.");
  };
  document.getElementById("savePass").onclick = e=>{
    e.preventDefault();
    const f = document.getElementById("passForm"); if(!f.reportValidity()) return;
    const d = Object.fromEntries(new FormData(f).entries());
    const msg = document.getElementById("passMsg");
    if(d.cur !== currentUser.password){ msg.innerHTML = `<div class="alert alert-error">Current password is incorrect.</div>`; return; }
    if(d.nw !== d.cf){ msg.innerHTML = `<div class="alert alert-error">New passwords do not match.</div>`; return; }
    currentUser.password = d.nw; saveDB(); audit("Changed account password");
    msg.innerHTML = `<div class="alert alert-ok">Password updated successfully.</div>`; f.reset();
  };
  document.getElementById("resetData").onclick = ()=>{
    confirmModal("Reset demo data","All current data will be replaced with the original demo dataset. Continue?",()=>{
      DB = seedDB(); saveDB(); audit("Reset demo data"); toast("Demo data restored."); router();
    });
  };
}

/* ---------------- Theme & branding ---------------- */
function setTheme(dark){
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("aldheeniyya_theme", dark?"dark":"light");
}
function applyBranding(){
  document.getElementById("brandName").textContent = DB.settings.college_name;
  document.getElementById("brandSub").textContent = DB.settings.college_location;
  document.getElementById("brandMark").textContent = (DB.settings.college_name||"A").trim().charAt(0).toUpperCase();
  document.title = DB.settings.college_name + " — Management System";
}

/* ---------------- Shell ---------------- */
function showLogin(){
  document.getElementById("loginView").classList.remove("hidden");
  document.getElementById("appView").classList.add("hidden");
}
function showApp(){
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");
  document.getElementById("topUserName").textContent = currentUser.full_name;
  document.getElementById("topUserRole").textContent = currentUser.role + " · @" + currentUser.username;
  document.getElementById("topAvatar").textContent = initials(currentUser.full_name);
  document.getElementById("sideUser").innerHTML = `<b style="color:#fff">${esc(currentUser.full_name)}</b><br/>${esc(currentUser.role)}`;
  document.getElementById("year").textContent = new Date().getFullYear();
  applyBranding();
  if(!location.hash || location.hash==="#/") location.hash = "#/dashboard";
  router();
}

/* ---------------- Init ---------------- */
loadDB();
setTheme(localStorage.getItem("aldheeniyya_theme")==="dark");
document.getElementById("loginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;
  const err = document.getElementById("loginError");
  if(tryLogin(u,p)){ err.classList.add("hidden"); showApp(); }
  else { err.textContent = "Invalid username or password. Try a demo account below."; err.classList.remove("hidden"); }
});
document.getElementById("logoutBtn").onclick = logout;
document.getElementById("themeBtn").onclick = ()=>setTheme(!document.documentElement.classList.contains("dark"));
document.getElementById("menuBtn").onclick = ()=>{ document.getElementById("sidebar").classList.add("open"); document.getElementById("navBackdrop").classList.remove("hidden"); };
document.getElementById("navBackdrop").onclick = closeSidebar;

if(restoreSession()) showApp(); else showLogin();
