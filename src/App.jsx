import { useState, useEffect, useRef } from "react";

const BLUE_DARK = "#1a3aab";
const BLUE_MED = "#2952d9";
const BLUE_LIGHT = "#e8eeff";
const WHITE = "#ffffff";
const GRAY = "#f4f6fb";
const TEXT = "#0d1b4b";

const resources = [
  { id: 1, title: "SBA 7(a) Loan Program", category: "Funding", tags: ["loans", "federal", "all businesses"], desc: "The SBA's most common loan program, offering up to $5M for working capital, equipment, and more.", eligibility: "For-profit U.S. businesses that meet SBA size standards.", link: "#" },
  { id: 2, title: "SCORE Free Mentorship", category: "Mentorship", tags: ["free", "mentorship", "nationwide"], desc: "Connect with experienced volunteer business mentors for free guidance at any stage.", eligibility: "Any small business owner or aspiring entrepreneur.", link: "#" },
  { id: 3, title: "Women-Owned Small Business (WOSB) Program", category: "Grants & Contracts", tags: ["women-owned", "federal contracts", "certification"], desc: "Federal contracting program that helps women-owned small businesses compete for government contracts.", eligibility: "At least 51% women-owned and controlled businesses.", link: "#" },
  { id: 4, title: "SBDC Free Consulting", category: "Consulting", tags: ["free", "consulting", "business plan"], desc: "America's Small Business Development Centers provide no-cost consulting and low-cost training.", eligibility: "Any small business owner in the U.S.", link: "#" },
  { id: 5, title: "Minority Business Development Agency", category: "Minority-Owned", tags: ["minority-owned", "grants", "federal"], desc: "MBDA helps minority-owned businesses grow and compete in global markets.", eligibility: "Minority-owned businesses (African American, Hispanic, Asian, etc.).", link: "#" },
  { id: 6, title: "Veteran-Owned Business Certification", category: "Veteran-Owned", tags: ["veteran", "certification", "federal contracts"], desc: "Get certified as a veteran-owned small business for access to set-aside federal contracts.", eligibility: "Businesses 51%+ owned by honorably discharged veterans.", link: "#" },
  { id: 7, title: "USDA Rural Business Grants", category: "Funding", tags: ["rural", "grants", "USDA"], desc: "Grants and loans for businesses in rural areas to create jobs and grow local economies.", eligibility: "Businesses located in rural areas (populations under 50,000).", link: "#" },
  { id: 8, title: "Immigrant Entrepreneur Resources (USCIS)", category: "Immigrant Founders", tags: ["immigrant", "visa", "startup"], desc: "Guidance on visa options (E-2, EB-5, O-1) and business formation for immigrant entrepreneurs.", eligibility: "Non-citizen entrepreneurs legally present in the U.S.", link: "#" },
];

const channels = [
  { id: "general", icon: "💬", name: "General Discussion", desc: "Anything and everything for small business owners", posts: [
    { id: 1, author: "Maria G.", business: "Tamale Kitchen ATL", avatar: "MG", time: "2h ago", title: "Finally got my SBA microloan approved after 3 rejections 🎉", replies: 14, likes: 42, tag: "Win" },
    { id: 2, author: "James O.", business: "JO Consulting", avatar: "JO", time: "1d ago", title: "Feeling burnt out — how do you all keep going?", replies: 31, likes: 67, tag: "Support" },
    { id: 3, author: "Lin C.", business: "Pearl Imports", avatar: "LC", time: "2d ago", title: "Free bookkeeping tools that actually work for micro-businesses", replies: 19, likes: 55, tag: "Resource" },
  ]},
  { id: "tech", icon: "💻", name: "Tech Talk", desc: "Software, apps, SaaS, and tech-enabled businesses", posts: [
    { id: 4, author: "Derek T.", business: "TechRepair Dallas", avatar: "DT", time: "5h ago", title: "Anyone here used Kabbage vs Bluevine for a line of credit?", replies: 8, likes: 17, tag: "Question" },
    { id: 5, author: "Amir K.", business: "Kode Studio", avatar: "AK", time: "1d ago", title: "Best no-code tools for building client dashboards in 2026?", replies: 12, likes: 34, tag: "Question" },
    { id: 6, author: "Yuki T.", business: "DataFlow Labs", avatar: "YT", time: "3d ago", title: "How I automated 80% of my client onboarding with Zapier + Notion", replies: 27, likes: 91, tag: "Guide" },
  ]},
  { id: "cpg", icon: "🛒", name: "CPG & Products", desc: "Consumer packaged goods, food & beverage, physical products", posts: [
    { id: 7, author: "Rosa M.", business: "Miel Honey Co.", avatar: "RM", time: "3h ago", title: "Getting into Whole Foods — who has experience with the process?", replies: 22, likes: 48, tag: "Question" },
    { id: 8, author: "Ben A.", business: "Crunch Snacks", avatar: "BA", time: "2d ago", title: "Co-packer pricing feels insane right now. Anyone else?", replies: 18, likes: 39, tag: "Discussion" },
    { id: 9, author: "Priya S.", business: "Bloom Teas", avatar: "PS", time: "4d ago", title: "FDA label compliance checklist I wish I had from day one", replies: 35, likes: 112, tag: "Guide" },
  ]},
  { id: "brick", icon: "🏪", name: "Brick & Mortar", desc: "Retail, restaurants, storefronts, and local service businesses", posts: [
    { id: 10, author: "Carlos V.", business: "V's Barbershop", avatar: "CV", time: "1h ago", title: "Landlord wants 20% rent increase. What are my options?", replies: 41, likes: 73, tag: "Help" },
    { id: 11, author: "Nina P.", business: "Petal Flower Shop", avatar: "NP", time: "6h ago", title: "POS systems for small retail — Square vs Clover vs Lightspeed?", replies: 16, likes: 28, tag: "Question" },
    { id: 12, author: "Terri B.", business: "The Lunch Box", avatar: "TB", time: "2d ago", title: "Restaurant owner surviving $18/hr minimum wage — what I changed", replies: 52, likes: 140, tag: "Win" },
  ]},
  { id: "funding", icon: "💰", name: "Funding & Finance", desc: "Loans, grants, investors, bookkeeping, and cash flow", posts: [
    { id: 13, author: "Priya S.", business: "Bloom Floral Studio", avatar: "PS", time: "1d ago", title: "How I got my first government contract as a WOSB — step by step", replies: 23, likes: 89, tag: "Guide" },
    { id: 14, author: "Marcus W.", business: "W Creative Agency", avatar: "MW", time: "3d ago", title: "Cash flow positive in month 8 — here is what actually worked", replies: 44, likes: 118, tag: "Win" },
    { id: 15, author: "Sam L.", business: "Lite Logistics", avatar: "SL", time: "5d ago", title: "Anyone used an SBIR grant for a service business?", replies: 9, likes: 21, tag: "Question" },
  ]},
  { id: "wins", icon: "🏆", name: "Wins & Milestones", desc: "Celebrate your victories — big and small", posts: [
    { id: 16, author: "Dani R.", business: "Raw Roots Studio", avatar: "DR", time: "30m ago", title: "Just hit $10K revenue month for the first time 🔥", replies: 28, likes: 97, tag: "Win" },
    { id: 17, author: "Joel K.", business: "KleanCo", avatar: "JK", time: "4h ago", title: "Landed our first corporate cleaning contract after 6 months of trying", replies: 19, likes: 63, tag: "Win" },
    { id: 18, author: "Amy C.", business: "Craft & Co.", avatar: "AC", time: "1d ago", title: "One year in, still standing. That is the win.", replies: 61, likes: 204, tag: "Win" },
  ]},
];

