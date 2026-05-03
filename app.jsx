const { useState, useEffect, useMemo, useRef } = React;

// ---------- Icons ----------
const Icon = {
  Menu: (p)=> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  Close: (p)=> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Play: (p)=> <svg viewBox="0 0 24 24" {...p}><path d="M8 5v14l11-7z"/></svg>,
  Check: (p)=> <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6L9 17l-5-5"/></svg>,
  Share: (p)=> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>,
  Pen: (p)=> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3l7 7-11 11H3v-7z"/></svg>,
  Dollar: (p)=> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M12 2v20M17 5H9.5A3.5 3.5 0 006 8.5v0A3.5 3.5 0 009.5 12h5a3.5 3.5 0 010 7H6"/></svg>,
  Lock: (p)=> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 118 0v3"/></svg>,
  Ticket: (p)=> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z"/><path d="M12 6v12"/></svg>,
  YT: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23 7.3a3 3 0 00-2.1-2.1C19 4.7 12 4.7 12 4.7s-7 0-8.9.5A3 3 0 001 7.3C.5 9.2.5 12 .5 12s0 2.8.5 4.7A3 3 0 003.1 18.8C5 19.3 12 19.3 12 19.3s7 0 8.9-.5A3 3 0 0023 16.7c.5-1.9.5-4.7.5-4.7s0-2.8-.5-4.7zM9.7 15.5V8.5l6 3.5-6 3.5z"/></svg>,
  IG: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  TT: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16 3c.4 2.4 2.2 4.1 4.5 4.3v3c-1.7 0-3.3-.5-4.5-1.4V15a6 6 0 11-6-6v3a3 3 0 103 3V3h3z"/></svg>,
  FB: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2h-3.5C10.9 2 9 3.9 9 6.5V10H6v4h3v8z"/></svg>,
  X: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18 3h3l-7.5 8.6L22 21h-6.8l-4.7-6-5.4 6H2l8-9.1L2 3h7l4.2 5.5z"/></svg>,
  WA: (p)=> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20 12a8 8 0 01-12 6.9L3 20l1.2-4.6A8 8 0 1120 12zm-8-6a6 6 0 00-5.1 9.1l.2.3-.6 2.3 2.3-.6.3.2A6 6 0 1012 6zm3.2 8.4c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1a4.7 4.7 0 01-2.4-2.1c-.2-.3.2-.3.5-1 .1-.1 0-.2 0-.3l-.6-1.4c-.1-.4-.3-.3-.5-.3H9c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.6 2.4 3.8 3.3 1.4.6 1.9.6 2.6.5.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.3-.2z"/></svg>,
};

// ---------- Site data ----------
const PAGES = [
  { id: "home",           label: "Home" },
  { id: "investigations", label: "Investigations" },
  { id: "mission",        label: "Mission" },
  { id: "team",           label: "Team" },
  { id: "tour",           label: "Tour" },
  { id: "petition",       label: "Petition" },
  { id: "donate",         label: "Donate" },
  { id: "tipoff",         label: "Tip-Off" },
  { id: "press",          label: "Press" },
  { id: "contact",        label: "Contact" },
];

const INVESTIGATIONS = [
  { title: "Inside a Bondi NDIS Provider: Cash, Kickbacks and a Locked Back Room", date: "Mar 14, 2026", views: "2.4M", featured: true, label: "INV-011 • 28 MIN" },
  { title: "The $6 Billion Shadow: How Fraud Became the Business Model", date: "Feb 28, 2026", views: "1.1M", label: "INV-010 • 22 MIN" },
  { title: "Operation Clock: A Plan Manager's Confession", date: "Feb 04, 2026", views: "980K", label: "INV-009 • 19 MIN" },
  { title: "Ghost Carers: We Tracked 40 Claims. None of the Workers Existed.", date: "Jan 18, 2026", views: "2.0M", label: "INV-008 • 24 MIN" },
  { title: "When the Regulator Doesn't Pick Up the Phone", date: "Dec 12, 2025", views: "760K", label: "INV-007 • 16 MIN" },
  { title: "Inside a $3.2M SIL House: One Resident. Six Staff on Paper.", date: "Nov 04, 2025", views: "1.5M", label: "INV-006 • 20 MIN" },
  { title: "Fake Invoices, Real Victims: The Parramatta File", date: "Oct 09, 2025", views: "820K", label: "INV-005 • 17 MIN" },
];

const TOUR_CITIES = [
  { city: "Sydney",    venue: "Venue TBA", when: "Aug 2026 — TBA" },
  { city: "Melbourne", venue: "Venue TBA", when: "Aug 2026 — TBA" },
  { city: "Brisbane",  venue: "Venue TBA", when: "Sep 2026 — TBA" },
  { city: "Perth",     venue: "Venue TBA", when: "Sep 2026 — TBA" },
  { city: "Adelaide",  venue: "Venue TBA", when: "Oct 2026 — TBA" },
  { city: "Canberra",  venue: "Venue TBA", when: "Oct 2026 — TBA" },
];

const LADDER = [
  { amt: 35,   desc: "One hour of investigation research" },
  { amt: 65,   desc: "Funds a Freedom of Information request" },
  { amt: 265,  desc: "One day of video production" },
  { amt: 550,  desc: "Private security on one investigation day" },
  { amt: 1500, desc: "A complete interstate investigation trip" },
];

