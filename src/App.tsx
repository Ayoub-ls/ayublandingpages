// ═══════════════════════════════════════
// HOW TO ADD A NEW LANDING PAGE:
// 1. Create src/pages/clientname/ProductName.jsx
// 2. Import it in App.jsx
// 3. Add route: /clientname/product-name
// 4. git push → Vercel auto-deploys
// ═══════════════════════════════════════

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/amourshop/Miyo";
import PairDZ from './pages/amourshop/App_PairDZ';
import PairDZHigh from "./pages/amourshop/App_PairDZ_high";
import NotFound from "./pages/NotFound";
import { Link2, Layers, BookOpen, Database, CheckCircle2 } from "lucide-react";
import Rita from "./pages/Zena/Rita";


function RootPortal() {
  const pages = [
    {
      name: "Maio Landing Page",
      path: "/amourshop/maio",
      client: "amourshop",
      product: "maio",
      icon: "🏊",
      color: "from-teal-500/10 to-emerald-500/10 hover:border-teal-500/40 text-teal-400"
    },
    {
      name: "Pair DZ Landing Page",
      path: "/amourshop/pair-dz",
      client: "amourshop",
      product: "pair-dz",
      icon: "👕",
      color: "from-amber-500/10 to-orange-500/10 hover:border-amber-500/40 text-amber-400"
    }
  ];

  return (
    <div id="portal-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500/30 selection:text-white antialiased">
      {/* Header */}
      <header id="main-header" className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 animate-pulse">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Landing Pages Hub</h1>
              <p className="text-[10px] font-mono text-slate-500 tracking-wider">SHELL SYSTEM ENGINE</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 animate-bounce" />
            ONLINE STANDBY
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center space-y-12">
        {/* Welcome Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Multiple Landing Pages, One Deployment
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Welcome to your unified landing page routing engine. This deployment hosts multiple separate client acquisition landing pages under a single centralized resource frame.
          </p>
        </div>

        {/* Landing Pages Grid */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto w-full">
          {pages.map((page, idx) => (
            <Link
              key={idx}
              to={page.path}
              className={`block bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/30 group bg-gradient-to-br ${page.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{page.icon}</div>
                <div className="p-1 px-2.5 bg-slate-900/60 rounded-lg text-[10px] font-mono font-semibold tracking-wider uppercase text-slate-400 group-hover:bg-slate-800/85">
                  client: {page.client}
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {page.name}
                </h3>
                <p className="text-xs font-mono text-slate-500">{page.path}</p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-slate-250 transition-colors">
                <span>Launch Landing Page</span>
                <Link2 className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Connection Status & Instructions Card */}
        <div className="max-w-3xl mx-auto w-full bg-slate-900/25 border border-slate-900/80 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" /> DEPLOYER GUIDANCE
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            {/* Supabase Status */}
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  Supabase Backend
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">ACTIVE</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono truncate">
                {import.meta.env.VITE_SUPABASE_URL || "CREDENTIALS READ FROM ENV"}
              </p>
              <p className="text-[10px] text-slate-400">
                All order submissions are handled centrally through the unified state module.
              </p>
            </div>

            {/* Addition Guide */}
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-900 space-y-2">
              <span className="font-semibold text-slate-300 block">
                🚀 Adding new pages
              </span>
              <ul className="space-y-1 list-decimal list-inside text-[10px] text-slate-400 leading-relaxed">
                <li>Create component in <code className="text-indigo-400 font-mono">/src/pages/</code></li>
                <li>Import inside <code className="text-indigo-400 font-mono">src/App.tsx</code></li>
                <li>Assign the corresponding Route path</li>
                <li>Vercel autodeploys live instances</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="main-footer" className="border-t border-slate-900 py-6 text-center text-xs text-slate-600 font-mono">
        © {new Date().getFullYear()} Landing Pages Hub. Integrated & Connected.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPortal />} />
        <Route path="/amourshop/maio" element={<LandingPage />} />
        <Route path="/amourshop/pair-dz" element={<PairDZ />} />
        <Route path="/amourshop/pair-dz-high" element={<PairDZHigh />} />
        <Route path="/zena/rita" element={<Rita />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
