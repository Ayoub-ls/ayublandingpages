import React from 'react';
import { Truck, Award, BadgeDollarSign } from 'lucide-react';
import './index.css';

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Delivery Badge */}
      <div className="bg-white px-4 py-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-algeria-green flex items-center justify-center shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs">توصيل للولايات</h4>
          <p className="text-[10px] text-slate-400">توصيل منزلي سريع ومضمون</p>
        </div>
      </div>

      {/* Quality Badge */}
      <div className="bg-white px-4 py-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-algeria-red flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs">جودة مضمونة 100%</h4>
          <p className="text-[10px] text-slate-400">قماش ناعم وخياطة ممتازة</p>
        </div>
      </div>

      {/* COD Payment Badge */}
      <div className="bg-white px-4 py-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <BadgeDollarSign className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs">دفع عند الاستلام</h4>
          <p class="text-[10px] text-slate-400">لا تدفع شيئاً حتى تستلم طقمك</p>
        </div>
      </div>
    </div>
  );
}
