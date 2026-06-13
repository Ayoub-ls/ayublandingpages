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
