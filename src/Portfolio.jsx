import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, ExternalLink, Download, Mail, Code2, GitBranch, Database, Server,
  Sparkles, Lock, Plus, Trash2, X, Check, Send, Linkedin, MapPin, Boxes,
  Globe, Layers, Zap, Menu, Unlock, User, ArrowUpRight, CalendarDays,
} from "lucide-react";

/* =========================================================================
   EDIT ME — swap in your own details. Everything on the page derives
   from these constants, so this is the only block you should need to touch.
   ========================================================================= */
const PROFILE = {
  name: "Pradiksa P",
  role: "Software Development Engineer",
  tagline: "Python Developer · Full-Stack Engineer · Embedded & Real-Time Systems",
  email: "pradiksadeeksha@gmail.com",
  phone: "+91-9384418517",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  location: "Salem, Tamil Nadu, India",
  startDate: new Date(2022, 9, 1), // October 2022
  adminPassphrase: "editme", // change this — see note in the admin panel
  // Drop your photo URL (or a base64 data URI) here. Leave blank to show a
  // placeholder silhouette on the front face of the flip card.
  photo: "",
};

const TECH_STACK = {
  Languages: ["Python", "C++", "JavaScript", "Dart"],
  Frameworks: ["Flask", "PyQt5", "Qt", "React.js", "React Native", "Flutter"],
  Protocols: ["MQTT", "Modbus", "BACnet", "REST APIs"],
  Databases: ["MySQL", "MongoDB"],
  Tools: ["Git", "Docker", "GDK/GTK", "CI/CD"],
};

const AI_TOOLS = [
  { name: "ChatGPT", use: "Architecture exploration & rapid debugging" },
  { name: "Claude", use: "Code review, documentation & refactors" },
  { name: "Stitch", use: "UI generation & interface prototyping" },
];

const DEFAULT_PROJECTS = [
  {
    id: "p1",
    title: "Pharmacy E-Commerce Platform",
    description: "A full-stack pharmacy e-commerce app with product listing, cart, order tracking, an admin panel, real-time delivery tracking, and push notifications via Firebase.",
    tech: ["React.js", "React Native", "Flask", "Firebase"],
    github: "",
    demo: "",
  },
  {
    id: "p2",
    title: "Industrial Automation System",
    description: "A Flask backend for real-time data acquisition and device control, integrating BACnet/Modbus protocols with monitoring, alerts, and analytics dashboards.",
    tech: ["Flask", "BACnet", "Modbus", "REST APIs"],
    github: "",
    demo: "",
  },
  {
    id: "p3",
    title: "Product Purchase Website",
    description: "A full-stack purchase platform with license management, a product catalog, admin dashboard, authentication, and payment integration.",
    tech: ["React.js", "Flask", "MySQL"],
    github: "",
    demo: "",
  },
  {
    id: "p4",
    title: "IoT Monitoring Dashboard",
    description: "A PyQt5 desktop application streaming live device status over MQTT, with local data logging, an alert engine, and interactive charts and logs.",
    tech: ["PyQt5", "MQTT", "Python"],
    github: "",
    demo: "",
  },
  {
    id: "p5",
    title: "LiDAR Vehicle Tracking System",
    description: "A high-performance C++/Qt desktop app for LiDAR point-cloud ingestion, vehicle motion tracking, playback controls, and analytics on large real-time data streams.",
    tech: ["C++", "Qt", "LiDAR"],
    github: "",
    demo: "",
  },
];

const TIMELINE = [
  { date: "Oct 2022 – Dec 2023", title: "Python Developer, Krishtec", detail: "Built real-time industrial automation tooling with Flask, MQTT, Modbus and BACnet, plus a PyQt5 IoT monitoring dashboard." },
  { date: "Jan 2024 – Jun 2025", title: "Software Development Engineer, CODEWENTS", detail: "Delivered full-stack platforms with React.js, React Native and Flask, including an e-commerce app and a license-managed purchase system." },
  { date: "Sep 2025 – Dec 2025", title: "Software Development Engineer, ADMINITY", detail: "Built scalable web and desktop software, from React front-ends to Qt-based real-time visualization tools like the LiDAR tracking system." },
  { date: "Jan 2026 – Present", title: "Software Engineer, Biorad", detail: "Continuing to grow as a software engineer, applying full-stack, backend, and real-time systems experience to new challenges." },
];

