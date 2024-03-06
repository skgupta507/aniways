exports.id=40,exports.ids=[40],exports.modules={68804:(e,t,s)=>{Promise.resolve().then(s.bind(s,12835)),Promise.resolve().then(s.bind(s,54809)),Promise.resolve().then(s.bind(s,32917)),Promise.resolve().then(s.bind(s,48967)),Promise.resolve().then(s.t.bind(s,89793,23)),Promise.resolve().then(s.bind(s,4778)),Promise.resolve().then(s.bind(s,18486))},2015:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,21323,23)),Promise.resolve().then(s.t.bind(s,44255,23)),Promise.resolve().then(s.t.bind(s,14481,23)),Promise.resolve().then(s.t.bind(s,86374,23)),Promise.resolve().then(s.t.bind(s,30034,23)),Promise.resolve().then(s.t.bind(s,25551,23))},12835:(e,t,s)=>{"use strict";s.r(t),s.d(t,{LoginModal:()=>i});var r=s(44463),a=s(258),o=s(69486),n=s(53588);let i=({children:e})=>(0,r.jsxs)(o.Dialog,{children:[r.jsx(o.DialogTrigger,{asChild:!0,children:r.jsx(n.z,{children:e??"Login"})}),(0,r.jsxs)(o.DialogContent,{children:[(0,r.jsxs)(o.DialogHeader,{children:[r.jsx(o.DialogTitle,{children:"Login using your MyAnimeList account"}),r.jsx(o.DialogDescription,{children:"This will allow you to import your anime list from MyAnimeList as well as sync your progress."})]}),(0,r.jsxs)(o.DialogFooter,{className:"gap-2",children:[r.jsx(o.DialogClose,{asChild:!0,children:r.jsx(n.z,{variant:"secondary",children:"Cancel"})}),r.jsx(n.z,{onClick:a.zB,children:"Log in with MyAnimeList"})]})]})]})},54809:(e,t,s)=>{"use strict";s.r(t),s.d(t,{LogoutModal:()=>i});var r=s(44463),a=s(258),o=s(69486),n=s(53588);let i=()=>(0,r.jsxs)(o.Dialog,{children:[r.jsx(o.DialogTrigger,{asChild:!0,children:r.jsx(n.z,{variant:"secondary",children:"Log Out"})}),(0,r.jsxs)(o.DialogContent,{children:[(0,r.jsxs)(o.DialogHeader,{children:[r.jsx(o.DialogTitle,{children:"Are you sure you want to log out?"}),r.jsx(o.DialogDescription,{children:"You will be logged out of your account."})]}),(0,r.jsxs)(o.DialogFooter,{className:"gap-2",children:[r.jsx(o.DialogClose,{asChild:!0,children:r.jsx(n.z,{variant:"secondary",children:"Cancel"})}),r.jsx(n.z,{onClick:a.w7,children:"Log Out"})]})]})]})},32917:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Providers:()=>l});var r=s(44463),a=s(258),o=s(8276),n=s(98758),i=s(82599);let l=e=>{let[t]=(0,i.useState)(()=>new o.S);return r.jsx(n.QueryClientProvider,{client:t,children:r.jsx(a.eA,{...e})})}},48967:(e,t,s)=>{"use strict";s.r(t),s.d(t,{SearchBar:()=>u});var r=s(44463),a=s(84740),o=s(75077),n=s(94583),i=s(3652),l=s(267),d=s.n(l),c=s(82599);let u=()=>{let e=(0,c.useRef)(null),t=(0,i.usePathname)(),s=(0,i.useSearchParams)(),l=(0,i.useRouter)(),u=s.get("query")||"",g=d()(e=>{if(""===e)return l.push("/");l.push(`/search?query=${e}`)},500);return(0,c.useEffect)(()=>{"/search"!==t&&e.current&&(e.current.value="")},[t,s]),(0,r.jsxs)("div",{className:"group relative",children:[r.jsx(a.I,{ref:e,placeholder:"Search for anime",className:(0,o.cn)("w-full pl-9 md:w-[264px] md:focus:w-[500px]"),defaultValue:u,onChange:e=>g(e.target.value)}),r.jsx(n.Z,{className:"text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform",size:18})]})}},4778:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Image:()=>n});var r=s(44463),a=s(75077),o=s(82599);let n=e=>{let[t,s]=(0,o.useState)(!1);return r.jsx("img",{...e,onError:s.bind(null,!0),className:(0,a.cn)(e.className,t&&"bg-background")})}},53588:(e,t,s)=>{"use strict";s.d(t,{z:()=>d});var r=s(44463),a=s(82599),o=s(7356),n=s(3229),i=s(75077);let l=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef(({className:e,variant:t,size:s,asChild:a=!1,...n},d)=>{let c=a?o.g7:"button";return r.jsx(c,{className:(0,i.cn)(l({variant:t,size:s,className:e})),ref:d,...n})});d.displayName="Button"},69486:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Dialog:()=>u,DialogClose:()=>m,DialogContent:()=>h,DialogDescription:()=>j,DialogFooter:()=>y,DialogHeader:()=>b,DialogOverlay:()=>f,DialogPortal:()=>x,DialogTitle:()=>v,DialogTrigger:()=>p,useDialogContext:()=>d});var r=s(44463),a=s(82599),o=s(56038),n=s(50909),i=s(75077);let l=a.createContext(void 0),d=()=>{let e=a.useContext(l);if(!e)throw Error("useDialogContext must be used within a DialogProvider");return e},c=({children:e,defaultValues:t})=>{let[s,o]=a.useState(t?.isOpen??!1);return a.useEffect(()=>{t?.isOpen!==void 0&&o(t.isOpen)},[t?.isOpen]),r.jsx(l.Provider,{value:{isOpen:s,setIsOpen:e=>{t?.setIsOpen?.(e),o(e)},open:()=>{t?.open?.(),o(!0)},close:()=>{t?.close?.(),o(!1)}},children:e})},u=e=>r.jsx(c,{defaultValues:{isOpen:e.open,setIsOpen:e.onOpenChange,open:e.onOpenChange?.bind(null,!0),close:e.onOpenChange?.bind(null,!1)},children:r.jsx(g,{...e})}),g=e=>{let{isOpen:t,setIsOpen:s}=d();return r.jsx(o.fC,{...e,open:t,onOpenChange:s})},p=o.xz,x=o.h_,m=o.x8,f=a.forwardRef(({className:e,...t},s)=>r.jsx(o.aV,{ref:s,className:(0,i.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80",e),...t}));f.displayName=o.aV.displayName;let h=a.forwardRef(({className:e,children:t,...s},a)=>(0,r.jsxs)(x,{children:[r.jsx(f,{}),(0,r.jsxs)(o.VY,{ref:a,className:(0,i.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",e),...s,children:[t,(0,r.jsxs)(o.x8,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",children:[r.jsx(n.Z,{className:"h-4 w-4"}),r.jsx("span",{className:"sr-only",children:"Close"})]})]})]}));h.displayName=o.VY.displayName;let b=({className:e,...t})=>r.jsx("div",{className:(0,i.cn)("flex flex-col space-y-1.5 text-center sm:text-left",e),...t});b.displayName="DialogHeader";let y=({className:e,...t})=>r.jsx("div",{className:(0,i.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...t});y.displayName="DialogFooter";let v=a.forwardRef(({className:e,...t},s)=>r.jsx(o.Dx,{ref:s,className:(0,i.cn)("text-lg font-semibold leading-none tracking-tight",e),...t}));v.displayName=o.Dx.displayName;let j=a.forwardRef(({className:e,...t},s)=>r.jsx(o.dk,{ref:s,className:(0,i.cn)("text-muted-foreground text-sm",e),...t}));j.displayName=o.dk.displayName},84740:(e,t,s)=>{"use strict";s.d(t,{I:()=>n});var r=s(44463),a=s(82599),o=s(75077);let n=a.forwardRef(({className:e,type:t,...s},a)=>r.jsx("input",{type:t,className:(0,o.cn)("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:a,...s}));n.displayName="Input"},18486:(e,t,s)=>{"use strict";s.r(t),s.d(t,{Toaster:()=>n,toast:()=>o.A});var r=s(44463),a=s(83280),o=s(74623);let n=({...e})=>{let{theme:t="system"}=(0,a.F)();return r.jsx(o.x,{theme:t,className:"toaster group",toastOptions:{classNames:{toast:"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",description:"group-[.toast]:text-muted-foreground",actionButton:"group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",cancelButton:"group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"}},...e})}},75077:(e,t,s)=>{"use strict";s.d(t,{cn:()=>o});var r=s(11038),a=s(2240);function o(...e){return(0,a.m6)((0,r.W)(e))}},31108:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>R,metadata:()=>M});var r=s(8061),a=s(61526),o=s.n(a),n=s(19034);s(99548);var i=s(45410),l=s(35236);let d=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\packages\ui\src\components\ui\sonner.tsx`),{__esModule:c,$$typeof:u}=d;d.default,(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\packages\ui\src\components\ui\sonner.tsx#toast`);let g=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\packages\ui\src\components\ui\sonner.tsx#Toaster`);s(45068);var p=s(56926),x=s(16340),m=s(97704),f=s(33850);let h=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\search-bar.tsx`),{__esModule:b,$$typeof:y}=h;h.default;let v=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\search-bar.tsx#SearchBar`),j=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\login-modal.tsx`),{__esModule:w,$$typeof:N}=j;j.default;let D=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\login-modal.tsx#LoginModal`),P=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\logout-modal.tsx`),{__esModule:k,$$typeof:C}=P;P.default;let S=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\logout-modal.tsx#LogoutModal`),z=async()=>{let e=await (0,n.Z1)((0,p.cookies)());return r.jsx("nav",{className:"bg-background border-border border-b",children:(0,r.jsxs)("div",{className:"container mx-auto flex flex-col justify-between px-3 md:container md:flex-row md:items-center",children:[(0,r.jsxs)("div",{className:"flex flex-col md:flex-row md:items-center md:gap-6",children:[(0,r.jsxs)(f.default,{href:"/",className:"flex items-center",children:[r.jsx(m.E,{src:"/logo.png",width:80,height:80,alt:"AniWays Logo",className:"-ml-3 h-20 w-20"}),r.jsx("h1",{className:"text-2xl font-bold",children:"AniWays"})]}),r.jsx("div",{className:"hidden md:block",children:r.jsx(v,{})})]}),(0,r.jsxs)("div",{className:"mb-3 flex flex-col gap-3 md:m-0 md:flex-row md:items-center",children:[r.jsx("div",{className:"block md:hidden",children:r.jsx(v,{})}),r.jsx("div",{className:"flex gap-3",children:e?(0,r.jsxs)(r.Fragment,{children:[r.jsx(x.z,{asChild:!0,children:r.jsx(f.default,{href:"/anime-list",children:"Anime List"})}),r.jsx(S,{})]}):r.jsx(D,{})})]})]})})},O=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\providers.tsx`),{__esModule:L,$$typeof:U}=O;O.default;let A=(0,l.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\apps\website\app\providers.tsx#Providers`),M={title:{default:"AniWays",template:"%s | AniWays"},description:"Another anime website but with a MyAnimeList Integration",icons:{icon:"/favicon"},metadataBase:new URL("https://aniways.vercel.app")};async function R({children:e}){let t=await (0,n.PR)((0,p.cookies)());return r.jsx("html",{lang:"en",className:"dark",children:r.jsx("body",{className:(0,i.cn)("min-h-screen",o().className),children:(0,r.jsxs)(A,{session:t,children:[r.jsx(z,{}),e,r.jsx(g,{})]})})})}},97704:(e,t,s)=>{"use strict";s.d(t,{E:()=>i});var r=s(35236);let a=(0,r.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\packages\ui\src\components\ui\aniways-image.tsx`),{__esModule:o,$$typeof:n}=a;a.default;let i=(0,r.createProxy)(String.raw`C:\Users\nasru\Desktop\Next Projects\aniways\packages\ui\src\components\ui\aniways-image.tsx#Image`)},16340:(e,t,s)=>{"use strict";s.d(t,{z:()=>d});var r=s(8061),a=s(20907),o=s(88027),n=s(81739),i=s(45410);let l=(0,n.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef(({className:e,variant:t,size:s,asChild:a=!1,...n},d)=>{let c=a?o.g7:"button";return r.jsx(c,{className:(0,i.cn)(l({variant:t,size:s,className:e})),ref:d,...n})});d.displayName="Button"},45410:(e,t,s)=>{"use strict";s.d(t,{cn:()=>o});var r=s(89445),a=s(57377);function o(...e){return(0,a.m6)((0,r.W)(e))}},99548:()=>{}};