import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_META, renderPage, faqData } from '../src/lib/render-page.mjs';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const site=load('src/lib/site.json');
const photos=load('src/lib/photos.json');
const social=load('src/lib/social-links.json');
let env={...process.env};
for(const name of ['.env','.env.local']){
 const p=path.join(root,name);
 if(!fs.existsSync(p))continue;
 for(const line of fs.readFileSync(p,'utf8').split(/\r?\n/)){
  const m=line.match(/^\s*(VITE_[A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if(m) env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');
 }
}
const origin=String(env.VITE_SITE_URL||'').replace(/\/$/,'').trim();
const approved=env.VITE_PUBLICATION_APPROVED==='true';
const validOrigin=/^https:\/\/[a-z0-9][a-z0-9.-]+\.[a-z]{2,}$/i.test(origin)&&!/(vercel\.app|pages\.dev|localhost|example\.(com|org)|127\.0\.0\.1)/i.test(origin);
if(approved&&!validOrigin) throw new Error('Publication approval requires an authorized custom HTTPS domain in VITE_SITE_URL.');
const indexable=approved&&validOrigin;
const h = str => String(str??'').replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const jsonld = data=>JSON.stringify(data).replaceAll('<','\\u003c');
const addr=`${site.street}, ${site.city}, ${site.stateCode} ${site.postalCode}`;
const routeUrl=r=>`${origin}${r==='/'?'/':`${r}/`}`;
const localBusiness={
 '@context':'https://schema.org',
 '@type':'ChildCare',
 name:site.name,
 identifier:site.license,
 telephone:site.phoneHref,
 email:site.email,
 address:{'@type':'PostalAddress',streetAddress:site.street,addressLocality:site.city,addressRegion:site.stateCode,postalCode:site.postalCode,addressCountry:'US'},
 hasMap:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`,
 areaServed:{'@type':'City',name:site.city},
 openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday'],opens:site.hoursOpening,closes:site.hoursClosing}],
 sameAs:[site.providerUrl]
};
if(indexable) localBusiness.url=routeUrl('/');
fs.writeFileSync(path.join(root,'public/site.css'),fs.readFileSync(path.join(root,'src/index.css'),'utf8'));
for(const route of Object.keys(PAGE_META)){
 const meta=PAGE_META[route];
 const canonical=indexable?routeUrl(route):'';
 const preload=route==='/'&&photos.hero?.src?`<link rel="preload" href="${h(photos.hero.src)}" as="image" fetchpriority="high">`:'';
 const websiteScript=route==='/'&&indexable?`<script type="application/ld+json">${jsonld({'@context':'https://schema.org','@type':'WebSite',name:site.name,url:routeUrl('/')})}</script>`:'';
 const breadcrumbs={'/':'Home','/programs':'Age groups','/about':'Our center','/faq':'FAQs','/contact':'Contact'};
 const breadcrumbScript=indexable&&route!=='/'?`<script type="application/ld+json">${jsonld({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:routeUrl('/')},{'@type':'ListItem',position:2,name:breadcrumbs[route],item:routeUrl(route)}]})}</script>`:'';
 const faqScript=route==='/faq'?`<script type="application/ld+json">${jsonld({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqData(site)})}</script>`:'';
 const html=`<!doctype html>
<html lang="en-US"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h(meta.title)}</title>
<meta name="description" content="${h(meta.description)}">
<meta name="theme-color" content="#bd4937">
<meta name="robots" content="${indexable?'index,follow,max-image-preview:large':'noindex,nofollow'}">
${canonical?`<link rel="canonical" href="${h(canonical)}">`:''}
<meta property="og:type" content="website"><meta property="og:site_name" content="Little Red's Learning Center">
<meta property="og:locale" content="en_US"><meta property="og:title" content="${h(meta.title)}"><meta property="og:description" content="${h(meta.description)}">
${canonical?`<meta property="og:url" content="${h(canonical)}"><meta property="og:image" content="${h(origin)}/og-card.png"><meta name="twitter:card" content="summary_large_image">`:'<meta name="twitter:card" content="summary">'}
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.pexels.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
${preload}<link rel="stylesheet" href="/site.css">
<script type="application/ld+json">${jsonld(localBusiness)}</script>${websiteScript}${breadcrumbScript}${faqScript}
<script src="/site.js" defer></script>
</head><body><div id="root">${renderPage(route,site,photos,social)}</div><script type="module" src="/src/main.tsx"></script></body></html>`;
 const dir=route==='/'?root:path.join(root,route.slice(1));
 fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'index.html'),html);
}
if(indexable){
 const urls=Object.keys(PAGE_META).map(r=>`  <url><loc>${routeUrl(r)}</loc></url>`).join('\n');
 fs.writeFileSync(path.join(root,'public/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
 fs.writeFileSync(path.join(root,'public/robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
}else{
 fs.rmSync(path.join(root,'public/sitemap.xml'),{force:true});
 fs.writeFileSync(path.join(root,'public/robots.txt'),'User-agent: *\nAllow: /\n');
}
console.log(`Generated ${Object.keys(PAGE_META).length} pages with ${indexable?'approved public SEO':'noindex review'} settings.`);
