import{r as p,j as d,c as g}from"./vendor-Q07UWaJa.js";(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const I=[{id:1,pairId:1,word:"dog",flipped:!1},{id:2,pairId:1,word:"koira",flipped:!1},{id:3,pairId:2,word:"cat",flipped:!1},{id:4,pairId:2,word:"kissa",flipped:!1},{id:5,pairId:3,word:"bird",flipped:!1},{id:6,pairId:3,word:"lintu",flipped:!1},{id:7,pairId:4,word:"car",flipped:!1},{id:8,pairId:4,word:"auto",flipped:!1},{id:9,pairId:5,word:"house",flipped:!1},{id:10,pairId:5,word:"talo",flipped:!1}];function w(){const[a,c]=p.useState(n()),[s,t]=p.useState([]),[e,r]=p.useState(0);p.useEffect(()=>{if(s.length===2){const[i,o]=s;if(i.pairId!==o.pairId){r(1);const l=a.find(u=>u.id===i.id),f=a.find(u=>u.id===o.id);setTimeout(()=>{t([]),l.flipped=!1,f.flipped=!1,r(0)},1e3)}else t([])}},[s]);function n(){return I}function m(i){if(i.flipped||s.length>=2)return;const o=a.find(l=>l.id===i.id);o.flipped=!0,t([...s,i])}function h({card:i,onClick:o,flipped:l,flippedCards:f}){return d.jsx("div",{className:`card ${l?"flipped":""} ${f.includes(i)&&e?"redBorder":""}`,onClick:o,children:d.jsxs("div",{className:"card-inner",children:[d.jsx("div",{className:"card-front",children:"?"}),d.jsx("div",{className:"card-back",children:i.word})]})})}return d.jsx("div",{className:"App container app-container",children:d.jsx("div",{className:"grid grid-3",children:a.map(i=>d.jsx(h,{card:i,onClick:()=>m(i),flipped:i.flipped,flippedCards:s},i.id))})})}g(document.getElementById("root")).render(d.jsx(p.StrictMode,{children:d.jsx(w,{})}));
