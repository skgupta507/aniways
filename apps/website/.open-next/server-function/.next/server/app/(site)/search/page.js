(()=>{var e={};e.id=716,e.ids=[716],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},6005:e=>{"use strict";e.exports=require("node:crypto")},22037:e=>{"use strict";e.exports=require("os")},4074:e=>{"use strict";e.exports=require("perf_hooks")},12781:e=>{"use strict";e.exports=require("stream")},24404:e=>{"use strict";e.exports=require("tls")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},58367:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d});var r=t(72553),a=t(15319),i=t(7590),n=t.n(i),l=t(505),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);t.d(s,o);let d=["",{children:["(site)",{children:["search",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,64872)),"C:\\Users\\nasru\\Desktop\\Next Projects\\aniways\\apps\\website\\app\\(site)\\search\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,4106)),"C:\\Users\\nasru\\Desktop\\Next Projects\\aniways\\apps\\website\\app\\(site)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,59978,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,31108)),"C:\\Users\\nasru\\Desktop\\Next Projects\\aniways\\apps\\website\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,59978,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\nasru\\Desktop\\Next Projects\\aniways\\apps\\website\\app\\(site)\\search\\page.tsx"],u="/(site)/search/page",m={require:t,loadChunk:()=>Promise.resolve()},p=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(site)/search/page",pathname:"/search",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},32663:(e,s,t)=>{Promise.resolve().then(t.bind(t,157)),Promise.resolve().then(t.t.bind(t,89793,23)),Promise.resolve().then(t.bind(t,4778))},56928:()=>{},157:(e,s,t)=>{"use strict";t.r(s),t.d(s,{Pagination:()=>f});var r=t(44463),a=t(53588),i=t(82599),n=t(40009),l=t(75077);let o=n.zt,d=n.fC,c=n.xz,u=i.forwardRef(({className:e,sideOffset:s=4,...t},a)=>r.jsx(n.VY,{ref:a,sideOffset:s,className:(0,l.cn)("bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md",e),...t}));u.displayName=n.VY.displayName;var m=t(54742),p=t(7855),x=t(38722),h=t(3652);let f=({hasNext:e})=>{let s=(0,h.useSearchParams)(),t=(0,h.usePathname)(),i=Number(s.get("page")||"1"),n=e=>{let t=new URLSearchParams(s);return 1===e?t.delete("page"):t.set("page",String(e)),t.toString()};return r.jsx("div",{className:"grid grid-cols-3 place-items-center items-center",children:(0,r.jsxs)(o,{children:[(0,r.jsxs)(d,{children:[r.jsx(c,{asChild:!0,children:r.jsx(a.z,{size:"icon",variant:"ghost",disabled:1===i,className:(0,l.cn)(1===i&&"pointer-events-none opacity-50"),asChild:!0,children:r.jsx(x.default,{href:`${t}?${n(i-1)}`,children:r.jsx(m.Z,{})})})}),r.jsx(u,{children:r.jsx("p",{className:"text-sm",children:"Previous Page"})})]}),r.jsx("p",{className:"text-muted-foreground",children:i||1}),(0,r.jsxs)(d,{children:[r.jsx(c,{asChild:!0,children:r.jsx(a.z,{size:"icon",variant:"ghost",disabled:!e,className:(0,l.cn)(!e&&"pointer-events-none opacity-50"),asChild:!0,children:r.jsx(x.default,{href:`${t}?${n(i+1)}`,children:r.jsx(p.Z,{})})})}),r.jsx(u,{children:r.jsx("p",{className:"text-sm",children:"Next Page"})})]})]})})}},5617:(e,s,t)=>{"use strict";t.d(s,{b:()=>i});var r=t(8061),a=t(23440);let i=()=>r.jsx("ul",{className:"grid h-full grid-cols-2 gap-3 md:grid-cols-5",children:Array.from({length:20}).map((e,s)=>r.jsx(a.O,{className:"h-[262px] md:h-[440px]"},s))})},94737:(e,s,t)=>{"use strict";t.d(s,{D:()=>o});var r=t(8061),a=t(53750),i=t(33850),n=t(23440),l=t(97704);let o=e=>{let{animes:s,type:t}=e;return r.jsx("ul",{className:"grid h-full grid-cols-2 gap-3 md:grid-cols-5",children:s.map(e=>{let{title:s,lastEpisode:o,image:d,id:c}=e,u="home"===t?`/anime/${c}/episodes/${o}`:`/anime/${c}`;return r.jsx("li",{className:"bg-background border-border group rounded-md border p-2",children:(0,r.jsxs)(i.default,{href:u,className:"flex h-full flex-col gap-3",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsxs)("div",{className:"relative aspect-[450/650] w-full overflow-hidden rounded-md",children:[r.jsx(n.O,{className:"absolute z-0 h-full w-full rounded-md"}),r.jsx(l.E,{src:d,alt:s,width:450,height:650,className:"absolute h-full w-full object-cover"})]}),(0,r.jsxs)("div",{className:"bg-muted/70 pointer-events-none absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100",children:[r.jsx(a.Z,{className:"text-primary h-8 w-8"}),r.jsx("p",{className:"text-foreground mt-2 text-lg font-bold",children:"Watch Now"})]})]}),(0,r.jsxs)("div",{className:"flex flex-1 flex-col justify-between",children:[r.jsx("p",{className:"group-hover:text-primary line-clamp-2 text-xs transition md:text-sm",children:s}),r.jsx("p",{className:"text-muted-foreground mt-1 text-xs md:text-sm",children:"home"===t?`Episode ${o}`:`${o} episodes`})]})]})},e.title+e.lastEpisode+e.slug)})})}},4106:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});var r=t(8061);let a=({children:e})=>r.jsx("main",{className:"container mx-auto h-full min-h-screen px-3 pt-6 md:container",children:e})},54616:(e,s,t)=>{"use strict";t.d(s,{X:()=>i});var r=t(8061),a=t(23440);let i=()=>(0,r.jsxs)("div",{className:"grid h-[40px] w-full grid-cols-3 items-center md:w-[120px]",children:[r.jsx(a.O,{className:"h-full w-full"}),r.jsx(a.O,{className:"h-full w-full"}),r.jsx(a.O,{className:"h-full w-full"})]})},36594:(e,s,t)=>{"use strict";t.d(s,{t:()=>l});var r=t(35236);let a=(0,r.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\(site)\pagination.tsx`),{__esModule:i,$$typeof:n}=a;a.default;let l=(0,r.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\(site)\pagination.tsx#Pagination`)},64872:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>p,generateMetadata:()=>c});var r=t(8061),a=t(6526),i=t(20907),n=t(94737),l=t(5617),o=t(36594),d=t(54616);let c=async({searchParams:{query:e}})=>({title:`${e} - Search`,description:`Search for ${e} on AniWays`}),u=async({query:e,page:s})=>{let{animes:t}=await (0,a.DA)(e,s);return r.jsx(n.D,{animes:t,type:"search"})},m=async e=>{let{hasNext:s}=await (0,a.DA)(e.query,e.page);return r.jsx(o.t,{hasNext:s})},p=async({searchParams:{query:e,...s}})=>{let t=Number(s.page||"1");return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"mb-2 flex w-full flex-col justify-between gap-2 md:mb-5 md:flex-row md:items-center",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-2xl font-bold",children:"Search"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["Showing results for ",r.jsx("span",{className:"text-foreground",children:e})]})]}),r.jsx(i.Suspense,{fallback:r.jsx(d.X,{}),children:r.jsx(m,{page:t,query:e})},e+t+"-pagination")]}),r.jsx(i.Suspense,{fallback:r.jsx(l.b,{}),children:r.jsx(u,{query:e,page:t})},e+t)]})}},55550:(e,s,t)=>{"use strict";t.d(s,{db:()=>q,Z:()=>I,w:()=>a,schema:()=>r});var r={};t.r(r),t.d(r,{AnimeAgeRating:()=>j,AnimeSeason:()=>f,AnimeStatus:()=>N,AnimeType:()=>g,anime:()=>v,animeGenre:()=>b,animeRelations:()=>y,genreRelations:()=>w,video:()=>_,videoRelations:()=>P});var a=t(7978),i=t(80226),n=t(82042),l=t(24166),o=t(82671),d=t(2849),c=t(15605),u=t(50259),m=t(34103),p=t(5254),x=t(5948),h=t(48735);let f=(0,d.ys)("anime_season",["WINTER","SPRING","SUMMER","FALL"]),g=(0,d.ys)("anime_type",["TV","MOVIE","SPECIAL","OVA","ONA","MUSIC"]),N=(0,d.ys)("anime_status",["FINISHED_AIRING","CURRENTLY_AIRING","NOT_YET_AIRED"]),j=(0,d.ys)("anime_rating",["G","PG","PG_13","R","R_PLUS","RX"]),v=(0,c.af)("anime",{id:(0,u.L7)("id",{length:25}).primaryKey(),title:(0,m.fL)("title").notNull(),description:(0,m.fL)("description").notNull(),image:(0,m.fL)("image").notNull(),year:(0,p.uR)("year").notNull(),status:N("status").notNull(),slug:(0,m.fL)("slug").notNull(),lastEpisode:(0,p.uR)("last_episode"),updatedAt:(0,x.AB)("updated_at").notNull().defaultNow(),malAnimeId:(0,o._L)("mal_anime_id")},e=>({malAnimeIdx:(0,h.Kz)("anime_mal_anime_idx").on(e.malAnimeId),slugIdx:(0,h.Kz)("anime_slug_idx").on(e.slug)})),y=(0,l.lE)(v,({many:e})=>({genres:e(b,{relationName:"anime-genres"}),videos:e(_,{relationName:"anime-videos"})})),b=(0,c.af)("anime_genre",{id:(0,u.L7)("id",{length:25}).primaryKey(),animeId:(0,u.L7)("anime_id",{length:25}).notNull().references(()=>v.id),genre:(0,m.fL)("genre").notNull()}),w=(0,l.lE)(b,({one:e})=>({anime:e(v,{relationName:"anime-genres",fields:[b.id],references:[v.id]})})),_=(0,c.af)("video",{id:(0,u.L7)("id",{length:25}).primaryKey(),animeId:(0,u.L7)("anime_id",{length:25}).notNull().references(()=>v.id),episode:(0,p.uR)("episode").notNull(),slug:(0,m.fL)("slug").notNull(),title:(0,m.fL)("title"),createdAt:(0,x.AB)("created_at").defaultNow(),videoUrl:(0,m.fL)("video_url")},e=>({animeIdx:(0,h.Kz)("video_anime_idx").on(e.animeId)})),P=(0,l.lE)(_,({one:e})=>({anime:e(v,{relationName:"anime-videos",fields:[_.animeId],references:[v.id]})})),A=process.env.DATABASE_URL;if(!A)throw Error("DATABASE_URL is not set");let q=globalThis.db??(0,i.t)((0,n.Z)(A,{prepare:!1}),{schema:r}),I=q},6526:(e,s,t)=>{"use strict";t.d(s,{Mc:()=>n.Mc,db:()=>r.db,wX:()=>r.w,DA:()=>i,qt:()=>a,schema:()=>r.schema});var r=t(55550);async function a(e){let s=await r.Z.query.anime.findMany({where:({title:e,lastEpisode:s},{notLike:t,and:r,isNotNull:a})=>r(a(s),t(e,"%dub%"),t(e,"%Dub%")),orderBy:({updatedAt:e},{desc:s})=>s(e),offset:(e-1)*20,limit:21,with:{videos:!0}}),t=s.length>20;return t&&s.pop(),{recentlyReleased:s,hasNext:t}}async function i(e,s){let t=await r.Z.query.anime.findMany({where:({title:s,lastEpisode:t},{sql:r})=>r`SIMILARITY(${s}, ${e}) > 0.2 AND ${s} NOT LIKE '%Dub%' AND ${s} NOT LIKE '%dub%' AND ${t} IS NOT NULL`,orderBy:({title:s},{sql:t})=>t`SIMILARITY(${s}, ${e}) DESC`,limit:21,offset:(s-1)*20,with:{genres:!0}}),a=t.length>20;return a&&t.pop(),{animes:t,hasNext:a}}var n=t(59213)},23440:(e,s,t)=>{"use strict";t.d(s,{O:()=>i});var r=t(8061),a=t(45410);function i({className:e,...s}){return r.jsx("div",{className:(0,a.cn)("bg-muted animate-pulse rounded-md",e),...s})}}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[183,34,745,752,879,42,374,40],()=>t(58367));module.exports=r})();