const tagColors = {
  "Win":        { bg: "#e6f9f0", text: "#1a7a4a" },
  "Question":   { bg: "#e8eeff", text: "#1a3aab" },
  "Guide":      { bg: "#fff8e6", text: "#a0620a" },
  "Support":    { bg: "#fde8f0", text: "#a01a4a" },
  "Resource":   { bg: "#f0e8ff", text: "#5a1aab" },
  "Discussion": { bg: "#f0f4ff", text: "#3a4aab" },
  "Help":       { bg: "#fff0e8", text: "#a04a1a" },
};



const resourceCategories = ["All", "Funding", "Mentorship", "Grants & Contracts", "Consulting", "Minority-Owned", "Veteran-Owned", "Immigrant Founders"];

// Subtle US flag stripe accent
function FlagAccent({ style = {} }) {
  return (
    <div style={{ display: "flex", gap: 0, height: 4, borderRadius: 2, overflow: "hidden", width: 36, ...style }}>
      <div style={{ flex: 1, background: "#B22234" }} />
      <div style={{ flex: 1, background: "#FFFFFF" }} />
      <div style={{ flex: 1, background: "#B22234" }} />
      <div style={{ flex: 1, background: "#FFFFFF" }} />
      <div style={{ flex: 1, background: "#3C3B6E" }} />
    </div>
  );
}

// Small inline flag emoji-style SVG
function MiniFlag({ size = 18 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, display: "inline-block", verticalAlign: "middle" }}>
      <rect width="30" height="20" fill="#B22234"/>
      <rect y="1.54" width="30" height="1.54" fill="white"/>
      <rect y="4.62" width="30" height="1.54" fill="white"/>
      <rect y="7.69" width="30" height="1.54" fill="white"/>
      <rect y="10.77" width="30" height="1.54" fill="white"/>
      <rect y="13.85" width="30" height="1.54" fill="white"/>
      <rect y="16.92" width="30" height="1.54" fill="white"/>
      <rect width="12" height="10.77" fill="#3C3B6E"/>
      <circle cx="2" cy="2" r="0.8" fill="white"/>
      <circle cx="4" cy="2" r="0.8" fill="white"/>
      <circle cx="6" cy="2" r="0.8" fill="white"/>
      <circle cx="8" cy="2" r="0.8" fill="white"/>
      <circle cx="10" cy="2" r="0.8" fill="white"/>
      <circle cx="2" cy="4" r="0.8" fill="white"/>
      <circle cx="4" cy="4" r="0.8" fill="white"/>
      <circle cx="6" cy="4" r="0.8" fill="white"/>
      <circle cx="8" cy="4" r="0.8" fill="white"/>
      <circle cx="10" cy="4" r="0.8" fill="white"/>
      <circle cx="2" cy="6" r="0.8" fill="white"/>
      <circle cx="4" cy="6" r="0.8" fill="white"/>
      <circle cx="6" cy="6" r="0.8" fill="white"/>
      <circle cx="8" cy="6" r="0.8" fill="white"/>
      <circle cx="10" cy="6" r="0.8" fill="white"/>
      <circle cx="2" cy="8.5" r="0.8" fill="white"/>
      <circle cx="4" cy="8.5" r="0.8" fill="white"/>
      <circle cx="6" cy="8.5" r="0.8" fill="white"/>
      <circle cx="8" cy="8.5" r="0.8" fill="white"/>
      <circle cx="10" cy="8.5" r="0.8" fill="white"/>
    </svg>
  );
}