// Stripe Payment Links — generated via Stripe MCP. Live mode.
// One link per amount × currency × frequency. submit_type=donate
// (URL is donate.stripe.com), redirects to /#thankyou on success.
const STRIPE_LINKS = {
  oneTime: {
    AUD: {
      35:   "https://donate.stripe.com/5kQ28qgVo8OTfv55FCbV60k",
      65:   "https://donate.stripe.com/00wdR89sWe9d96H2tqbV60l",
      265:  "https://donate.stripe.com/6oUaEWax06GL82D1pmbV60m",
      550:  "https://donate.stripe.com/5kQfZgeNgghler16JGbV60n",
      1500: "https://donate.stripe.com/6oUdR86gK3uzgz9gkgbV60o",
    },
    USD: {
      35:   "https://donate.stripe.com/4gM28qbB42qver1c40bV60p",
      65:   "https://donate.stripe.com/7sYdR820ue9dciT3xubV60q",
      265:  "https://donate.stripe.com/00w3cufRk0in5Uv6JGbV60r",
      550:  "https://donate.stripe.com/28EaEW34y6GLdmX8RObV60s",
      1500: "https://donate.stripe.com/7sY00i34yfdhciT2tqbV60t",
    },
  },
  monthly: {
    AUD: {
      35:   "https://donate.stripe.com/aFa5kC9sWc15ciTc40bV60u",
      65:   "https://donate.stripe.com/aFa4gy34y9SX5Uv9VSbV60v",
      265:  "https://donate.stripe.com/28E7sKeNg9SX6Yzec8bV60w",
      550:  "https://donate.stripe.com/cNi28q6gK8OT96HfgcbV60x",
      1500: "https://donate.stripe.com/14AcN4eNg1mrdmX2tqbV60y",
    },
    USD: {
      35:   "https://donate.stripe.com/fZu00iax00in6Yz4BybV60z",
      65:   "https://donate.stripe.com/cNiaEWeNg4yDfv57NKbV60A",
      265:  "https://donate.stripe.com/3cI3cu9sWaX1dmX9VSbV60B",
      550:  "https://donate.stripe.com/dRm4gy8oSe9dfv5aZWbV60C",
      1500: "https://donate.stripe.com/7sY8wOdJc8OT1Ef0libV60D",
    },
  },
};

const TICKER = [
  { who: "Margaret, 68 — Ballarat VIC", msg: "This is the fight my daughter deserves." },
  { who: "Anonymous donor", msg: "Donated $500 — keep going." },
  { who: "Jamal — Western Sydney", msg: "Signed the petition. Shared it with my union." },
  { who: "Rachel — disability support worker", msg: "You're saying what we can't say at work." },
  { who: "Anonymous tip-off", msg: "Submitted documents from a provider in Adelaide." },
  { who: "Tom & Lisa — Gold Coast", msg: "Donated $100. First of many." },
  { who: "Anita — Perth", msg: "Finally someone is taking this seriously." },
];

// ---------- Brand marks ----------
function Shield({size=36, color="#DA1333"}){
  return (
    <svg width={size} height={size*1.12} viewBox="0 0 64 72" aria-hidden="true">
      <path d="M32 2 L60 12 V36 C60 54 46 66 32 70 C18 66 4 54 4 36 V12 Z"
            fill="none" stroke={color} strokeWidth="4"/>
      <path d="M18 40 C22 30 28 24 36 22 C30 30 28 36 28 46 L20 46 Z" fill={color}/>
      <path d="M38 26 C44 30 46 36 44 44 L36 44 C38 38 38 32 38 26 Z" fill={color}/>
      <circle cx="42" cy="24" r="2" fill={color}/>
    </svg>
  );
}
function Logo({inverse=false}){
  const c = inverse ? "#fff" : "#DA1333";
  return (
    <div className="nav-logo" aria-label="NDIS Exposed">
      <Shield size={30} color={c}/>
      <div className="wm" style={{color:c}}>
        ndis
        <small style={{color:c}}>EXPOSED</small>
      </div>
    </div>
  );
}

// ---------- App shell ----------
function useRoute(){
  const [route, setRoute] = useState(()=> (location.hash.replace("#","") || "home"));
  useEffect(()=>{
    const f = ()=> setRoute(location.hash.replace("#","") || "home");
    window.addEventListener("hashchange", f);
    return ()=> window.removeEventListener("hashchange", f);
  },[]);
  const go = (id)=> { location.hash = id; window.scrollTo({top:0,behavior:"instant"}); };
  return [route, go];
}

function Nav(){
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Logo inverse/>
      </div>
    </header>
  );
}

function MobileMenu({open, close, go}){
  return (
    <div className={"mmenu"+(open?" open":"")} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="mmenu-top">
        <Logo inverse/>
        <button className="hamburger" onClick={close} aria-label="Close"><Icon.Close/></button>
      </div>
      <div className="mmenu-list">
        {PAGES.map(p=> <a key={p.id} className="mi" onClick={()=>{go(p.id);close();}}>{p.label}</a>)}
      </div>
      <div className="mmenu-cta">
        <button className="btn btn-ghost" onClick={()=>{go("petition");close();}}>Sign</button>
        <button className="btn btn-primary" onClick={()=>{go("donate");close();}}>Donate</button>
      </div>
    </div>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Shield size={34} color="#fff"/>
          <div style={{fontFamily:"'Archivo',sans-serif",fontWeight:900,color:"#fff",letterSpacing:"-0.01em",fontSize:20,lineHeight:1}}>
            ndis<br/><span style={{fontSize:11,letterSpacing:".22em"}}>EXPOSED</span>
          </div>
        </div>
        <p className="tagline" style={{marginTop:18}}>An independent, grassroots campaign holding the $52 billion National Disability Insurance Scheme accountable — funded by everyday Australians.</p>
      </div>
      <div className="container foot-bottom">
        <div>© Teller Consulting 2026 · All rights reserved.</div>
        <div style={{display:"flex",gap:16}}>
          <a>Privacy Policy</a>
          <a>Terms</a>
          <a>Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

function NewsletterInline(){
  const [v,setV]=useState(""); const [ok,setOk]=useState(false);
  return (
    <form onSubmit={e=>{e.preventDefault();if(v)setOk(true);}} style={{display:"flex",gap:8,marginTop:8}}>
      {ok ? <div style={{color:"#fff",fontSize:14,padding:"12px 0"}}>Thanks — you're on the list.</div> :
        <>
          <input aria-label="email" placeholder="you@email.com" value={v} onChange={e=>setV(e.target.value)} style={{height:40,background:"transparent",borderColor:"rgba(255,255,255,.24)",color:"#fff"}}/>
          <button className="btn btn-primary btn-sm" type="submit">Join</button>
        </>
      }
    </form>
  );
}

// ---------- Pieces ----------
function VideoCard({label, big=false}){
  return (
    <div className="video-card" style={big?{aspectRatio:"21/9"}:{}}>
      <div className="ph">
        <div className="bars"/>
        <div className="ph-label">[ {label} ]</div>
      </div>
      <div className="vmeta"><div className="vchip">Investigation</div></div>
      <button className="play" aria-label="Play"><Icon.Play/></button>
    </div>
  );
}

function CtaCard({icon, title, desc, lnk, onClick}){
  return (
    <div className="cta-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="ico">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="lnk">{lnk} →</div>
    </div>
  );
}

function Ticker(){
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((t,i)=>(
          <span key={i}><span className="dot"/><b>{t.who}</b> — {t.msg}</span>
        ))}
      </div>
    </div>
  );
}

