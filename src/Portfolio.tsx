import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PALETTE — Blueprint / technical-drawing theme                      */
/*  Chosen to reflect Akash's mechanical-engineering -> software path  */
/* ------------------------------------------------------------------ */
const palette = {
  ink: "#0A1A2E", // blueprint navy — page background
  panel: "#0F2440", // panel background
  panelAlt: "#132A4A", // slightly lighter panel / hover
  line: "#3D6E8F", // muted linework blue (borders, rules)
  lineBright: "#5EC8DE", // bright cyan — accents, hover states
  text: "#EAF0F6", // primary text
  muted: "#8CA0B8", // secondary / caption text
  amber: "#F2A65A", // marker-pen amber — CTAs, highlights
  amberDim: "#C98A4B",
};

const mono = "'JetBrains Mono', ui-monospace, monospace";
const display = "'Space Grotesk', sans-serif";
const body = "'Inter', sans-serif";

/* ------------------------------------------------------------------ */
/*  DATA — sourced from Akash's resume                                 */
/* ------------------------------------------------------------------ */
const sheets = [
  { id: "about", num: "01", label: "ABOUT" },
  { id: "experience", num: "02", label: "EXPERIENCE" },
  { id: "projects", num: "03", label: "PROJECTS" },
  { id: "skills", num: "04", label: "SKILLS" },
  { id: "education", num: "05", label: "EDUCATION" },
  { id: "contact", num: "06", label: "CONTACT" },
];

const skills = [
  { item: "01", name: "C#", cat: "Language" },
  { item: "02", name: "JavaScript (ES6+)", cat: "Language" },
  { item: "03", name: "TypeScript", cat: "Language" },
  { item: "04", name: "HTML5", cat: "Language" },
  { item: "05", name: "ASP.NET Core", cat: "Backend" },
  { item: "06", name: ".NET Framework 4.x", cat: "Backend" },
  { item: "07", name: "ASP.NET Web API", cat: "Backend" },
  { item: "08", name: "Entity Framework Core", cat: "Backend" },
  { item: "09", name: "LINQ", cat: "Backend" },
  { item: "10", name: "REST APIs", cat: "Backend" },
  { item: "11", name: "Node.js", cat: "Backend" },
  { item: "12", name: "React.js", cat: "Frontend" },
  { item: "13", name: "Tailwind CSS", cat: "Frontend" },
  { item: "14", name: "Bootstrap", cat: "Frontend" },
  { item: "15", name: "SQL Server", cat: "Database" },
  { item: "16", name: "MongoDB", cat: "Database" },
  { item: "17", name: "Redis", cat: "Database" },
  { item: "18", name: "JWT / OAuth / RBAC", cat: "Security" },
  { item: "19", name: "Session Management", cat: "Security" },
  { item: "20", name: "Git · GitHub · GitHub Actions", cat: "Tooling" },
  { item: "21", name: "Postman · Visual Studio", cat: "Tooling" },
  { item: "22", name: "Socket.IO", cat: "Tooling" },
];

const projects = [
  {
    name: "Stationery Store System",
    stack: ["ASP.NET MVC", "C#", "SQL Server"],
    blurb:
      "Full-stack e-commerce platform with separate Admin and User portals — product catalog, real-time stock validation on the cart, and role-based access control governing inventory and account administration.",
    points: [
      "Bulk product creation via CSV import/export, cutting manual entry time by 80%",
      "Low-stock alerts and a sales analytics dashboard for admins",
      "Deployed and live in production",
    ],
    href: "https://stationary.runasp.net/", // TODO: replace with live project URL
  },
  {
    name: "SyncUp — Real-time Coaching Feed",
    stack: ["Node.js", "Express", "MongoDB", "Redis", "Socket.IO", "Next.js"],
    blurb:
      "Real-time activity feed built as a full-stack technical assessment, engineered for resilience under flaky connections and heavy write volume.",
    points: [
      "Socket.IO feed with reconnect handling and event deduplication",
      "Redis caching with MongoDB fallback for feed resilience",
      "Skeleton loading states and optimistic UI for a smooth read/write experience",
    ],
    href: "https://sync-up-assignment-se5o.vercel.app/", // TODO: replace with live project URL
  },
];

/* ------------------------------------------------------------------ */
/*  UTILITIES                                                           */
/* ------------------------------------------------------------------ */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShow(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, reduced]);

  return (
    <div ref={ref} className={`reveal ${show ? "show" : ""} ${className}`}>
      {children}
    </div>
  );
}