// BB Logo SVG component
function BBLogo({ size = 40, dark = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill={dark ? BLUE_DARK : "transparent"} />
      <text x="6" y="58" fontFamily="Georgia, serif" fontWeight="700" fontSize="52" fill={dark ? WHITE : BLUE_DARK} opacity="1">B</text>
      <text x="26" y="58" fontFamily="Georgia, serif" fontWeight="700" fontSize="52" fill={dark ? WHITE : BLUE_MED} opacity="0.45">B</text>
    </svg>
  );
}

function NavBar({ page, setPage, premium, setPremium }) {
  return (
    <nav style={{
      background: BLUE_DARK,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 20px rgba(26,58,171,0.3)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <BBLogo size={36} dark={true} />
        <div>
          <div style={{ color: WHITE, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16, letterSpacing: 3 }}>BACKBONE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 8, letterSpacing: 2 }}>SMALL BUSINESS NETWORK</div>
            <MiniFlag size={14} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {[
          { id: "resources", label: "Resources" },
          { id: "community", label: "Community" },
          { id: "bone", label: "Ask Bone" },
          { id: "breakroom", label: "☕ Break Room" },
        ].map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            background: page === item.id ? "rgba(255,255,255,0.15)" : "transparent",
            border: "none",
            color: WHITE,
            padding: "6px 12px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: page === item.id ? 700 : 400,
            letterSpacing: 0.5,
          }}>{item.label}</button>
        ))}
        {!premium && (
          <button onClick={() => setPremium(true)} style={{
            background: WHITE,
            color: BLUE_DARK,
            border: "none",
            padding: "6px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
            marginLeft: 8,
          }}>Go Premium $9.99/mo</button>
        )}
        {premium && (
          <div style={{ background: "rgba(255,255,255,0.15)", color: WHITE, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, marginLeft: 8 }}>
            ⭐ Premium
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage({ setPage, setPremium }) {
  return (
    <div>
      {/* Hero with faint US flag background */}
      <div style={{
        minHeight: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "70px 24px 60px",
        position: "relative",
        overflow: "hidden",
        background: "#0d1f6e",
      }}>
        {/* Flag stripes background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
            <div key={i} style={{
              position: "absolute",
              top: `${(i / 13) * 100}%`,
              left: 0, right: 0,
              height: `${100 / 13}%`,
              background: i % 2 === 0 ? "rgba(178,34,52,0.18)" : "rgba(255,255,255,0.055)",
            }} />
          ))}
          {/* Blue canton */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "40%", height: "53.8%",
            background: "rgba(60,59,110,0.25)",
          }} />
          {/* Stars in canton */}
          {[...Array(50)].map((_, i) => {
            const col = i % 10;
            const row = Math.floor(i / 10);
            return (
              <div key={i} style={{
                position: "absolute",
                left: `${(col / 10) * 40 + 2}%`,
                top: `${(row / 9) * 53.8 + 3}%`,
                color: "rgba(255,255,255,0.10)",
                fontSize: 11,
                lineHeight: 1,
              }}>★</div>
            );
          })}
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,20,80,0.75)" }} />
        </div>

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <BBLogo size={72} dark={true} />
          <div style={{ marginTop: 18, color: WHITE, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 42, letterSpacing: 6, lineHeight: 1 }}>BACKBONE</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 3 }}>SMALL BUSINESS NETWORK</div>
            <MiniFlag size={16} />
          </div>

          {/* Tagline */}
          <div style={{ marginTop: 36, maxWidth: 640 }}>
            <div style={{ color: WHITE, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, lineHeight: 1.45, letterSpacing: 0.5 }}>
              "Small Businesses Are The Backbone of America."
            </div>
            {/* Red/white/blue divider */}
            <div style={{ display: "flex", height: 3, borderRadius: 3, overflow: "hidden", margin: "14px auto", maxWidth: 280 }}>
              <div style={{ flex: 1, background: "#B22234" }} />
              <div style={{ flex: 1, background: "#FFFFFF" }} />
              <div style={{ flex: 1, background: "#B22234" }} />
              <div style={{ flex: 1, background: "#FFFFFF" }} />
              <div style={{ flex: 1, background: "#3C3B6E" }} />
              <div style={{ flex: 1, background: "#FFFFFF" }} />
              <div style={{ flex: 1, background: "#B22234" }} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.78)", fontSize: 17, fontStyle: "italic", lineHeight: 1.5 }}>
              Now they finally have one.
            </div>
          </div>

          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 18, maxWidth: 460, lineHeight: 1.75 }}>
            Connect to resources, find your people, and get AI-powered guidance — all in one place built for bootstrapped owners like you.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setPage("resources")} style={{
              background: WHITE, color: BLUE_DARK, border: "none", padding: "14px 28px",
              borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700,
            }}>Find Resources →</button>
            <button onClick={() => setPremium(true)} style={{
              background: "rgba(255,255,255,0.1)", color: WHITE, border: "2px solid rgba(255,255,255,0.35)",
              padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 600,
            }}>Start Free Trial</button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: BLUE_LIGHT, padding: "20px 24px", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
        {[["33M+", "Small Businesses in the U.S.", true], ["500+", "Verified Resources", false], ["Free", "Always for core features", false], ["24/7", "AI Assistant 'Bone'", false]].map(([stat, label, flag]) => (
          <div key={stat} style={{ textAlign: "center" }}>
            <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {stat}{flag && <MiniFlag size={20} />}
            </div>
            <div style={{ color: "#5a6a9a", fontSize: 12, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Three pillars */}
      <div style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700 }}>Everything you need. One platform.</div>
          <div style={{ color: "#5a6a9a", fontSize: 15, marginTop: 8 }}>Built for bootstrapped owners who carry the weight of their dreams alone.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { icon: "🔍", title: "Find Resources", desc: "Search 500+ verified grants, loans, nonprofit programs, and government resources — filtered to your exact situation.", action: "Search Resources", page: "resources" },
            { icon: "🤖", title: "Ask Bone (AI)", desc: "Your 24/7 AI business advisor trained on U.S. small business programs, legal basics, and the Backbone directory.", action: "Ask a Question", page: "bone" },
            { icon: "🤝", title: "Find Your People", desc: "Peer networking, community forums, B2B mutual aid marketplace, and video networking rooms for small business owners.", action: "Join Community", page: "community" },
          ].map(pillar => (
            <div key={pillar.title} style={{
              background: WHITE,
              border: `1px solid ${BLUE_LIGHT}`,
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 4px 20px rgba(26,58,171,0.07)",
            }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{pillar.icon}</div>
              <div style={{ color: BLUE_DARK, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{pillar.title}</div>
              <div style={{ color: "#5a6a9a", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{pillar.desc}</div>
              <button onClick={() => setPage(pillar.page)} style={{
                background: BLUE_LIGHT, color: BLUE_DARK, border: "none", padding: "8px 16px",
                borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700,
              }}>{pillar.action} →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE_MED})`, padding: "48px 24px", textAlign: "center" }}>
        <div style={{ color: WHITE, fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700 }}>Unlock the full Backbone experience</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>AI assistant, unlimited networking, video rooms, real-time grant alerts, and more.</div>
        <div style={{ color: WHITE, fontSize: 36, fontWeight: 700, marginTop: 20 }}>$9.99<span style={{ fontSize: 16, opacity: 0.7 }}>/month</span></div>
        <button onClick={() => setPremium(true)} style={{
          background: WHITE, color: BLUE_DARK, border: "none", padding: "14px 32px",
          borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700, marginTop: 16,
        }}>Start Free — Upgrade Anytime</button>
      </div>
    </div>
  );
}

function ResourcesPage({ premium }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = resources.filter(r =>
    (category === "All" || r.category === category) &&
    (search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.includes(search.toLowerCase())))
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700 }}>Resource Directory</div>
        <div style={{ color: "#5a6a9a", fontSize: 14, marginTop: 4 }}>500+ verified government, nonprofit, and private resources for small businesses.</div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search grants, loans, mentorship..."
          style={{
            flex: 1, minWidth: 200, padding: "10px 16px", borderRadius: 10,
            border: `2px solid ${BLUE_LIGHT}`, fontSize: 14, outline: "none",
            fontFamily: "inherit", color: TEXT,
          }}
        />
        {!premium && (
          <div style={{ background: BLUE_LIGHT, color: BLUE_DARK, padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
            ⭐ Premium: Real-time alerts
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {resourceCategories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            background: category === cat ? BLUE_DARK : BLUE_LIGHT,
            color: category === cat ? WHITE : BLUE_DARK,
            border: "none", padding: "6px 14px", borderRadius: 20,
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(r => (
          <div key={r.id} style={{
            background: WHITE, border: `1px solid ${BLUE_LIGHT}`, borderRadius: 14,
            padding: 20, boxShadow: "0 2px 12px rgba(26,58,171,0.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ color: BLUE_DARK, fontSize: 16, fontWeight: 700 }}>{r.title}</div>
                <div style={{ color: "#5a6a9a", fontSize: 13, marginTop: 4 }}>{r.desc}</div>
                <div style={{ color: "#7a8aaa", fontSize: 12, marginTop: 6 }}><strong>Eligible:</strong> {r.eligibility}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {r.tags.map(tag => (
                    <span key={tag} style={{ background: BLUE_LIGHT, color: BLUE_DARK, fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                <span style={{ background: BLUE_LIGHT, color: BLUE_DARK, fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 700 }}>{r.category}</span>
                <button style={{ background: BLUE_DARK, color: WHITE, border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#9aa0b8", padding: 40 }}>No resources found. Try a different search.</div>
        )}
      </div>
    </div>
  );
}

function CommunityPage({ premium, setPage }) {
  const [activeTab, setActiveTab] = useState("forum");
  const [activeChannel, setActiveChannel] = useState("general");

  const currentChannel = channels.find(c => c.id === activeChannel) || channels[0];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700 }}>Find Your People</div>
        <div style={{ color: "#5a6a9a", fontSize: 14, marginTop: 4 }}>Connect with owners who get it — because they've lived it.</div>
      </div>

      {/* Top tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, borderBottom: `2px solid ${BLUE_LIGHT}`, paddingBottom: 0 }}>
        {["forum", "networking", "mutual-aid"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "transparent", border: "none",
            borderBottom: activeTab === tab ? `3px solid ${BLUE_DARK}` : "3px solid transparent",
            color: activeTab === tab ? BLUE_DARK : "#9aa0b8",
            padding: "8px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600,
            marginBottom: -2,
          }}>{tab === "mutual-aid" ? "B2B Mutual Aid" : tab === "forum" ? "Community Forums" : "Networking Rooms"}</button>
        ))}
      </div>

      {activeTab === "forum" && (
        <div style={{ display: "flex", gap: 0, background: WHITE, borderRadius: 16, border: `1px solid ${BLUE_LIGHT}`, overflow: "hidden", minHeight: 520, boxShadow: "0 4px 20px rgba(26,58,171,0.07)" }}>

          {/* Channel sidebar */}
          <div style={{ width: 220, background: "#f0f4ff", borderRight: `1px solid ${BLUE_LIGHT}`, flexShrink: 0, padding: "16px 0" }}>
            <div style={{ padding: "0 16px 10px", color: "#9aa0b8", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Channels</div>
            {channels.map(ch => (
              <button key={ch.id} onClick={() => setActiveChannel(ch.id)} style={{
                width: "100%", textAlign: "left", background: activeChannel === ch.id ? BLUE_DARK : "transparent",
                border: "none", padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 9,
                borderRadius: 0, transition: "background 0.15s",
              }}>
                <span style={{ fontSize: 16 }}>{ch.icon}</span>
                <div>
                  <div style={{ color: activeChannel === ch.id ? WHITE : TEXT, fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{ch.name}</div>
                  <div style={{ color: activeChannel === ch.id ? "rgba(255,255,255,0.6)" : "#9aa0b8", fontSize: 10, marginTop: 1 }}>{ch.posts.length} posts</div>
                </div>
              </button>
            ))}
            <div style={{ borderTop: `1px solid ${BLUE_LIGHT}`, margin: "12px 16px 0", paddingTop: 12 }}>
              <div style={{ color: "#9aa0b8", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>More</div>
              <button style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "7px 0", cursor: "pointer", color: "#9aa0b8", fontSize: 12 }}>
                + Suggest a channel
              </button>
            </div>
          </div>

          {/* Posts panel */}
          <div style={{ flex: 1, padding: 20, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{currentChannel.icon}</span>
                  <span style={{ color: BLUE_DARK, fontSize: 17, fontWeight: 700 }}>{currentChannel.name}</span>
                </div>
                <div style={{ color: "#9aa0b8", fontSize: 12, marginTop: 3 }}>{currentChannel.desc}</div>
              </div>
              <button style={{ background: BLUE_DARK, color: WHITE, border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                + New Post
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentChannel.posts.map(post => (
                <div key={post.id} style={{
                  background: "#f8faff", border: `1px solid ${BLUE_LIGHT}`, borderRadius: 12,
                  padding: 16, cursor: "pointer",
                }}>
                  <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", background: BLUE_DARK,
                      color: WHITE, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}>{post.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: BLUE_DARK, fontSize: 12, fontWeight: 700 }}>{post.author}</span>
                          <span style={{ color: "#c0c8e0", fontSize: 11 }}>·</span>
                          <span style={{ color: "#9aa0b8", fontSize: 11 }}>{post.business}</span>
                        </div>
                        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                          <span style={{
                            background: tagColors[post.tag]?.bg || BLUE_LIGHT,
                            color: tagColors[post.tag]?.text || BLUE_DARK,
                            fontSize: 10, padding: "2px 9px", borderRadius: 20, fontWeight: 600,
                          }}>{post.tag}</span>
                          <span style={{ color: "#c0c8e0", fontSize: 11 }}>{post.time}</span>
                        </div>
                      </div>
                      <div style={{ color: TEXT, fontSize: 14, fontWeight: 600, marginTop: 5, lineHeight: 1.4 }}>{post.title}</div>
                      <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                        <span style={{ color: "#9aa0b8", fontSize: 11 }}>💬 {post.replies} replies</span>
                        <span style={{ color: "#9aa0b8", fontSize: 11 }}>❤️ {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "networking" && (
        <div>
          {!premium ? (
            <div style={{ background: BLUE_LIGHT, borderRadius: 16, padding: 40, textAlign: "center", border: `2px dashed ${BLUE_MED}` }}>
              <div style={{ fontSize: 40 }}>🎥</div>
              <div style={{ color: BLUE_DARK, fontSize: 20, fontWeight: 700, marginTop: 12 }}>Video Networking Rooms</div>
              <div style={{ color: "#5a6a9a", fontSize: 14, marginTop: 8, maxWidth: 360, margin: "8px auto 0" }}>
                AI-matched video rooms with other small business owners. Restaurant owners Wednesday. Tech founders Thursday. And more.
              </div>
              <button onClick={() => setPage("upgrade")} style={{
                background: BLUE_DARK, color: WHITE, border: "none", padding: "12px 24px",
                borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, marginTop: 20,
              }}>Unlock with Premium — $9.99/mo</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                { name: "Restaurant Owners", day: "Wednesdays 7PM ET", members: 12, active: true },
                { name: "Retail & E-Commerce", day: "Thursdays 6PM ET", members: 8, active: false },
                { name: "Service Businesses", day: "Tuesdays 7PM ET", members: 15, active: true },
                { name: "Immigrant Founders", day: "Fridays 6PM ET", members: 6, active: false },
              ].map(room => (
                <div key={room.name} style={{ background: WHITE, border: `1px solid ${BLUE_LIGHT}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: BLUE_DARK, fontWeight: 700, fontSize: 15 }}>{room.name}</div>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: room.active ? "#1a7a4a" : "#ccc", marginTop: 4 }} />
                  </div>
                  <div style={{ color: "#5a6a9a", fontSize: 13, marginTop: 6 }}>{room.day}</div>
                  <div style={{ color: "#9aa0b8", fontSize: 12, marginTop: 4 }}>{room.members} members</div>
                  <button style={{ background: room.active ? BLUE_DARK : BLUE_LIGHT, color: room.active ? WHITE : BLUE_DARK, border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, marginTop: 14, width: "100%" }}>
                    {room.active ? "Join Now →" : "Set Reminder"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "mutual-aid" && (
        <div>
          {!premium ? (
            <div style={{ background: BLUE_LIGHT, borderRadius: 16, padding: 40, textAlign: "center", border: `2px dashed ${BLUE_MED}` }}>
              <div style={{ fontSize: 40 }}>🤝</div>
              <div style={{ color: BLUE_DARK, fontSize: 20, fontWeight: 700, marginTop: 12 }}>B2B Mutual Aid Marketplace</div>
              <div style={{ color: "#5a6a9a", fontSize: 14, marginTop: 8 }}>Give and get — trade services, referrals, and skills with fellow small business owners.</div>
              <button onClick={() => setPage("upgrade")} style={{
                background: BLUE_DARK, color: WHITE, border: "none", padding: "12px 24px",
                borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, marginTop: 20,
              }}>Unlock with Premium — $9.99/mo</button>
            </div>
          ) : (
            <div style={{ color: "#5a6a9a", textAlign: "center", padding: 40 }}>Mutual aid listings loading...</div>
          )}
        </div>
      )}
    </div>
  );
}