/* ========================================================================= */

function getExperience(start) {
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  months = Math.max(months, 0);
  return { years: (months / 12).toFixed(1), months };
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
      const handler = (e) => setReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } catch (e) {}
  }, []);
  return reduced;
}

function Counter({ target, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SkillRing({ label, percent, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const r = 34;
  const circumference = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#27272a" strokeWidth="8" />
          <motion.circle
            cx="48" cy="48" r={r} fill="none" strokeWidth="8" strokeLinecap="round"
            stroke="url(#ringGradient)"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * (1 - percent / 100) } : {}}
            transition={{ duration: 1.2, delay, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-slate-200 text-sm font-semibold">
          {percent}%
        </div>
      </div>
      <span className="text-slate-400 text-sm">{label}</span>
    </div>
  );
}

function FloatingOrb({ className, delay = 0, reduced }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={reduced ? {} : { y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function FloatingChip({ icon: Icon, label, className, delay = 0, reduced }) {
  return (
    <motion.div
      className={`absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs text-slate-300 shadow-lg ${className}`}
      animate={reduced ? {} : { y: [0, -14, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon size={13} className="text-cyan-300" />
      {label}
    </motion.div>
  );
}

function FlipAvatar({ name, photo, size = 152 }) {
  const [flipped, setFlipped] = useState(false);
  const initials = getInitials(name || "?");
  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Toggle profile photo and avatar"
        className="relative"
        style={{ width: size, height: size, perspective: 900 }}
      >
        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-violet-500/30 blur-xl" />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-full overflow-hidden border border-white/15 shadow-2xl bg-slate-900 flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={size * 0.42} className="text-slate-600" />
            )}
          </div>
          <div
            className="absolute inset-0 rounded-full overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500/40 via-slate-900 to-violet-500/40"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="font-display font-bold text-white" style={{ fontSize: size * 0.3 }}>
              {initials}
            </span>
          </div>
        </motion.div>
        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 border border-white/15 flex items-center justify-center">
          <Sparkles size={13} className="text-cyan-300" />
        </span>
      </button>
      <span className="text-[11px] text-slate-500 tracking-wide">tap to flip</span>
    </div>
  );
}

function SectionHeader({ eyebrow, title, align = "left" }) {
  const isCenter = align === "center";
  return (
    <div className={`mb-12 ${isCenter ? "text-center" : ""}`}>
      <div className={`flex items-center gap-2 mb-3 ${isCenter ? "justify-center" : ""}`}>
        <span className="w-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
        <span className="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "ai", label: "AI Tools" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Portfolio() {
  const reduced = usePrefersReducedMotion();
  const exp = getExperience(PROFILE.startDate);
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const headline = "Building Intelligent Web Applications & Scalable Software Solutions";

  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [showAdmin, setShowAdmin] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", tech: "", github: "", demo: "" });

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (reduced) { setTyped(headline); return; }
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setTyped(headline.slice(0, i));
      if (i >= headline.length) clearInterval(iv);
    }, 22);
    return () => clearInterval(iv);
  }, [reduced]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("portfolio:projects", false);
        if (res && res.value) setProjects(JSON.parse(res.value));
      } catch (e) {}
    })();
  }, []);

  const persistProjects = useCallback(async (next) => {
    setProjects(next);
    try {
      await window.storage.set("portfolio:projects", JSON.stringify(next), false);
    } catch (e) {
      console.error("Could not save projects", e);
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActiveSection(offsets[0].id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const lines = [
      `${PROFILE.name}`,
      `${PROFILE.role}`,
      `${PROFILE.email} | ${PROFILE.phone} | ${PROFILE.github}`,
      "",
      `EXPERIENCE (${exp.years}+ years, since October 2022)`,
      ...TIMELINE.map((t) => `- [${t.date}] ${t.title}: ${t.detail}`),
      "",
      "TECH STACK",
      ...Object.entries(TECH_STACK).map(([k, v]) => `- ${k}: ${v.join(", ")}`),
      "",
      "AI-AUGMENTED DEVELOPMENT",
      ...AI_TOOLS.map((a) => `- ${a.name}: ${a.use}`),
      "",
      "PROJECTS",
      ...projects.map((p) => `- ${p.title}: ${p.description}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${PROFILE.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const openAdmin = () => {
    setShowAdmin(true);
    setAuthError(false);
  };

  const tryAuth = () => {
    if (passInput === PROFILE.adminPassphrase) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const startEdit = (project) => {
    setEditingId(project ? project.id : "new");
    setForm(
      project
        ? { title: project.title, description: project.description, tech: project.tech.join(", "), github: project.github, demo: project.demo }
        : { title: "", description: "", tech: "", github: "", demo: "" }
    );
  };

  const saveProject = () => {
    if (!form.title.trim()) return;
    const techArr = form.tech.split(",").map((t) => t.trim()).filter(Boolean);
    if (editingId === "new") {
      const next = [...projects, { id: `p${Date.now()}`, title: form.title, description: form.description, tech: techArr, github: form.github, demo: form.demo }];
      persistProjects(next);
    } else {
      const next = projects.map((p) => (p.id === editingId ? { ...p, title: form.title, description: form.description, tech: techArr, github: form.github, demo: form.demo } : p));
      persistProjects(next);
    }
    setEditingId(null);
  };

  const deleteProject = (id) => {
    persistProjects(projects.filter((p) => p.id !== id));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    try {
      const res = await window.storage.get("portfolio:messages", false).catch(() => null);
      const existing = res && res.value ? JSON.parse(res.value) : [];
      existing.push({ ...contactForm, at: new Date().toISOString() });
      await window.storage.set("portfolio:messages", JSON.stringify(existing), false);
    } catch (e) {}
    setContactSent(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSent(false), 4000);
  };

  const techCount = Object.values(TECH_STACK).flat().length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(34,211,238,0.3); color: #e6edf3; }
      `}</style>

      {/* NAV */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-6">
            <button onClick={() => scrollTo("about")} className="font-display font-bold text-white text-lg flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 text-xs">
                {getInitials(PROFILE.name)}
              </span>
              {PROFILE.name}
            </button>
            <div className="hidden md:flex items-center gap-1 ml-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-sm px-3 py-2 transition-colors ${
                    activeSection === item.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span layoutId="nav-underline" className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex ml-2 px-4 py-2 rounded-full bg-white text-slate-950 text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Let's Talk
            </button>
            <button onClick={openAdmin} className="hidden md:flex items-center text-slate-500 hover:text-cyan-300 transition-colors" title="Manage projects">
              <Lock size={16} />
            </button>
            <button className="md:hidden ml-auto text-slate-300" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-950 border-t border-white/5 px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm text-left text-slate-300 py-2">
                {item.label}
              </button>
            ))}
            <button onClick={openAdmin} className="text-sm text-left text-slate-500 py-2 flex items-center gap-1.5">
              <Lock size={13} /> Admin
            </button>
          </div>
        )}
      </div>

      {/* HERO */}
      <section id="hero" className="relative pt-36 pb-28 px-4 sm:px-6 overflow-hidden">
        <FloatingOrb className="w-72 h-72 bg-cyan-500/20 top-10 -left-20" delay={0} reduced={reduced} />
        <FloatingOrb className="w-80 h-80 bg-violet-500/20 top-40 -right-24" delay={2} reduced={reduced} />
        <FloatingOrb className="w-56 h-56 bg-blue-500/20 bottom-0 left-1/3" delay={4} reduced={reduced} />

        <FloatingChip icon={Code2} label="React" className="top-24 left-[6%]" delay={0} reduced={reduced} />
        <FloatingChip icon={Server} label="Flask" className="top-60 left-[10%]" delay={1.2} reduced={reduced} />
        <FloatingChip icon={Boxes} label="Docker" className="bottom-20 right-[12%]" delay={0.4} reduced={reduced} />
        <FloatingChip icon={Database} label="PostgreSQL" className="bottom-10 left-[18%]" delay={1.6} reduced={reduced} />
        <FloatingChip icon={GitBranch} label="Git" className="top-40 right-[10%]" delay={0.9} reduced={reduced} />
        <FloatingChip icon={Globe} label="REST API" className="bottom-36 left-[46%]" delay={0.2} reduced={reduced} />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300 mb-6">
              <Sparkles size={13} /> {PROFILE.role}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-white min-h-[7rem] sm:min-h-[9rem]">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                {typed}
              </span>
              <motion.span
                className="inline-block w-1.5 h-7 sm:h-9 bg-cyan-300 ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              />
            </h1>
            <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-xl">{PROFILE.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => scrollTo("projects")} className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                View Projects <ArrowUpRight size={15} />
              </button>
              <button onClick={handleDownloadResume} className="px-5 py-2.5 rounded-full border border-white/15 text-slate-200 text-sm font-semibold hover:border-cyan-400/60 hover:text-cyan-300 transition-colors flex items-center gap-2">
                <Download size={15} /> Download Resume
              </button>
              <button onClick={() => scrollTo("contact")} className="px-5 py-2.5 rounded-full border border-white/15 text-slate-200 text-sm font-semibold hover:border-cyan-400/60 hover:text-cyan-300 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <FlipAvatar name={PROFILE.name} photo={PROFILE.photo} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Who I am" title="About Me" />
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2 space-y-4 text-slate-400 leading-relaxed">
            <p>
              Since October {PROFILE.startDate.getFullYear()}, I've worked as a {PROFILE.role}, designing, developing,
              and deploying software across web, desktop, and embedded domains.
            </p>
            <p>
              I build backend APIs with Flask, real-time systems on MQTT, Modbus, and BACnet, and front ends with
              React.js, React Native, and Flutter. On the desktop side, I build responsive GUIs in PyQt5 and C++/Qt,
              including high-performance visualization tools.
            </p>
            <p>
              I pick up new tools quickly and lean on modern AI systems to accelerate that process, so I can ship
              production-ready software without cutting corners on quality.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Quick facts</p>
            <p className="flex items-center gap-2 text-slate-300 text-sm"><Zap size={14} className="text-cyan-300" /> {exp.years}+ years experience</p>
            <p className="flex items-center gap-2 text-slate-300 text-sm"><Layers size={14} className="text-cyan-300" /> Web · Backend · Desktop · Embedded</p>
            <p className="flex items-center gap-2 text-slate-300 text-sm"><MapPin size={14} className="text-cyan-300" /> {PROFILE.location}</p>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="What I use" title="Tech Stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(TECH_STACK).map(([key, items], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/30 hover:bg-white/[0.05] transition-colors"
            >
              <p className="text-sm font-semibold text-white mb-3">{key}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-cyan-200 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-8">
          <SkillRing label="Backend" percent={92} delay={0} />
          <SkillRing label="Frontend" percent={85} delay={0.1} />
          <SkillRing label="Databases" percent={88} delay={0.2} />
          <SkillRing label="Desktop & Embedded" percent={82} delay={0.3} />
          <SkillRing label="AI Tooling" percent={90} delay={0.4} />
        </div>
      </section>

      {/* AI-AUGMENTED DEVELOPMENT */}
      <section id="ai" className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Working smarter" title="AI-Augmented Development" />
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-violet-500/[0.06] p-6 sm:p-8">
          <p className="text-slate-300 leading-relaxed mb-8">
            I integrate software engineering expertise with modern AI tools to accelerate development, enhance code
            quality, and rapidly prototype production-ready solutions.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {AI_TOOLS.map((tool) => (
              <div key={tool.name} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                <p className="font-display text-white font-semibold mb-1.5 flex items-center gap-1.5">
                  <Zap size={14} className="text-violet-300" /> {tool.name}
                </p>
                <p className="text-slate-400 text-sm">{tool.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Selected work" title="Featured Projects" />
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all"
            >
              <div className="h-28 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20" />
              <div className="p-5">
                <h3 className="font-display font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm mb-3 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-[11px] text-cyan-200 border border-white/10">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors">
                      <Github size={15} /> Code
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="The journey" title="Experience Timeline" />
        <div className="relative pl-8 border-l border-white/10 space-y-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[2.35rem] top-1 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 ring-4 ring-slate-950" />
              <p className="text-xs text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                <CalendarDays size={12} /> {item.date}
              </p>
              <h3 className="font-display font-semibold text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"><Counter target={parseFloat(exp.years)} decimals={1} suffix="+" /></p>
            <p className="text-slate-500 text-xs mt-1">Years Experience</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"><Counter target={projects.length} /></p>
            <p className="text-slate-500 text-xs mt-1">Projects Completed</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"><Counter target={techCount} /></p>
            <p className="text-slate-500 text-xs mt-1">Technologies Used</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"><Counter target={20} suffix="+" /></p>
            <p className="text-slate-500 text-xs mt-1">APIs Developed</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-3xl font-bold bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent"><Counter target={92} suffix="%" /></p>
            <p className="text-slate-500 text-xs mt-1">Learning Progress</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader eyebrow="Get in touch" title="Contact" align="center" />
        <form onSubmit={handleContactSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500">Name</label>
              <input
                value={contactForm.name}
                onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500">Message</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
              rows={4}
              className="mt-1 w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              placeholder="Let's build something..."
              required
            />
          </div>
          <button type="submit" className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Send size={15} /> {contactSent ? "Message Sent" : "Send Message"}
          </button>
          <AnimatePresence>
            {contactSent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-emerald-400 text-xs flex items-center gap-1.5">
                <Check size={13} /> Thanks — I'll get back to you soon.
              </motion.p>
            )}
          </AnimatePresence>
        </form>
        <div className="flex flex-col items-center gap-3 mt-6">
          <div className="flex justify-center gap-5">
            <a href={`mailto:${PROFILE.email}`} className="text-slate-500 hover:text-cyan-300 transition-colors"><Mail size={20} /></a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-300 transition-colors"><Github size={20} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-300 transition-colors"><Linkedin size={20} /></a>
          </div>
          <p className="text-xs text-slate-500">{PROFILE.email} · {PROFILE.phone}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} {PROFILE.name}. Built with React &amp; Tailwind.</span>
        </div>
      </footer>

      {/* ADMIN MODAL */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAdmin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-white flex items-center gap-2">
                  {authed ? <Unlock size={16} className="text-cyan-300" /> : <Lock size={16} className="text-slate-500" />}
                  Manage Projects
                </h3>
                <button onClick={() => { setShowAdmin(false); setEditingId(null); }} className="text-slate-500 hover:text-slate-300">
                  <X size={18} />
                </button>
              </div>

              {!authed ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    This is a lightweight, client-side gate for personal use while you edit your own copy of the
                    site — not real authentication. Set <code className="text-cyan-300">PROFILE.adminPassphrase</code> in
                    the code to your own value.
                  </p>
                  <input
                    type="password"
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && tryAuth()}
                    placeholder="Passphrase"
                    className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60"
                  />
                  {authError && <p className="text-red-400 text-xs">Incorrect passphrase.</p>}
                  <button onClick={tryAuth} className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition-opacity">
                    Unlock
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {editingId ? (
                    <div className="space-y-3 rounded-xl border border-white/10 p-4">
                      <input placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60" />
                      <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={2} className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60 resize-none" />
                      <input placeholder="Technologies (comma separated)" value={form.tech} onChange={(e) => setForm((f) => ({ ...f, tech: e.target.value }))} className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60" />
                      <input placeholder="GitHub URL" value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60" />
                      <input placeholder="Live demo URL (optional)" value={form.demo} onChange={(e) => setForm((f) => ({ ...f, demo: e.target.value }))} className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/60" />
                      <div className="flex gap-2">
                        <button onClick={saveProject} className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                          <Check size={14} /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-xl border border-white/10 text-slate-300 text-sm hover:border-white/20 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => startEdit(null)} className="w-full px-4 py-2 rounded-xl border border-dashed border-white/15 text-slate-400 text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5">
                      <Plus size={14} /> Add Project
                    </button>
                  )}

                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-2 rounded-xl border border-white/10 px-3 py-2">
                        <span className="text-sm text-slate-300 truncate">{p.title}</span>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => startEdit(p)} className="text-slate-500 hover:text-cyan-300"><Layers size={14} /></button>
                          <button onClick={() => deleteProject(p.id)} className="text-slate-500 hover:text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
