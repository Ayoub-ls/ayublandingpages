import React from 'react';
import { ShoppingBag } from 'lucide-react';
import './index.css';

const AVAILABLE_SIZES = [2, 4, 6, 8, 10, 12, 14, 16];

export default function SizeSelector({ sizeQuantities, onUpdateQty, onOpenSizeChart }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
      {/* Size and Quantity Selector Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>اختر المقاسات والكمية:</span>
          </label>
          <button
            onClick={onOpenSizeChart}
            className="text-xs font-bold text-algeria-green hover:underline focus:outline-none"
          >
            جدول المقاسات
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVAILABLE_SIZES.map((size) => {
            const label = size >= 12 ? "سنة" : "سنوات";
            const qty = sizeQuantities[size] || 0;
            const hasQty = qty > 0;

            return (
              <div
                key={size}
                className={`rounded-2xl p-3 flex flex-col items-center justify-center transition-all ${hasQty
                    ? "border-2 border-algeria-green bg-emerald-50 text-algeria-green"
                    : "border border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                  }`}
              >
                <span className="font-bold text-lg leading-none">{size}</span>
                <span className="text-[10px] opacity-70 mt-1 mb-3">{label}</span>
                <div className="flex items-center bg-slate-50 rounded-xl p-1 w-full justify-between border border-slate-100">
                  <button
                    onClick={() => onUpdateQty(size, -1)}
                    className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 font-bold text-slate-600 focus:outline-none transition-all active:scale-95"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm w-6 text-center text-slate-700">
                    {qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(size, 1)}
                    className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-100 font-bold text-slate-600 focus:outline-none transition-all active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 font-semibold leading-relaxed mt-2">
          * اطلب قطعتين أو أكثر للحصول على شحن مخفض أو مجاني!
        </div>
      </div>
    </div>
  );
}