// ---------- Petition context ----------
function usePetitionCounter(){
  const [count, setCount] = useState(32847);
  useEffect(()=>{
    const t = setInterval(()=> setCount(c=> c + (Math.random()<0.7?1:0)), 3500);
    return ()=> clearInterval(t);
  },[]);
  return [count, setCount];
}

// ---------- Pages ----------
function HomePage({go, count}){
  return (
    <>
      <section className="hero">
        <div className="hero-bg"><img src="assets/hero.jpg" alt=""/></div>
        <div className="hero-inner">
          <div className="eyebrow" style={{color:"#FF8093"}}>Independent investigation · Grassroots funded</div>
          <h1 className="display" style={{marginTop:14}}>Making fraud within the $52 billion NDIS unthinkable.</h1>
          <p className="sub">Funded by everyday Australians. Backed by over one million people. We're holding the scheme — and the people exploiting it — to public account.</p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={()=>go("petition")}>Sign the Petition</button>
            <button className="btn btn-ghost btn-lg" onClick={()=>go("investigations")}><Icon.Play style={{fill:"#fff",width:14,height:14}}/> Watch the Investigation</button>
          </div>
          <div className="hero-counter">
            <span className="pulse"/>
            <div>
              <div className="num">{count.toLocaleString()}</div>
              <div className="lbl">Australians have signed · Live</div>
            </div>
          </div>
        </div>
      </section>

      <section className="stat-strip">
        <div className="stats">
          <div className="stat"><div className="n">$52B</div><div className="l">The NDIS budget under investigation</div></div>
          <div className="stat"><div className="n">$6B+</div><div className="l">Estimated annual fraud</div></div>
          <div className="stat"><div className="n">1M+</div><div className="l">Australians reached</div></div>
          <div className="stat"><div className="n">$100K+</div><div className="l">Raised from grassroots donors</div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow">The Investigation</div>
          <h2 className="heading">The story mainstream media won't touch.</h2>
          <p className="lead">Eighteen months of undercover footage, documents, and whistleblower testimony. Released in public, frame-by-frame.</p>
          <VideoCard label="INV-011 — INSIDE A BONDI PROVIDER • 28:14" big/>
          <div style={{marginTop:18}}>
            <a className="lnk" style={{color:"var(--red)",fontWeight:800,fontSize:13,letterSpacing:".08em",textTransform:"uppercase",cursor:"pointer"}} onClick={()=>go("investigations")}>Watch all investigations →</a>
          </div>
        </div>
      </section>

      <section className="section off">
        <div className="container">
          <div className="eyebrow">Get Involved</div>
          <h2 className="heading">Four ways to make fraud unthinkable.</h2>
          <p className="lead">Every page ends with a choice — because every click has to count.</p>
          <div className="cta-grid">
            <CtaCard icon={<Icon.Pen/>}     title="Sign the Petition"    desc="Join 30,000+ Australians demanding a NACC investigation." lnk="Add your name" onClick={()=>go("petition")}/>
            <CtaCard icon={<Icon.Dollar/>}  title="Donate"               desc="Fund independent investigations the mainstream media won't touch." lnk="Give once or monthly" onClick={()=>go("donate")}/>
            <CtaCard icon={<Icon.Lock/>}    title="Submit a Tip-Off"     desc="Know something? Report NDIS fraud securely and confidentially." lnk="Open the portal" onClick={()=>go("tipoff")}/>
            <CtaCard icon={<Icon.Ticket/>}  title="Nick Shirley Tour"    desc="Six cities. One mission. Get notified when tickets drop." lnk="See tour dates" onClick={()=>go("tour")}/>
          </div>
        </div>
      </section>

      <Ticker/>

      <section className="section tight">
        <div className="container" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:40,alignItems:"center"}}>
          <div>
            <div className="eyebrow">Stay Across the Investigation</div>
            <h2 className="heading" style={{marginTop:10}}>Real updates. No spin.</h2>
            <p className="lead" style={{marginTop:10}}>Join 32,000 supporters getting investigation drops, NACC referrals, and campaign wins straight to their inbox. No spam. Unsubscribe anytime.</p>
          </div>
          <NewsletterBlock/>
        </div>
      </section>
    </>
  );
}