function BonePage({ premium, setPage }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hey! I'm Bone, your AI business advisor. I know U.S. small business programs, SBA loans, grants, legal basics, and more. What can I help you with today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!premium) {
      setMessages(prev => [...prev, { role: "user", text: input }, { role: "locked", text: "" }]);
      setInput("");
      return;
    }
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      const history = messages.filter(m => m.role !== "locked").map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text
      }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Bone, the AI business advisor for Backbone — a platform for U.S. small business owners. You specialize in: SBA loans and grants, government programs for small businesses, LLC and business formation, basic legal and tax questions for small businesses, minority/women/veteran-owned business certifications, and emotional support for bootstrapped entrepreneurs. Keep answers practical, warm, and direct. You understand the struggle of building something alone. Always mention relevant Backbone resources when applicable. Sign off with '— Bone 🦴' on your first message only.`,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting right now. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px", display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700 }}>Ask Bone 🦴</div>
        <div style={{ color: "#5a6a9a", fontSize: 14, marginTop: 4 }}>Your 24/7 AI advisor for U.S. small business questions. {!premium && "Premium feature — upgrade to unlock."}</div>
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["How do I register an LLC?", "What SBA loans am I eligible for?", "Grants for immigrant-owned businesses?", "How do I get my first government contract?"].map(q => (
            <button key={q} onClick={() => { setInput(q); }} style={{
              background: BLUE_LIGHT, color: BLUE_DARK, border: "none", padding: "7px 14px",
              borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}>{q}</button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingRight: 4 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === "locked" ? (
              <div style={{ background: BLUE_LIGHT, borderRadius: 14, padding: 20, textAlign: "center", border: `2px dashed ${BLUE_MED}` }}>
                <div style={{ fontSize: 24 }}>🦴</div>
                <div style={{ color: BLUE_DARK, fontWeight: 700, marginTop: 8 }}>Bone is a Premium feature</div>
                <div style={{ color: "#5a6a9a", fontSize: 13, marginTop: 4 }}>Upgrade to ask unlimited questions 24/7.</div>
                <button onClick={() => setPage("upgrade")} style={{
                  background: BLUE_DARK, color: WHITE, border: "none", padding: "10px 20px",
                  borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700, marginTop: 12,
                }}>Upgrade — $9.99/mo</button>
              </div>
            ) : (
              <div style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  background: msg.role === "user" ? BLUE_DARK : WHITE,
                  color: msg.role === "user" ? WHITE : TEXT,
                  border: msg.role === "assistant" ? `1px solid ${BLUE_LIGHT}` : "none",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "12px 16px",
                  fontSize: 14,
                  lineHeight: 1.6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: WHITE, border: `1px solid ${BLUE_LIGHT}`, borderRadius: "18px 18px 18px 4px", padding: "12px 20px", color: "#9aa0b8", fontSize: 14 }}>
              Bone is thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder={premium ? "Ask anything about your small business..." : "Upgrade to Premium to ask Bone..."}
          style={{
            flex: 1, padding: "12px 16px", borderRadius: 12,
            border: `2px solid ${BLUE_LIGHT}`, fontSize: 14, outline: "none",
            fontFamily: "inherit", color: TEXT,
          }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
          background: BLUE_DARK, color: WHITE, border: "none", padding: "12px 20px",
          borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 700,
          opacity: loading || !input.trim() ? 0.5 : 1,
        }}>Send</button>
      </div>
    </div>
  );
}

function UpgradePage({ setPremium, setPage }) {
  return (
    <div style={{ maxWidth: 600, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
      <BBLogo size={60} dark={true} />
      <div style={{ color: BLUE_DARK, fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, marginTop: 16 }}>Go Premium</div>
      <div style={{ color: "#5a6a9a", fontSize: 15, marginTop: 8 }}>Everything you need to survive and thrive — for less than a cup of coffee a week.</div>
      <div style={{ background: WHITE, border: `2px solid ${BLUE_MED}`, borderRadius: 20, padding: 32, marginTop: 32, boxShadow: "0 8px 40px rgba(26,58,171,0.12)" }}>
        <div style={{ color: BLUE_DARK, fontSize: 40, fontWeight: 700 }}>$9.99<span style={{ fontSize: 16, color: "#5a6a9a" }}>/month</span></div>
        <div style={{ color: "#5a6a9a", fontSize: 13, marginTop: 4 }}>or $89/year (save 26%)</div>
        <div style={{ textAlign: "left", marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            "✅ AI Assistant Bone — unlimited questions 24/7",
            "✅ Video networking rooms with matched owners",
            "✅ B2B Mutual Aid Marketplace",
            "✅ Real-time grant & funding alerts",
            "✅ Unlimited connections per month",
            "✅ Priority in community search results",
            "✅ Monthly virtual networking events included",
            "✅ Full profile analytics",
          ].map(f => (
            <div key={f} style={{ color: TEXT, fontSize: 14 }}>{f}</div>
          ))}
        </div>
        <button onClick={() => { setPremium(true); setPage("home"); }} style={{
          background: BLUE_DARK, color: WHITE, border: "none", padding: "16px 40px",
          borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 700, marginTop: 28, width: "100%",
        }}>Start Premium — $9.99/mo</button>
        <div style={{ color: "#9aa0b8", fontSize: 12, marginTop: 12 }}>Cancel anytime. No hidden fees. No predatory practices.</div>
      </div>
    </div>
  );
}


function BreakRoomPage() {
  const [activeThread, setActiveThread] = useState(null);
  const [checkIn, setCheckIn] = useState(null);

  const threads = [
    { id: 1, emoji: "😮‍💨", title: "I almost quit today", replies: 34, hearts: 89, preview: "Had my third client cancel in a row. Sat in my car for 20 minutes. Then came back in.", time: "1h ago", replies_content: [
      { author: "James O.", avatar: "JO", text: "I've been there. That car sit is real. You came back in — that matters more than you know." },
      { author: "Maria G.", avatar: "MG", text: "Three cancels in a row would break most people. You're still here. That's not nothing." },
    ]},
    { id: 2, emoji: "🌊", title: "How are you actually doing this week?", replies: 61, hearts: 142, preview: "Not how's business. Not the metrics. How are YOU doing.", time: "3h ago", replies_content: [
      { author: "Terri B.", avatar: "TB", text: "Honestly? Exhausted. But also proud. It's a weird mix." },
      { author: "Dani R.", avatar: "DR", text: "Slept 5 hours 4 nights in a row. Not sustainable. Trying to fix it." },
    ]},
    { id: 3, emoji: "💡", title: "The moment I realized I needed to slow down to speed up", replies: 28, hearts: 117, preview: "Burned out completely in month 9. Took a week off. Came back with the clearest thinking I'd had all year.", time: "1d ago", replies_content: [
      { author: "Yuki T.", avatar: "YT", text: "This happened to me too. Rest is not the enemy of progress." },
    ]},
    { id: 4, emoji: "🤝", title: "Things I wish someone told me before I started", replies: 73, hearts: 204, preview: "Nobody tells you about the loneliness. Everyone talks about the grind but not the isolation.", time: "2d ago", replies_content: [
      { author: "Carlos V.", avatar: "CV", text: "The loneliness is real. This platform helps honestly." },
      { author: "Amy C.", avatar: "AC", text: "Year one I talked to nobody. Year two I found a community. Night and day difference." },
    ]},
    { id: 5, emoji: "☀️", title: "Small wins only — drop yours here", replies: 91, hearts: 267, preview: "Paid myself for the first time. $400. Cried a little.", time: "2d ago", replies_content: [
      { author: "Nina P.", avatar: "NP", text: "Finally hired my first part-time help. 8 hours a week. Life changing." },
      { author: "Ben A.", avatar: "BA", text: "Customer left a 5-star review and mentioned my name specifically. Kept me going all week." },
    ]},
    { id: 6, emoji: "🌙", title: "For the 2am crowd — anyone else up?", replies: 44, hearts: 156, preview: "You are not alone. Whoever is reading this at 2am grinding — we see you.", time: "4d ago", replies_content: [
      { author: "Sam L.", avatar: "SL", text: "2:47am. Invoices. But I chose this. Reminding myself of that." },
      { author: "Rosa M.", avatar: "RM", text: "Reading this at 1:30am with a cold cup of coffee. Thank you for posting this." },
    ]},
  ];

  const checkIns = [
    { label: "I need a moment", emoji: "😮‍💨", color: "#fde8f0", text: "#a01a4a" },
    { label: "I'm doing okay", emoji: "🙂", color: "#e6f9f0", text: "#1a7a4a" },
    { label: "I'm actually thriving", emoji: "🔥", color: "#fff8e6", text: "#a0620a" },
    { label: "I'm running on empty", emoji: "🪫", color: "#f0e8ff", text: "#5a1aab" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f5f0eb 0%, #eef2f8 100%)" }}>

      {/* Header — totally different energy */}
      <div style={{
        background: "linear-gradient(135deg, #2d1b4e 0%, #1a3a6e 100%)",
        padding: "48px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(255,220,150,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 40 }}>☕</div>
          <div style={{ color: WHITE, fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700, marginTop: 10, letterSpacing: 1 }}>
            The Break Room
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginTop: 10, maxWidth: 460, margin: "10px auto 0", lineHeight: 1.7 }}>
            Leave the pitch deck at the door. This is the one place on Backbone where we talk about the human side of building something — the hard days, the doubt, the burnout, and the wins that nobody else understands.
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 14, letterSpacing: 1 }}>
            NO METRICS · NO HUSTLE PORN · JUST REAL PEOPLE
          </div>
        </div>
      </div>

      {/* Daily check-in */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 24px 0" }}>
        <div style={{ background: WHITE, borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 28 }}>
          <div style={{ color: "#2d1b4e", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>How are you showing up today?</div>
          <div style={{ color: "#9aa0b8", fontSize: 13, marginBottom: 16 }}>Honest answers only. Nobody is judging here.</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {checkIns.map(c => (
              <button key={c.label} onClick={() => setCheckIn(c.label)} style={{
                background: checkIn === c.label ? c.color : "#f8f9fc",
                border: checkIn === c.label ? `2px solid ${c.text}` : "2px solid #eee",
                color: checkIn === c.label ? c.text : "#5a6a9a",
                padding: "10px 18px", borderRadius: 24, cursor: "pointer",
                fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 7,
                transition: "all 0.15s",
              }}>
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
          {checkIn && (
            <div style={{ marginTop: 14, padding: "12px 16px", background: "#f8f9fc", borderRadius: 10, color: "#5a6a9a", fontSize: 13, lineHeight: 1.6 }}>
              {checkIn === "I need a moment" && "Take it. You earned it. Scroll down — you're in the right place."}
              {checkIn === "I'm doing okay" && "Okay is underrated. Steady wins the race."}
              {checkIn === "I'm actually thriving" && "Love this for you. Drop something in the wins thread — someone needs to hear it."}
              {checkIn === "I'm running on empty" && "You came here instead of quitting. That matters. Read the 2am thread — you're not alone."}
            </div>
          )}
        </div>

        {/* Thread view */}
        {activeThread ? (
          <div>
            <button onClick={() => setActiveThread(null)} style={{
              background: "transparent", border: "none", color: "#9aa0b8", cursor: "pointer",
              fontSize: 13, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 6,
            }}>← Back to Break Room</button>
            <div style={{ background: WHITE, borderRadius: 16, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{activeThread.emoji}</div>
              <div style={{ color: "#2d1b4e", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{activeThread.title}</div>
              <div style={{ color: "#5a6a9a", fontSize: 14, lineHeight: 1.7, padding: "14px 0", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", marginBottom: 16 }}>
                "{activeThread.preview}"
              </div>
              {activeThread.replies_content.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#2d1b4e", color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{r.avatar}</div>
                  <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "10px 14px", flex: 1 }}>
                    <div style={{ color: "#2d1b4e", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.author}</div>
                    <div style={{ color: "#5a6a9a", fontSize: 13, lineHeight: 1.6 }}>{r.text}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <input placeholder="Add your voice..." style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "2px solid #eee", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                <button style={{ background: "#2d1b4e", color: WHITE, border: "none", padding: "10px 18px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Reply</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ color: "#2d1b4e", fontSize: 16, fontWeight: 700 }}>Open Threads</div>
              <button style={{ background: "#2d1b4e", color: WHITE, border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                + Share Something
              </button>
            </div>
            {threads.map(thread => (
              <div key={thread.id} onClick={() => setActiveThread(thread)} style={{
                background: WHITE, borderRadius: 14, padding: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)", cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "transform 0.1s",
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{thread.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                      <div style={{ color: "#2d1b4e", fontSize: 15, fontWeight: 700 }}>{thread.title}</div>
                      <span style={{ color: "#c0c8e0", fontSize: 11 }}>{thread.time}</span>
                    </div>
                    <div style={{ color: "#7a8aaa", fontSize: 13, marginTop: 5, lineHeight: 1.5, fontStyle: "italic" }}>"{thread.preview}"</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                      <span style={{ color: "#b0b8d0", fontSize: 12 }}>💬 {thread.replies}</span>
                      <span style={{ color: "#b0b8d0", fontSize: 12 }}>🤍 {thread.hearts}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

export default function BackboneApp() {
  const [page, setPage] = useState("home");
  const [premium, setPremium] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} setPremium={setPremium} />;
      case "resources": return <ResourcesPage premium={premium} />;
      case "community": return <CommunityPage premium={premium} setPage={setPage} />;
      case "bone": return <BonePage premium={premium} setPage={setPage} />;
      case "upgrade": return <UpgradePage setPremium={setPremium} setPage={setPage} />;
      case "breakroom": return <BreakRoomPage />;
      default: return <HomePage setPage={setPage} setPremium={setPremium} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: GRAY, fontFamily: "'Segoe UI', system-ui, sans-serif", color: TEXT }}>
      <NavBar page={page} setPage={setPage} premium={premium} setPremium={setPremium} />
      {renderPage()}
    </div>
  );
}