function CornerMark({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ position: "absolute", ...style }}
    >
      <line x1="7" y1="0" x2="7" y2="14" stroke={palette.lineBright} strokeWidth="1" opacity="0.55" />
      <line x1="0" y1="7" x2="14" y2="7" stroke={palette.lineBright} strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

function SheetHeader({
  num,
  label,
  title,
  subtitle,
}: {
  num: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span
          style={{ color: palette.amber, fontFamily: mono, letterSpacing: "0.25em" }}
          className="text-xs"
        >
          SHEET {num}
        </span>
        <span style={{ backgroundColor: palette.line, opacity: 0.35 }} className="h-px flex-1" />
        <span
          style={{ color: palette.muted, fontFamily: mono, letterSpacing: "0.2em" }}
          className="text-xs hidden sm:inline"
        >
          {label}
        </span>
      </div>
      <h2
        style={{ color: palette.text, fontFamily: display }}
        className="text-3xl md:text-4xl font-semibold"
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: palette.muted, fontFamily: body }} className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState("about");

  useEffect(() => {
    document.title = "Akash Kushwaha — Full-Stack Software Engineer";
  }, []);

  useEffect(() => {
    const sections = sheets
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSheet(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="grid-paper min-h-screen w-full"
      style={{ backgroundColor: palette.ink, fontFamily: body }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

        .grid-paper {
          background-color: ${palette.ink};
          background-image:
            linear-gradient(rgba(94,200,222,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,200,222,0.05) 1px, transparent 1px),
            linear-gradient(rgba(94,200,222,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(94,200,222,0.10) 1px, transparent 1px);
          background-size: 24px 24px, 24px 24px, 96px 96px, 96px 96px;
        }
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.show { opacity: 1; transform: none; }

        .card-corners::before,
        .card-corners::after { content: ""; }

        .proj-card { position: relative; transition: transform .3s ease, border-color .3s ease, background-color .3s ease; }
        .proj-card:hover { transform: translateY(-4px); background-color: ${palette.panelAlt}; }

        .bracket { position: absolute; width: 18px; height: 18px; opacity: 0; transition: opacity .3s ease; }
        .proj-card:hover .bracket { opacity: 1; }

        a:focus-visible, button:focus-visible {
          outline: 2px solid ${palette.lineBright};
          outline-offset: 2px;
        }

        ::selection { background: ${palette.amber}; color: ${palette.ink}; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none; opacity: 1; transform: none; }
          .proj-card:hover { transform: none; }
        }
      `}</style>

      {/* ---------------------------------------------------------- NAV */}
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{ backgroundColor: "rgba(10,26,46,0.85)", borderBottom: `1px solid ${palette.line}33` }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            style={{ fontFamily: mono, color: palette.lineBright }}
            className="text-sm tracking-widest"
          >
            [ AK&nbsp;/&nbsp;01 ]
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {sheets.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  fontFamily: mono,
                  color: activeSheet === s.id ? palette.amber : palette.muted,
                  letterSpacing: "0.12em",
                }}
                className="text-xs px-3 py-2 rounded transition-colors hover:text-white"
              >
                {s.num}·{s.label}
              </button>
            ))}
            <a
              href="mailto:908akashkushwaha@gmail.com"
              style={{ borderColor: palette.amber, color: palette.amber, fontFamily: mono }}
              className="ml-2 text-xs px-3 py-2 border rounded-sm hover:bg-white/5 transition-colors"
            >
              CONTACT →
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} color={palette.text} />
            ) : (
              <Menu size={22} color={palette.text} />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden px-5 pb-5 flex flex-col gap-1"
            style={{ borderTop: `1px solid ${palette.line}33` }}
          >
            {sheets.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{ fontFamily: mono, color: palette.muted }}
                className="text-left text-sm py-3 border-b"
              >
                <span style={{ color: palette.amber }}>{s.num}</span> — {s.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ---------------------------------------------------------- HERO */}
      <section id="hero" className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20">
        <Reveal>
          <div
            className="relative"
            style={{ border: `1px solid ${palette.line}55`, backgroundColor: palette.panel }}
          >
            <CornerMark style={{ top: -7, left: -7 }} />
            <CornerMark style={{ top: -7, right: -7 }} />
            <CornerMark style={{ bottom: -7, left: -7 }} />
            <CornerMark style={{ bottom: -7, right: -7 }} />

            <div className="p-6 md:p-12">
              <p
                style={{ color: palette.lineBright, fontFamily: mono, letterSpacing: "0.25em" }}
                className="text-xs mb-6"
              >
                PROJECT: CAREER — MECHANICAL ENGINEERING → SOFTWARE ENGINEERING
              </p>
              <h1
                style={{ color: palette.text, fontFamily: display }}
                className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]"
              >
                Akash Kushwaha
              </h1>
              <p
                style={{ color: palette.muted, fontFamily: body }}
                className="mt-5 text-base md:text-lg max-w-2xl leading-relaxed"
              >
                Full-stack software engineer building production systems with{" "}
                <span style={{ color: palette.text }}>ASP.NET Core</span>,{" "}
                <span style={{ color: palette.text }}>React</span> and{" "}
                <span style={{ color: palette.text }}>TypeScript</span> — shipping payment
                integrations, REST APIs and real-time features at Sigmoss Systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:908akashkushwaha@gmail.com"
                  style={{ backgroundColor: palette.amber, color: palette.ink, fontFamily: mono }}
                  className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity"
                >
                  <Mail size={16} /> EMAIL ME
                </a>
                <button
                  onClick={() => scrollTo("projects")}
                  style={{ borderColor: palette.line, color: palette.text, fontFamily: mono }}
                  className="inline-flex items-center gap-2 text-sm px-5 py-3 border rounded-sm hover:border-white transition-colors"
                >
                  VIEW PROJECTS <ArrowUpRight size={15} />
                </button>
              </div>
            </div>

            {/* title block strip */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 border-t"
              style={{ borderColor: `${palette.line}55` }}
            >
              {[
                { k: "DRAWN BY", v: "A. Kushwaha" },
                { k: "LOCATION", v: "Bangalore, IN" },
                { k: "STATUS", v: "Open to work" },
                { k: "SHEET", v: "01 / 06" },
              ].map((c, i) => (
                <div
                  key={c.k}
                  className="px-5 py-4"
                  style={{
                    borderLeft: i % 2 === 1 || i % 4 === 0 ? "none" : `1px solid ${palette.line}33`,
                    borderTop: i >= 2 ? `1px solid ${palette.line}33` : "none",
                  }}
                >
                  <p style={{ color: palette.muted, fontFamily: mono, letterSpacing: "0.15em" }} className="text-[10px]">
                    {c.k}
                  </p>
                  <p style={{ color: palette.text, fontFamily: mono }} className="text-sm mt-1">
                    {c.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <SheetHeader num="01" label="ABOUT" title="Origin & approach" />
        </Reveal>
        <Reveal delay={80}>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-5" style={{ color: palette.text, fontFamily: body }}>
              <p className="leading-relaxed">
                Akash started in <span style={{ color: palette.lineBright }}>Mechanical Engineering</span>,
                then rebuilt his career from the ground up through self-study and project-based
                learning. That path shapes how he works today: he treats a codebase the way he'd
                treat a mechanical system — trace the forces, understand every joint, then improve
                it deliberately rather than by guesswork.
              </p>
              <p className="leading-relaxed">
                Now a full-stack engineer at Sigmoss Systems, he works across{" "}
                <span style={{ color: palette.text }}>ASP.NET Core</span> and legacy{" "}
                <span style={{ color: palette.text }}>.NET Framework 4.x</span> codebases,
                shipping payment integrations, ordering systems and REST APIs used in production.
                He's most energized by problems with a clear before/after — a slow query made
                fast, a manual process made automatic, a fragile integration made reliable.
              </p>
            </div>

            <div
              className="p-6 space-y-4"
              style={{ border: `1px solid ${palette.line}40`, backgroundColor: palette.panel }}
            >
              <p style={{ color: palette.amber, fontFamily: mono, letterSpacing: "0.15em" }} className="text-[11px]">
                MATERIAL PROPERTIES
              </p>
              {[
                ["Experience", "1+ year, professional"],
                ["Core stack", ".NET · React · SQL Server"],
                ["Background", "B.Tech, Mechanical Eng."],
                ["Based in", "Bangalore, India"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 text-sm border-b pb-3" style={{ borderColor: `${palette.line}25` }}>
                  <span style={{ color: palette.muted, fontFamily: mono }}>{k}</span>
                  <span style={{ color: palette.text, fontFamily: mono }} className="text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <SheetHeader
            num="02"
            label="EXPERIENCE"
            title="Work order"
            subtitle="One role, held since April 2025 — spanning payments, real-time ordering and production support across legacy and modern .NET."
          />
        </Reveal>
        <Reveal delay={80}>
          <div style={{ border: `1px solid ${palette.line}40`, backgroundColor: palette.panel }}>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-5 border-b"
              style={{ borderColor: `${palette.line}33` }}
            >
              <div>
                <h3 style={{ color: palette.text, fontFamily: display }} className="text-xl font-semibold">
                  Software Engineer
                </h3>
                <p style={{ color: palette.lineBright, fontFamily: mono }} className="text-sm mt-1">
                  Sigmoss Systems Private Limited
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-1">
                <span style={{ color: palette.muted, fontFamily: mono }} className="text-xs">
                  APR 2025 — PRESENT
                </span>
                <span style={{ color: palette.muted, fontFamily: mono }} className="text-xs flex items-center gap-1">
                  <MapPin size={12} /> Bangalore, India
                </span>
              </div>
            </div>

            <ul className="px-6 py-6 space-y-4">
              {[
                "Integrated PhonePe and Paytm payment gateways into ASP.NET Web API — checksum verification, callback handling and idempotent payment processing for secure, reliable transactions.",
                "Built a QR-based digital ordering system with React and ASP.NET Core, enabling contactless menu browsing and reducing order errors and customer wait time.",
                "Built and optimized inventory and order management REST APIs with EF Core and LINQ — improved query performance through indexing and eliminated N+1 query patterns.",
                "Worked across .NET Framework 4.x and ASP.NET Core simultaneously — debugging legacy MVC modules while shipping new Web API features.",
                "Resolved production incidents through structured log analysis and root-cause investigation, reducing recurring errors and improving uptime.",
              ].map((point, i) => (
                <li key={i} className="flex gap-4">
                  <span style={{ color: palette.amber, fontFamily: mono }} className="text-xs pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: palette.text, fontFamily: body }} className="text-sm leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <SheetHeader
            num="03"
            label="PROJECTS"
            title="Selected builds"
            subtitle="Independent projects built to learn, ship and stress-test ideas end to end."
          />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className="proj-card p-6 h-full"
                style={{ border: `1px solid ${palette.line}40`, backgroundColor: palette.panel }}
              >
                <span className="bracket" style={{ top: 8, left: 8, borderTop: `2px solid ${palette.amber}`, borderLeft: `2px solid ${palette.amber}` }} />
                <span className="bracket" style={{ bottom: 8, right: 8, borderBottom: `2px solid ${palette.amber}`, borderRight: `2px solid ${palette.amber}` }} />

                <div className="flex items-start justify-between gap-3">
                  <h3 style={{ color: palette.text, fontFamily: display }} className="text-xl font-semibold">
                    {p.name}
                  </h3>
                  <a href={p.href} aria-label={`Open ${p.name}`} style={{ color: palette.lineBright }}>
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      style={{ color: palette.lineBright, borderColor: `${palette.lineBright}55`, fontFamily: mono }}
                      className="text-[11px] px-2 py-1 border rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p style={{ color: palette.muted, fontFamily: body }} className="text-sm leading-relaxed mt-4">
                  {p.blurb}
                </p>

                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} style={{ color: palette.text, fontFamily: body }} className="text-sm flex gap-2">
                      <span style={{ color: palette.amber }}>—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- SKILLS / BOM */}
      <section id="skills" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <SheetHeader
            num="04"
            label="SKILLS"
            title="Stack, itemized"
            subtitle="Every part that goes into what Akash ships, listed the way a build sheet would list it."
          />
        </Reveal>
        <Reveal delay={80}>
          <div style={{ border: `1px solid ${palette.line}40`, backgroundColor: palette.panel }}>
            <div
              className="hidden sm:grid grid-cols-[70px_1fr_160px] px-6 py-3 border-b"
              style={{ borderColor: `${palette.line}33`, fontFamily: mono }}
            >
              <span style={{ color: palette.muted }} className="text-[11px] tracking-widest">ITEM</span>
              <span style={{ color: palette.muted }} className="text-[11px] tracking-widest">DESIGNATION</span>
              <span style={{ color: palette.muted }} className="text-[11px] tracking-widest">CATEGORY</span>
            </div>
            <div>
              {skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="grid grid-cols-[40px_1fr] sm:grid-cols-[70px_1fr_160px] px-6 py-3 items-center"
                  style={{
                    borderBottom: i === skills.length - 1 ? "none" : `1px solid ${palette.line}22`,
                    backgroundColor: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                  }}
                >
                  <span style={{ color: palette.amber, fontFamily: mono }} className="text-xs">{skill.item}</span>
                  <span style={{ color: palette.text, fontFamily: body }} className="text-sm">{skill.name}</span>
                  <span
                    style={{ color: palette.lineBright, fontFamily: mono }}
                    className="text-[11px] mt-1 sm:mt-0 col-span-2 sm:col-span-1"
                  >
                    {skill.cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- EDUCATION */}
      <section id="education" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <SheetHeader num="05" label="EDUCATION" title="Foundation" />
        </Reveal>
        <Reveal delay={80}>
          <div
            className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ border: `1px solid ${palette.line}40`, backgroundColor: palette.panel }}
          >
            <div>
              <h3 style={{ color: palette.text, fontFamily: display }} className="text-lg font-semibold">
                B.Tech. in Mechanical Engineering
              </h3>
              <p style={{ color: palette.lineBright, fontFamily: mono }} className="text-sm mt-1">
                Madan Mohan Malaviya University of Technology
              </p>
              <p style={{ color: palette.muted, fontFamily: mono }} className="text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> Gorakhpur, UP
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p style={{ color: palette.muted, fontFamily: mono, letterSpacing: "0.15em" }} className="text-[10px]">CGPA</p>
                <p style={{ color: palette.text, fontFamily: mono }} className="text-lg mt-1">7.05 / 10</p>
              </div>
              <div>
                <p style={{ color: palette.muted, fontFamily: mono, letterSpacing: "0.15em" }} className="text-[10px]">DURATION</p>
                <p style={{ color: palette.text, fontFamily: mono }} className="text-lg mt-1">2020 — 2024</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div
            className="relative p-8 md:p-14 text-center"
            style={{ border: `1px solid ${palette.line}55`, backgroundColor: palette.panel }}
          >
            <CornerMark style={{ top: -7, left: -7 }} />
            <CornerMark style={{ top: -7, right: -7 }} />
            <CornerMark style={{ bottom: -7, left: -7 }} />
            <CornerMark style={{ bottom: -7, right: -7 }} />

            <p style={{ color: palette.amber, fontFamily: mono, letterSpacing: "0.25em" }} className="text-xs">
              SHEET 06 — CONTACT
            </p>
            <h2 style={{ color: palette.text, fontFamily: display }} className="text-3xl md:text-5xl font-semibold mt-4">
              Let's build something.
            </h2>
            <p style={{ color: palette.muted, fontFamily: body }} className="mt-4 max-w-xl mx-auto text-sm md:text-base">
              Open to full-stack and .NET/React roles at product and fintech companies.
              Reach out directly — no forms, no gatekeeping.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:908akashkushwaha@gmail.com"
                style={{ backgroundColor: palette.amber, color: palette.ink, fontFamily: mono }}
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity"
              >
                <Mail size={16} /> 908akashkushwaha@gmail.com
              </a>
              <a
                href="tel:+917019748875"
                style={{ borderColor: palette.line, color: palette.text, fontFamily: mono }}
                className="inline-flex items-center gap-2 text-sm px-5 py-3 border rounded-sm hover:border-white transition-colors"
              >
                <Phone size={16} /> +91-7019748875
              </a>
              <a
                href="https://www.linkedin.com/in/akash-kushwaha-35b812227/" /* TODO: replace with LinkedIn URL */
                style={{ borderColor: palette.line, color: palette.text, fontFamily: mono }}
                className="inline-flex items-center gap-2 text-sm px-5 py-3 border rounded-sm hover:border-white transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/akashkus121" /* TODO: replace with GitHub URL */
                style={{ borderColor: palette.line, color: palette.text, fontFamily: mono }}
                className="inline-flex items-center gap-2 text-sm px-5 py-3 border rounded-sm hover:border-white transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-10 pt-6" style={{ borderTop: `1px solid ${palette.line}25` }}>
          <p style={{ color: palette.muted, fontFamily: mono }} className="text-[11px]">
            AKASH KUSHWAHA — REV. 2026.07
          </p>
          <p style={{ color: palette.muted, fontFamily: mono }} className="text-[11px]">
            DRAWN IN BANGALORE, INDIA
          </p>
        </div>
      </section>
    </div>
  );
}