function NewsletterBlock(){
  const [v,setV]=useState(""); const [ok,setOk]=useState(false);
  return (
    <form onSubmit={e=>{e.preventDefault(); if(v) setOk(true);}} style={{background:"#fff",border:"1px solid var(--line)",padding:20,borderRadius:6}}>
      {ok ? (
        <div style={{padding:"20px 8px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"#E8F7ED",color:"#1A7F3A",display:"grid",placeItems:"center"}}><Icon.Check/></div>
          <div><b>Subscribed.</b><div style={{color:"var(--slate)",fontSize:14}}>Check your inbox to confirm.</div></div>
        </div>
      ) : (
        <>
          <label className="label">Email address</label>
          <div className="news" style={{maxWidth:"100%"}}>
            <input type="email" required placeholder="you@email.com" value={v} onChange={e=>setV(e.target.value)}/>
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </div>
          <label className="check" style={{marginTop:12}}>
            <input type="checkbox" defaultChecked/>
            <span>I agree to receive campaign updates from NDIS Exposed. We never share your email.</span>
          </label>
        </>
      )}
    </form>
  );
}

function InvestigationsPage({go}){
  const featured = INVESTIGATIONS.find(i=>i.featured);
  const rest = INVESTIGATIONS.filter(i=>!i.featured);
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Archive</div>
          <h1 className="heading">The Investigations.</h1>
          <p>Every story we've put on camera. Released in full. No paywalls, no edits for advertisers.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="inv-grid">
            <div className="inv-feat">
              <div className="inv-card" style={{padding:0}}>
                <VideoCard label={featured.label} big/>
                <div className="body">
                  <div className="meta" style={{marginBottom:4}}><b style={{color:"var(--red)"}}>NEW</b><span className="dot"/> {featured.date} <span className="dot"/> {featured.views} views</div>
                  <h3>{featured.title}</h3>
                </div>
              </div>
            </div>
            {rest.map((i,idx)=>(
              <div className="inv-card" key={idx}>
                <VideoCard label={i.label}/>
                <div className="body">
                  <h3>{i.title}</h3>
                  <div className="meta">{i.date} <span className="dot"/> {i.views} views</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:48,background:"var(--navy)",color:"#fff",borderRadius:6,padding:"36px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
            <div>
              <div className="eyebrow" style={{color:"#FF8093"}}>Help fund the next investigation</div>
              <div className="heading" style={{fontSize:28,marginTop:6}}>We've filmed 11. There are 40 more on the board.</div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={()=>go("donate")}>Donate</button>
          </div>
        </div>
      </section>
    </>
  );
}

function MissionPage({go}){
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">The Mission</div>
          <h1 className="heading">Why this campaign exists.</h1>
          <p>The NDIS is Australia's largest social program. It's also our least audited. This is how we change that.</p>
        </div>
      </div>
      <section className="section">
        <div className="container mission-body">
          <h3>The Problem</h3>
          <p>The National Disability Insurance Scheme costs Australians <b>$52 billion a year</b>. Independent estimates put annual fraud at <b>more than $6 billion</b> — money taken from the people it was meant to help. Plan managers billing for carers who never showed. Providers invoicing for services that never happened. SIL houses claiming six full-time staff for one resident.</p>
          <p>The victims are not abstract. They are people with disability, their families, and every Australian who paid into this scheme in good faith.</p>

          <h3>Why Nobody Acted</h3>
          <p>The Quality and Safeguards Commission is under-resourced and out-manoeuvred. The political class treats NDIS reform as electorally radioactive. And the mainstream press — dependent on government advertising and institutional access — has consistently looked away.</p>

          <h3>What We Are Doing</h3>
          <div className="pillar">
            <div className="no">01</div>
            <div><h4>Independent investigations</h4><p>On-the-ground, on-camera reporting. Released in full, free, without advertiser interference.</p></div>
          </div>
          <div className="pillar">
            <div className="no">02</div>
            <div><h4>Whistleblower protection</h4><p>A secure tip-off portal, legal support, and a commitment to never burn a source.</p></div>
          </div>
          <div className="pillar">
            <div className="no">03</div>
            <div><h4>NACC referral</h4><p>Every credible piece of evidence goes to the National Anti-Corruption Commission — on the public record.</p></div>
          </div>
          <div className="pillar">
            <div className="no">04</div>
            <div><h4>National tour</h4><p>Six cities with Nick Shirley. Taking the story to every Australian who cares — in person.</p></div>
          </div>
          <div className="pillar">
            <div className="no">05</div>
            <div><h4>The petition</h4><p>Tabled in Parliament. A number politicians cannot pretend not to see.</p></div>
          </div>

          <h3>What Success Looks Like</h3>
          <p>A formal NACC investigation opened. Legislative reform that makes fraud prosecutable in months, not decades. Provider deregistrations that stick. And an Australian public that no longer accepts "it's complicated" as an answer.</p>

          <h3>How You Can Help</h3>
          <p>Sign. Donate. Share. Submit a tip. Each one is a vote that this is no longer acceptable.</p>

          <div style={{marginTop:40,padding:"28px 28px",background:"var(--offwhite)",border:"1px solid var(--line)",borderRadius:6,display:"flex",gap:18,alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
            <div>
              <div className="heading" style={{fontSize:22}}>Add your name. Make fraud unthinkable.</div>
              <div style={{color:"var(--slate)",marginTop:4}}>Takes 30 seconds. Goes to Parliament.</div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={()=>go("petition")}>Sign the Petition</button>
          </div>
        </div>
      </section>
    </>
  );
}

function TeamPage(){
  const team = [
    { name:"Drew Pavlou", role:"Founder · Investigations", initials:"DP", bio:"I'm not here to be polite. I've spent the last five years being sued, threatened, and smeared for asking obvious questions. The NDIS is the largest unaudited transfer of public money in Australian history. We're going to put the receipts in front of the country, whether the political class likes it or not. If you care about people with disability, if you care about what this country spends half a trillion dollars on over a decade, you should be furious too. Fury is fuel. Use it."},
    { name:"Pete Zogoulas", role:"Co-Founder · Field Producer", initials:"PZ", bio:"I grew up around this. Family in disability care, friends in the sector, mates who became plan managers and watched the rules get written by the loudest voices in the room. This campaign is for the workers who know something is wrong and can't say it. It's for the parents on hold with the Commission for the fourth time this month. We're building a place where your voice is safe and your evidence actually goes somewhere."},
    { name:"James Flynn", role:"Director · Teller Consulting Group", initials:"JF", bio:"My job is the boring part — governance, compliance, and making sure every dollar is tracked to a line item. NDIS Exposed runs under formal US/Australian campaign consultancy standards because movements that handle public money without structure don't last. Every 30 days we publish KPIs. Every investigation is reviewed. Every claim is evidenced. That's the deal we make with donors, and it is non-negotiable."},
  ];
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">The Team</div>
          <h1 className="heading">The people behind the investigations.</h1>
          <p>Three founders. One independent, grassroots-funded campaign — operating under formal governance.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="team-grid">
            {team.map((t,i)=>(
              <div className="team-card" key={i}>
                <div className="portrait">
                  {i===0 ? <img src="assets/team-drew-pete.png" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"75% 20%"}}/> :
                   i===1 ? <img src="assets/team-drew-pete.png" alt="" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"30% 20%"}}/> :
                   <div className="ph-fill">{t.initials}</div>}
                </div>
                <h3>{t.name}</h3>
                <div className="role">{t.role}</div>
                <p>{t.bio}</p>
              </div>
            ))}
          </div>

          <div style={{marginTop:56,background:"var(--offwhite)",border:"1px solid var(--line)",borderRadius:6,padding:"28px 32px"}}>
            <div className="eyebrow">Governance</div>
            <p style={{margin:"8px 0 0",color:"var(--ink)",fontSize:16,lineHeight:1.6}}>This campaign is run with formal governance by <b>Teller Consulting Group Pty Ltd</b>, a US/Australian campaign consultancy. ABN 00 000 000 000. Registered charity review pending. All financials and KPIs are reported publicly every 30 days.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function TourPage(){
  const [subs, setSubs] = useState({});
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">The National Tour</div>
          <h1 className="heading">Six cities. One mission.</h1>
          <p>Nick Shirley, Drew Pavlou and Pete Zogoulas — live, on stage, in your city. Tickets drop in waves. Get notified first.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="tour-grid">
            {TOUR_CITIES.map((c,i)=>(
              <div key={i} className={"tour-card"+(subs[c.city]?" subscribed":"")}>
                <div className="city">{c.city}</div>
                <div className="venue">{c.venue}</div>
                <div className="date">{c.when}</div>
                {subs[c.city] ? (
                  <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8,color:"#1A7F3A",fontWeight:700,fontSize:14}}>
                    <Icon.Check style={{width:18,height:18}}/> You'll be notified for {c.city}
                  </div>
                ) : (
                  <button className="btn btn-secondary" onClick={()=>setActive(c.city)}>Notify Me</button>
                )}
              </div>
            ))}
          </div>

          {active && (
            <div style={{marginTop:28,background:"#fff",border:"1px solid var(--line)",borderRadius:6,padding:20,maxWidth:560}}>
              <div className="label">Notify me for {active}</div>
              <form onSubmit={e=>{e.preventDefault(); setSubs(s=>({...s,[active]:true})); setActive(null); setEmail("");}} style={{display:"flex",gap:8}}>
                <input type="email" required placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                <button className="btn btn-primary" type="submit">Notify me</button>
              </form>
            </div>
          )}

          <div style={{marginTop:64}}>
            <h2 className="heading" style={{fontSize:28,marginBottom:18}}>Tour FAQ</h2>
            <FAQ items={[
              { q:"What is the tour?", a:"Six live events across Australia's capital cities. Investigation screenings, Q&A with the founders, a keynote from Nick Shirley, and a town-hall-style conversation with local supporters."},
              { q:"Who is Nick Shirley?", a:"A US-based independent investigative filmmaker, headlining the tour alongside Drew and Pete. Nick's team has produced documentary work across three continents."},
              { q:"Are tickets free?", a:"Most seats will be free / name-your-price. A small number of front-row and meet-and-greet tickets fund the tour costs."},
              { q:"When do tickets go on sale?", a:"In waves, city-by-city. Subscribe above to get notified for your city first."},
            ]}/>
          </div>
        </div>
      </section>
    </>
  );
}
function FAQ({items}){
  const [open,setOpen]=useState(0);
  return (
    <div>
      {items.map((it,i)=>(
        <div key={i} style={{borderTop:"1px solid var(--line)"}}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 0",textAlign:"left"}}>
            <span style={{fontFamily:"'Archivo',sans-serif",fontWeight:800,fontSize:17,color:"var(--ink)"}}>{it.q}</span>
            <span style={{fontFamily:"'Archivo Black',sans-serif",color:"var(--red)",fontSize:24}}>{open===i?"–":"+"}</span>
          </button>
          {open===i && <p style={{margin:"0 0 18px",color:"var(--slate)",maxWidth:"72ch",fontSize:15,lineHeight:1.6}}>{it.a}</p>}
        </div>
      ))}
      <div style={{borderTop:"1px solid var(--line)"}}/>
    </div>
  );
}

