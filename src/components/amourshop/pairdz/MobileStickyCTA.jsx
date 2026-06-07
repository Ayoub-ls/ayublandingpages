import React from 'react';
import { Zap } from 'lucide-react';
import './index.css';

export default function MobileStickyCTA({ totalPrice, onOpenOrderModal }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] p-4 flex sm:hidden gap-3 items-center justify-between"
    >
      <div className="space-y-0.5">
        <span className="text-[10px] text-slate-400 font-bold block leading-none">السعر الإجمالي:</span>
        <span className="text-2xl font-black text-algeria-green block">
          <span>{totalPrice}</span>
          <span className="text-xs font-semibold text-slate-500 mr-1">د.ج</span>
        </span>
      </div>
      <button
        onClick={onOpenOrderModal}
        className="flex-1 bg-algeria-green hover:bg-emerald-800 text-white py-4 px-6 rounded-2xl font-extrabold text-base shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 leading-none focus:outline-none"
      >
        <Zap className="w-4.5 h-4.5 fill-amber-300 text-amber-300" />
        <span>اطلب الآن</span>
      </button>
    </div>
  );
}
