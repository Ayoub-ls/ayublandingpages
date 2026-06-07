import React from 'react';
import { ShieldCheck } from 'lucide-react';
import './index.css';

export default function Header() {
  return (
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Crest */}
        <div class="flex items-center gap-3">
          <span class="text-3xl">🇩🇿</span>
          <div>
            <h1 class="text-lg font-extrabold text-algeria-green leading-none">Amourshop</h1>
            <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Premium Kids Wear</span>
          </div>
        </div>

        {/* Trust Header Badge */}
        <div
          class="hidden sm:flex items-center gap-2 bg-emerald-50 text-algeria-green px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
          <ShieldCheck className="w-4 h-4" />
          <span>دفع عند الاستلام في 58 ولاية</span>
        </div>
      </div>
    </header>
  );
}