function PetitionPage({go, count, bumpCount}){
  const [form,setForm]=useState({name:"",email:"",postcode:"",opt:true});
  const [signed,setSigned]=useState(false);
  const target = 500000;
  const pct = Math.min(100, (count/target)*100);

  function sign(e){
    e.preventDefault();
    if(!form.name || !form.email || !form.postcode) return;
    bumpCount();
    setSigned(true);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">The Petition</div>
          <h1 className="heading">Demand a NACC investigation into NDIS fraud.</h1>
          <p>Add your name to the petition being tabled in the Australian Parliament.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:40,alignItems:"start"}}>
          <div>
            <div className="pet-counter">
              <div style={{display:"flex",alignItems:"center",gap:10}}><span className="pulse"/><div className="eyebrow" style={{color:"#FF8093"}}>Signing now · Live</div></div>
              <div className="n">{count.toLocaleString()}</div>
              <div className="target">Australians have signed · Target {target.toLocaleString()}</div>
              <div className="progress"><div className="bar" style={{width:pct+"%"}}/></div>
            </div>

            <div style={{marginTop:32}}>
              <h2 className="heading" style={{fontSize:24,marginBottom:10}}>Why this petition matters</h2>
              <ul style={{margin:0,padding:"0 0 0 18px",color:"var(--ink)",lineHeight:1.7}}>
                <li>It forces a NACC referral the government cannot ignore.</li>
                <li>It gives Parliament a number — measured in signatures, not press releases.</li>
                <li>It protects whistleblowers by making this a public, national conversation.</li>
              </ul>
            </div>
            <div style={{marginTop:28}}>
              <div className="eyebrow">Who it goes to</div>
              <p style={{margin:"6px 0 0",color:"var(--slate)"}}>National Anti-Corruption Commission · Federal Parliament · Minister for the NDIS.</p>
            </div>
          </div>

          <div>
            {signed ? (
              <div className="thankyou">
                <div className="check-ico"><Icon.Check/></div>
                <h2 className="heading" style={{fontSize:26,margin:0}}>Thank you, {form.name.split(" ")[0] || "supporter"}.</h2>
                <p style={{color:"var(--slate)",marginTop:8}}>Your name has been added. Confirmation sent to {form.email}.</p>
                <div className="share-row">
                  <button className="btn btn-secondary btn-sm"><Icon.X style={{width:14,height:14}}/> Post on X</button>
                  <button className="btn btn-secondary btn-sm"><Icon.FB style={{width:14,height:14}}/> Facebook</button>
                  <button className="btn btn-secondary btn-sm"><Icon.WA style={{width:14,height:14}}/> WhatsApp</button>
                </div>
                <div style={{marginTop:28,padding:"22px 20px",borderRadius:6,background:"var(--navy)",color:"#fff",textAlign:"left"}}>
                  <div className="eyebrow" style={{color:"#FF8093"}}>Now help fund the fight</div>
                  <div className="heading" style={{fontSize:22,marginTop:6,marginBottom:10}}>You've added your name. A $25 donation pays for one hour of investigation research.</div>
                  <button className="btn btn-primary" onClick={()=>go("donate")}>Donate $25 →</button>
                </div>
              </div>
            ) : (
              <form onSubmit={sign} style={{background:"#fff",border:"1px solid var(--line)",borderRadius:6,padding:28}}>
                <div className="eyebrow">Add your name</div>
                <h3 className="heading" style={{fontSize:22,margin:"8px 0 18px"}}>Takes 30 seconds.</h3>
                <div className="pet-form">
                  <div>
                    <label className="label">Full name</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/>
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@email.com"/>
                  </div>
                  <div>
                    <label className="label">Postcode</label>
                    <input required value={form.postcode} onChange={e=>setForm({...form,postcode:e.target.value})} placeholder="2000"/>
                  </div>
                  <label className="check">
                    <input type="checkbox" checked={form.opt} onChange={e=>setForm({...form,opt:e.target.checked})}/>
                    <span>Keep me updated on the investigation and campaign progress. No spam.</span>
                  </label>
                  <button className="btn btn-primary btn-lg" type="submit" style={{width:"100%",marginTop:4}}>Sign Now</button>
                  <p style={{color:"var(--slate)",fontSize:12,margin:0,textAlign:"center"}}>Your details go to NACC and Parliament. Never sold.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function DonatePage(){
  const [sel, setSel] = useState(265);
  const [currency, setCurrency] = useState("AUD");
  const [frequency, setFrequency] = useState("oneTime");

  const checkoutUrl = (STRIPE_LINKS[frequency] && STRIPE_LINKS[frequency][currency] && STRIPE_LINKS[frequency][currency][sel]) || "";

  function handleDonate(e){
    e.preventDefault();
    if(!checkoutUrl){
      alert("Stripe Payment Link not yet configured for $"+sel+" "+currency+" "+(frequency==="monthly"?"monthly":"one-time")+".\n\nAdd the URL to STRIPE_LINKS in app.jsx.");
      return;
    }
    window.location.href = checkoutUrl;
  }

  const Toggle = ({value, onChange, options}) => (
    <div style={{display:"flex",gap:8}}>
      {options.map(o=>(
        <button key={o.value} type="button" onClick={()=>onChange(o.value)}
          className={"btn "+(value===o.value?"btn-primary":"btn-secondary")}
          style={{flex:1,height:44}}>
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Donate</div>
          <h1 className="heading">Fund the investigations the media won't touch.</h1>
          <p>100% grassroots. Zero government money.</p>
        </div>
      </div>
      <section className="section">
        <div className="container donate-grid">
          <div style={{minWidth:0}}>
            <div className="eyebrow">Impact ladder</div>
            <h2 className="heading" style={{fontSize:26,margin:"8px 0 18px"}}>Choose what your gift funds.</h2>
            <div className="ladder">
              {LADDER.map(r=>(
                <button key={r.amt} className={"rung"+(sel===r.amt?" sel":"")} onClick={()=>setSel(r.amt)}>
                  <div className="amt">${r.amt}</div>
                  <div className="desc">{r.desc}</div>
                </button>
              ))}
            </div>
            <div style={{marginTop:18}}>
              <Ticker/>
            </div>
          </div>

          <div className="donate-panel">
            <div style={{marginBottom:16}}>
              <label className="label">Currency</label>
              <Toggle value={currency} onChange={setCurrency} options={[
                {value:"AUD",label:"AUD"},{value:"USD",label:"USD"}
              ]}/>
            </div>
            <div style={{marginBottom:16}}>
              <label className="label">Frequency</label>
              <Toggle value={frequency} onChange={setFrequency} options={[
                {value:"oneTime",label:"One-time"},{value:"monthly",label:"Monthly"}
              ]}/>
            </div>
            <div style={{background:"#fff",border:"1px solid var(--line)",borderRadius:6,padding:22}}>
              <div className="label">Amount</div>
              <div style={{display:"flex",alignItems:"baseline",gap:10}}>
                <div style={{fontFamily:"'Archivo Black',sans-serif",fontSize:44,color:"var(--ink)"}}>${sel}</div>
                <div style={{color:"var(--slate)",fontSize:13}}>{currency}{frequency==="monthly"?" / month":""}</div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleDonate} style={{width:"100%",marginTop:16}}>
                Donate ${sel} {currency}{frequency==="monthly"?" / month":""}
              </button>
              <p style={{color:"var(--slate)",fontSize:12,margin:"12px 0 0",textAlign:"center"}}>Secure checkout powered by Stripe · Tax-deductibility pending DGR status</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ThankYouPage(){
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Thank you</div>
          <h1 className="heading">Your donation went through.</h1>
          <p>You just funded an investigation the media won't touch. A receipt is on its way to your inbox from Stripe.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{maxWidth:680}}>
          <div className="thankyou">
            <div className="check-ico"><Icon.Check/></div>
            <h2 className="heading" style={{fontSize:26,margin:0}}>Welcome to the fight.</h2>
            <p style={{color:"var(--slate)",marginTop:8,marginBottom:0}}>
              100% of your gift goes to investigations, legal costs and production. Every dollar is tracked to a line item and reported every 30 days.
            </p>
            <div className="share-row">
              <a className="btn btn-secondary" href="#">Make another donation</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TipOffPage(){
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({type:"",desc:"",rel:"",contact:"",files:""});
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Tip-Off Portal</div>
          <h1 className="heading">Report NDIS fraud — securely and confidentially.</h1>
          <p>Submissions are encrypted end-to-end. Your identity is never shared without your explicit consent.</p>
        </div>
      </div>
      <section className="section">
        <div className="container tip-wrap">
          <div>
            <div className="conf">
              <strong>Your identity will be protected.</strong>
              <p>We never share whistleblower information without your explicit consent. Submissions land in an encrypted secure drop, reviewed by one of three named founders only.</p>
            </div>
            {sent ? (
              <div className="thankyou" style={{textAlign:"left"}}>
                <div className="check-ico" style={{margin:0}}><Icon.Check/></div>
                <h2 className="heading" style={{fontSize:24,margin:"14px 0 6px"}}>Submission received.</h2>
                <p style={{color:"var(--slate)",margin:0}}>Reference #TX-{Math.floor(Math.random()*90000+10000)}. A founder will review within 72 hours. If you provided contact details, expect a secure reply.</p>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault(); setSent(true);}} style={{display:"grid",gap:14}}>
                <div>
                  <label className="label">Type of fraud</label>
                  <select required value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                    <option value="">Select a category</option>
                    <option>Phantom services (billed but not delivered)</option>
                    <option>Ghost workers (staff listed but not employed)</option>
                    <option>Kickbacks or cash-for-plan arrangements</option>
                    <option>SIL / group home abuse</option>
                    <option>Plan-manager misconduct</option>
                    <option>Regulatory cover-up</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Describe what you know</label>
                  <textarea required value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Names, dates, amounts, and any context you can share."/>
                </div>
                <div>
                  <label className="label">Supporting documents (optional)</label>
                  <div className="upload" onClick={()=>setForm({...form,files:"evidence.zip"})}>
                    {form.files ? <>✓ {form.files} attached (encrypted)</> : <>Drop files here or click to upload — PDF, JPG, PNG, ZIP up to 100MB</>}
                  </div>
                </div>
                <div className="row2">
                  <div>
                    <label className="label">Your relationship to the situation</label>
                    <select required value={form.rel} onChange={e=>setForm({...form,rel:e.target.value})}>
                      <option value="">Select</option>
                      <option>NDIS participant or family member</option>
                      <option>Support worker / staff member</option>
                      <option>Plan manager / coordinator</option>
                      <option>Provider owner or former owner</option>
                      <option>Regulator / public servant</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Contact (optional)</label>
                    <input value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} placeholder="Signal / ProtonMail / leave blank"/>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg" type="submit">Submit securely</button>
              </form>
            )}
          </div>

          <aside>
            <div style={{background:"var(--offwhite)",border:"1px solid var(--line)",borderRadius:6,padding:24}}>
              <div className="eyebrow">What happens after I submit?</div>
              <h3 className="heading" style={{fontSize:22,margin:"8px 0 14px"}}>A clear, published process.</h3>
              <ol className="steps">
                <li><b>Encrypted drop</b><span>Your submission is encrypted on send and only decrypts on a reviewer device.</span></li>
                <li><b>72-hour review</b><span>One of three named founders reviews within 72 hours. No interns, no third parties.</span></li>
                <li><b>Source protection</b><span>We only re-contact on the channel you chose. We never publish identifying details without your written go-ahead.</span></li>
                <li><b>Action</b><span>Where the evidence is strong, we investigate, refer to NACC, and — if appropriate — publish.</span></li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function PressPage(){
  const outlets = ["The Australian","ABC 7.30","Sky News","2GB","The Daily Mail","News.com.au","The Spectator AU","The Guardian"];
  const quotes = [
    { outlet:"The Australian", t:"\"Pavlou's team has done what the regulator wouldn't — put the receipts on camera.\"", dt:"Feb 2026"},
    { outlet:"ABC 7.30", t:"\"The campaign has become unavoidable reading in Canberra.\"", dt:"Mar 2026"},
    { outlet:"Sky News", t:"\"One of the most aggressive independent investigations of a government program in a decade.\"", dt:"Jan 2026"},
    { outlet:"The Spectator AU", t:"\"The NDIS accountability movement finally has a public face.\"", dt:"Dec 2025"},
  ];
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Press & Media</div>
          <h1 className="heading">For journalists and editors.</h1>
          <p>Press kit, media mentions, and a dedicated line for verified outlets.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:40}}>
          <div>
            <div style={{background:"var(--navy)",color:"#fff",borderRadius:6,padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
              <div>
                <div className="eyebrow" style={{color:"#FF8093"}}>Press Kit v3 · Apr 2026</div>
                <div className="heading" style={{fontSize:22,marginTop:6}}>Logo pack, founder headshots, fact sheet, boilerplate.</div>
              </div>
              <button className="btn btn-primary">Download ZIP (14MB)</button>
            </div>

            <h2 className="heading" style={{fontSize:26,margin:"36px 0 14px"}}>Recent mentions</h2>
            <div className="mq-grid">
              {quotes.map((q,i)=>(
                <div className="mq" key={i}>
                  <div className="outlet">{q.outlet}</div>
                  <blockquote>{q.t}</blockquote>
                  <div className="dt">{q.dt}</div>
                </div>
              ))}
            </div>

            <h2 className="heading" style={{fontSize:26,margin:"36px 0 14px"}}>Outlets that have covered NDIS Exposed</h2>
            <div className="press-logos">
              {outlets.map((o,i)=> <div key={i} className="press-logo">{o}</div>)}
            </div>
          </div>

          <aside>
            <div style={{background:"var(--offwhite)",border:"1px solid var(--line)",borderRadius:6,padding:24}}>
              <div className="eyebrow">Media contact</div>
              <h3 className="heading" style={{fontSize:22,margin:"8px 0 10px"}}>For accredited journalists only.</h3>
              <p style={{color:"var(--slate)",margin:0,fontSize:14,lineHeight:1.6}}>Verified outlets get first access to new investigations, data sets, and source briefings (under embargo where required).</p>
              <div style={{marginTop:16}}>
                <div className="label">Email</div>
                <div style={{fontFamily:"ui-monospace,monospace",fontSize:15}}>press@ndisexposed.com</div>
              </div>
              <div style={{marginTop:14}}>
                <div className="label">Signal / Phone</div>
                <div style={{fontFamily:"ui-monospace,monospace",fontSize:15}}>On request · press inquiry</div>
              </div>
            </div>

            <div style={{marginTop:18}}>
              <VideoCard label="HIGHLIGHT REEL — B-ROLL • 03:42"/>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactPage(){
  const [sent,setSent]=useState(false);
  const [f,setF]=useState({name:"",email:"",subject:"",msg:""});
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="eyebrow">Contact</div>
          <h1 className="heading">Get in touch.</h1>
          <p>General enquiries only. For tip-offs use the <a style={{color:"var(--red)",fontWeight:700,cursor:"pointer"}} onClick={()=>location.hash="tipoff"}>secure portal</a>. For press use the media desk.</p>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:40}}>
          <div>
            {sent ? (
              <div className="thankyou" style={{textAlign:"left"}}>
                <div className="check-ico" style={{margin:0}}><Icon.Check/></div>
                <h2 className="heading" style={{fontSize:24,margin:"14px 0 6px"}}>Message received.</h2>
                <p style={{color:"var(--slate)",margin:0}}>We read everything. Expect a reply within 5 business days.</p>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true);}} style={{display:"grid",gap:14}}>
                <div className="row2">
                  <div><label className="label">Name</label><input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></div>
                  <div><label className="label">Email</label><input required type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
                </div>
                <div><label className="label">Subject</label><input required value={f.subject} onChange={e=>setF({...f,subject:e.target.value})}/></div>
                <div><label className="label">Message</label><textarea required value={f.msg} onChange={e=>setF({...f,msg:e.target.value})}/></div>
                <button className="btn btn-primary btn-lg" type="submit">Send message</button>
              </form>
            )}
          </div>
          <aside>
            <div style={{background:"var(--offwhite)",border:"1px solid var(--line)",borderRadius:6,padding:24}}>
              <div className="eyebrow">Campaign HQ</div>
              <p style={{color:"var(--ink)",fontSize:15,lineHeight:1.7,margin:"8px 0 0"}}>
                NDIS Exposed<br/>
                c/- Teller Consulting Group Pty Ltd<br/>
                PO Box 000, Sydney NSW 2000<br/>
                Australia
              </p>
              <div style={{marginTop:16}}>
                <div className="label">General</div>
                <div style={{fontFamily:"ui-monospace,monospace"}}>hello@ndisexposed.com</div>
              </div>
              <div style={{marginTop:12}}>
                <div className="label">Legal</div>
                <div style={{fontFamily:"ui-monospace,monospace"}}>legal@ndisexposed.com</div>
              </div>
              <div style={{marginTop:14}}>
                <div className="label">ABN</div>
                <div style={{fontFamily:"ui-monospace,monospace"}}>00 000 000 000</div>
              </div>
              <div style={{marginTop:18}}>
                <div className="label">Follow</div>
                <div className="soc" style={{marginTop:4}}>
                  <a><Icon.YT/></a><a><Icon.IG/></a><a><Icon.TT/></a><a><Icon.FB/></a><a><Icon.X/></a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

// ---------- Share FAB ----------
function ShareFab(){
  const [open,setOpen]=useState(false);
  const [toast,setToast]=useState("");
  function share(net){
    setOpen(false);
    setToast(`Opening ${net} share…`);
    setTimeout(()=>setToast(""),1800);
  }
  return (
    <>
      <button className="fab-share" aria-label="Share" onClick={()=>setOpen(o=>!o)}><Icon.Share/></button>
      {open && (
        <div className="share-pop" onMouseLeave={()=>setOpen(false)}>
          <button onClick={()=>share("X")}><Icon.X/> Post on X</button>
          <button onClick={()=>share("Facebook")}><Icon.FB/> Share on Facebook</button>
          <button onClick={()=>share("WhatsApp")}><Icon.WA/> Send on WhatsApp</button>
          <button onClick={()=>{navigator.clipboard?.writeText(location.href); setOpen(false); setToast("Link copied"); setTimeout(()=>setToast(""),1400);}}>🔗 Copy link</button>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

// ---------- Root ----------
function App(){
  const [route] = useRoute();
  return (
    <>
      <Nav/>
      <main>{route === "thankyou" ? <ThankYouPage/> : <DonatePage/>}</main>
      <Footer/>
      <ShareFab/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
