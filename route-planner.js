/* Editable destinations for Japan Journey 2026. Fixed overall dates, unlimited splits within nine nights. */
(function routePlanner(){
"use strict";
const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const escAttr=esc;
const fromDate=i=>`2026-12-${String(i).padStart(2,"0")}`;
const short=d=>`Dec ${Number(String(d).slice(-2))}`;
const nights=s=>Math.max(0,(Date.parse(s.to+"T00:00:00Z")-Date.parse(s.from+"T00:00:00Z"))/86400000);
const list=()=>window.TripApp.getStayPlan();
const sorted=()=>[...list()].sort((a,b)=>a.from.localeCompare(b.from)||a.id.localeCompare(b.id));
const fmtEUR=n=>new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR"}).format(Number(n)||0);
const money=s=>{const n=Number(s.cost?.amount);return Number.isFinite(n)&&n>=0?n*(s.cost?.currency==="JPY"?window.TripApp.getExchangeRate():1):0};
const byDate=day=>sorted().find(s=>s.from<=day&&day<s.to);
const id=()=>`stay_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,9)}`;
const notify=msg=>window.TripApp.notify(msg);
function overviewBlock(){
const entries=sorted();
return entries.length?entries.map((s,i)=>`<div class="route-node ${i%2?"fuji":""}" style="flex:1 1 180px;min-width:0"><div class="tiny">${short(s.from).toUpperCase()}–${Number(s.to.slice(-2))} · ${nights(s)} ${nights(s)===1?"NIGHT":"NIGHTS"}</div><div class="big" style="overflow-wrap:anywhere">📍 ${esc(s.place||"Destination TBC")}</div><div class="desc">${esc(s.hotel||"Hotel not selected")}</div></div>`).join(""):`<div class="empty">No destinations yet. Open Destinations & budget to add one.</div>`;
}
function renderHeader(){
const entries=sorted();
const h=$("#heroTripTitle"),chips=$("#heroTripChips"),brand=$("#routeSubtitle");
if(h)h.textContent=entries.length?entries.map(s=>s.place.trim()||"Destination TBC").join(" · "):"Plan your Japan journey";
if(chips)chips.innerHTML=entries.map(s=>`<span class="chip light">📍 ${esc(s.place||"Destination TBC")} · ${nights(s)} ${nights(s)===1?"night":"nights"} · ${short(s.from)}–${Number(s.to.slice(-2))}</span>`).join("")+'<span class="chip light">💶 Budget in EUR</span>';
if(brand)brand.textContent=entries.length?entries.map(s=>s.place.trim()||"TBC").join(" → "):"Destinations to be decided";
const mainStats=$$("#stats .stat");
if(mainStats.length>=4){
mainStats[1].querySelector(".stat-label").textContent="Fixed travel dates · Dec 13–22";
mainStats[2].querySelector(".num").textContent=String(entries.length);
mainStats[2].querySelector(".stat-label").textContent="Editable destination stays";
mainStats[3].querySelector(".num").textContent=fmtEUR(window.TripApp.getTotalBudget());
}
const side=$("#sidebar .panel");
if(side){
const previous=side.querySelector(".side-title");
if(previous&&previous.textContent.includes("Accommodation overview")){
 const title=previous.outerHTML;
 side.innerHTML=title+entries.map((s,i)=>`<div class="stay"><div class="stay-ic">📍</div><div><strong>${esc(s.place||"Destination TBC")}</strong><small>${short(s.from)} → ${short(s.to)} · ${nights(s)} ${nights(s)===1?"night":"nights"}</small><div style="font-weight:720;font-size:12px">${esc(s.hotel||"Hotel TBD")}</div><span class="chip ${s.booking==="booked"?"teal":s.booking==="pending"?"orange":"muted"}" style="margin-top:6px">${s.booking==="booked"?"✓ Booked":s.booking==="pending"?"Undecided":"Selected · not booked"}</span></div></div>`).join("")+'<button class="btn soft" style="width:100%;margin-top:12px" data-nav="budget">Edit destinations & costs →</button>';
}
}
}
function coverage(){
const issues={gaps:[],overlap:[]};
for(let i=13;i<22;i++){
 const d=fromDate(i),count=list().filter(s=>s.from<=d&&s.to>d).length;
 if(!count)issues.gaps.push(short(d));
 if(count>1)issues.overlap.push(short(d));
}
return issues;
}
function stayCard(s,i){
return `<div class="accommodation" data-route-stay-card="${escAttr(s.id)}">
<div class="hrow"><div><strong>📍 Stay ${i+1} · ${esc(s.place||"Destination TBC")}</strong><div class="hint">${short(s.from)} → ${short(s.to)} · ${nights(s)} ${nights(s)===1?"night":"nights"}</div></div><div style="display:flex;flex-wrap:wrap;gap:6px"><button class="btn small soft" type="button" data-split-stay="${escAttr(s.id)}" ${nights(s)<2?"disabled":""}>＋ Split</button><button class="btn small danger" type="button" data-delete-stay="${escAttr(s.id)}">Remove</button></div></div>
<div class="fields">
<div class="field"><label>Destination / city</label><input data-stay-field="place" data-stay-id="${escAttr(s.id)}" value="${escAttr(s.place)}" maxlength="80" placeholder="e.g. Kyoto or Hakone"></div>
<div class="field"><label>Hotel / accommodation</label><input data-stay-field="hotel" data-stay-id="${escAttr(s.id)}" value="${escAttr(s.hotel)}" maxlength="120" placeholder="Enter any hotel name"></div>
<div class="field"><label>Check-in</label><input data-stay-field="from" data-stay-id="${escAttr(s.id)}" type="date" min="2026-12-13" max="2026-12-21" value="${escAttr(s.from)}"></div>
<div class="field"><label>Check-out</label><input data-stay-field="to" data-stay-id="${escAttr(s.id)}" type="date" min="2026-12-14" max="2026-12-22" value="${escAttr(s.to)}"></div>
<div class="field"><label>Booking status</label><select data-stay-field="booking" data-stay-id="${escAttr(s.id)}">${[["pending","Undecided"],["selected","Selected, not yet booked"],["booked","Booked / confirmed"]].map(([v,l])=>`<option value="${v}" ${s.booking===v?"selected":""}>${l}</option>`).join("")}</select></div>
<div class="field"><label>Accommodation cost</label><div class="budget-entry" style="border:0;padding:0"><input data-stay-cost="${escAttr(s.id)}" class="money-input" type="number" min="0" step="0.01" value="${escAttr(s.cost?.amount||"")}" placeholder="Full amount"><select data-stay-currency="${escAttr(s.id)}" aria-label="Accommodation currency"><option value="EUR" ${s.cost?.currency!=="JPY"?"selected":""}>EUR €</option><option value="JPY" ${s.cost?.currency==="JPY"?"selected":""}>JPY ¥</option></select></div><span class="hint">≈ <b data-stay-eur="${escAttr(s.id)}">${fmtEUR(money(s))}</b></span></div>
</div></div>`;
}
function editorHtml(){
const a=sorted(),issues=coverage();
const note=issues.gaps.length||issues.overlap.length?`<div class="side-note"><strong>Please check your dates.</strong> ${issues.gaps.length?"Uncovered nights: "+esc(issues.gaps.join(", "))+".":""} ${issues.overlap.length?"Overlapping nights: "+esc(issues.overlap.join(", "))+".":""}</div>`:'<div class="guide">✓ All nine nights are covered without overlap.</div>';
return `<section class="panel" id="stayEditor"><div class="hrow"><div><h2 class="section-title">Destinations & accommodation</h2><p class="section-sub">The trip lasts Dec 13–22, 2026. Add or split as many stays as you need; change cities, hotel names and check-in/out dates within this window.</p></div><button class="btn primary" type="button" data-add-stay>＋ Add destination</button></div>${note}${a.map(stayCard).join("")||'<div class="empty">No destinations. Add the first stay.</div>'}<div class="guide">Add destination automatically splits the longest stay when every night is covered. Splitting does not divide an existing hotel cost: review accommodation budgets afterward. The daily activities were drafted for the original route and do not change automatically.</div></section>`;
}
function adjustBudgetUI(){
const main=$("#main");
if(!main||!$("#main .accommodation"))return;
const panels=$$("#main > section.panel");
if(!panels.length)return;
if(!$("#stayEditor")){
const wrap=document.createElement("div");
wrap.innerHTML=editorHtml();
panels[0].replaceWith(wrap.firstElementChild);
}
const costs=$$("#main .budget-row");
for(const row of costs){
 if(row.querySelector('[data-cost="kobe"],[data-cost="fuji"],[data-cost="tokyo"]'))row.remove();
}
const budgetTitle=$("#main .budget-table")?.closest(".panel");
if(budgetTitle){
const heading=budgetTitle.querySelector(".section-sub");
if(heading)heading.textContent="Accommodation costs are entered in each destination above. Enter your other expenses in EUR or JPY.";
const total=budgetTitle.querySelector("#budgetTotal");if(total)total.textContent=fmtEUR(window.TripApp.getTotalBudget());
}
}
function adjustOverviewUI(){
const route=$("#main .route");
if(route){route.classList.add("stay-dynamic-route");route.style.display="flex";route.style.flexWrap="wrap";route.style.gap="10px";route.innerHTML=overviewBlock();}
const h=$("#main .hrow .section-sub");
if(h&&h.textContent.includes("Hotel Okura Kobe"))h.textContent="Your travel dates are fixed, but the number of destinations, nights per stay and hotels are fully editable.";
const btn=$('#main [data-nav="fuji"]');
if(btn&&btn.textContent.includes("Compare Fuji")){btn.dataset.nav="budget";btn.textContent="Edit destinations ↗";}
const cards=$$("#main [data-daynav]");
if(cards.length){
for(const card of cards){
 const day=card.dataset.daynav,stay=byDate(day);
 const label=card.querySelector(".day-card-title");
 if(label&&stay)label.textContent=stay.place||"Destination TBC";
}
}
}
function adjustItineraryUI(){
const editor=$("#main .editor-heading h2"),dayPill=$("#main .date-pill.active");
if(editor&&dayPill){
 const date=fromDate(Number(dayPill.querySelector("strong")?.textContent||13));
 const stay=byDate(date);
 if(stay)editor.textContent=`December ${Number(date.slice(-2))} · ${stay.place||"Destination TBC"}`;
}
const schedule=$("#main .schedule");
if(schedule&&!$("#routeLegacyWarning")){
 schedule.insertAdjacentHTML("afterbegin",'<div class="side-note" id="routeLegacyWarning">These daily activities were drafted for the original Kobe → Mount Fuji → Tokyo route. If you have changed your destinations, please review or remove any outdated activities here.</div>');
}
}
function render(){
renderHeader();
const active=$(".tab.active")?.dataset.tab;
if(active==="budget")adjustBudgetUI();
if(active==="overview")adjustOverviewUI();
if(active==="itinerary")adjustItineraryUI();
}
function persist(stays,rerender=true){
window.TripApp.setStayPlan(stays,rerender);
if(!rerender)renderHeader();
}
function splitStay(stayId){
const stays=list(),x=stays.find(s=>s.id===stayId);
if(!x||nights(x)<2)return notify("Choose a stay of at least two nights to split.");
if(stays.length>=20)return notify("You can have at most 20 stay entries.");
const cut=Number(x.from.slice(-2))+Math.floor(nights(x)/2);
const boundary=fromDate(cut);
const next={id:id(),from:boundary,to:x.to,place:"New destination",hotel:"",booking:"pending",cost:{amount:"",currency:"EUR"}};
x.to=boundary;
stays.push(next);
persist(stays);
notify("Stay split. Edit the new destination and hotel.");
}
function addStay(){
const stays=list();
if(stays.length>=20)return notify("Maximum 20 stays reached.");
const gap=Array.from({length:9},(_,i)=>fromDate(i+13)).find(day=>!stays.some(s=>s.from<=day&&s.to>day));
if(gap){
let end=Number(gap.slice(-2))+1;
while(end<22&&!stays.some(s=>s.from<=fromDate(end)&&s.to>fromDate(end)))end++;
stays.push({id:id(),from:gap,to:fromDate(end),place:"New destination",hotel:"",booking:"pending",cost:{amount:"",currency:"EUR"}});
persist(stays);
return notify("Destination added. Enter its city and hotel.");
}
const longest=[...stays].sort((a,b)=>nights(b)-nights(a))[0];
if(longest&&nights(longest)>=2)return splitStay(longest.id);
notify("Each of the nine nights already has its own stay. Remove or combine a stay first.");
}
function checkDates(from,to){
return /^\d{4}-\d{2}-\d{2}$/.test(from)&&/^\d{4}-\d{2}-\d{2}$/.test(to)&&from>="2026-12-13"&&to<="2026-12-22"&&from<to;
}
function summary(data){
const stays=[...(data.stays||[])].sort((a,b)=>a.from.localeCompare(b.from));
const lines=["JAPAN TRIP | DEC 13–22, 2026","",...stays.map(s=>`${short(s.from)}–${short(s.to)}: ${s.place||"Destination TBD"} · ${s.hotel||"Hotel TBD"} (${s.booking})`),""];
lines.push(`Budget: ${fmtEUR(window.TripApp.getTotalBudget())}`,"","Daily activities:");
for(const item of data.activities||[])lines.push(`${item.date} ${item.time} ${item.title}`);
return lines.join("\n");
}
document.addEventListener("click",e=>{
const add=e.target.closest("[data-add-stay]");if(add){addStay();return;}
const split=e.target.closest("[data-split-stay]");if(split){splitStay(split.dataset.splitStay);return;}
const del=e.target.closest("[data-delete-stay]");
if(del&&confirm("Remove this stay? Its accommodation cost will no longer count, and any uncovered nights will be flagged.")){persist(list().filter(x=>x.id!==del.dataset.deleteStay));notify("Destination removed.");}
});
document.addEventListener("input",e=>{
const t=e.target;
const sid=t.dataset.stayId;
if(sid&&["place","hotel"].includes(t.dataset.stayField)){
const stays=list(),s=stays.find(x=>x.id===sid);if(!s)return;
s[t.dataset.stayField]=t.value;
persist(stays,false);
const title=t.closest(".accommodation")?.querySelector("strong");
if(title&&t.dataset.stayField==="place")title.textContent="📍 Stay "+(sorted().findIndex(x=>x.id===sid)+1)+" · "+(s.place||"Destination TBC");
return;
}
if(t.dataset.stayCost){
const stays=list(),s=stays.find(x=>x.id===t.dataset.stayCost);if(!s)return;
s.cost.amount=t.value;persist(stays,false);
const total=$("[data-stay-eur='"+t.dataset.stayCost+"']");if(total)total.textContent=fmtEUR(money(s));
const mainTotal=$("#budgetTotal");if(mainTotal)mainTotal.textContent=fmtEUR(window.TripApp.getTotalBudget());
}
});
document.addEventListener("change",e=>{
const t=e.target,field=t.dataset.stayField;
if(field==="from"||field==="to"||field==="booking"){
const stays=list(),s=stays.find(x=>x.id===t.dataset.stayId);if(!s)return;
const changed={...s,[field]:t.value};
if((field==="from"||field==="to")&&!checkDates(changed.from,changed.to)){
notify("Check-in and check-out must be valid dates within Dec 13–22.");
t.value=s[field];return;
}
s[field]=t.value;persist(stays);return;
}
if(t.dataset.stayCurrency){
const stays=list(),s=stays.find(x=>x.id===t.dataset.stayCurrency);if(!s)return;
s.cost.currency=t.value==="JPY"?"JPY":"EUR";persist(stays);return;
}
if(t.dataset.stayCost){persist(list());return;}
if(t.dataset.stayId&&["place","hotel"].includes(field)){persist(list());return;}
});
window.TripRoutes={render,renderHeader,summary};
render();
})();
