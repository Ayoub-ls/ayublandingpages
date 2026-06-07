// ═══════════════════════════════════════════════════════
// pair-dz landing page — drop into:
// src/pages/amourshop/PairDZ.jsx
//
// Imports updated for landing-pages app structure:
//   components → ../../components/amourshop/pairdz/
// ═══════════════════════════════════════════════════════

import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import Header from '../../components/amourshop/pairdz/Header';
import ImageGallery from '../../components/amourshop/pairdz/ImageGallery';
import SizeSelector from '../../components/amourshop/pairdz/SizeSelector';
import TrustBadges from '../../components/amourshop/pairdz/TrustBadges';
import SizeChartModal from '../../components/amourshop/pairdz/SizeChartModal';
import OrderModal from '../../components/amourshop/pairdz/OrderModal_PairDZ';
import MobileStickyCTA from '../../components/amourshop/pairdz/MobileStickyCTA';

const PRICE_PER_UNIT = 2900;

export default function PairDZ() {
  const [sizeQuantities, setSizeQuantities] = useState({
    2: 0, 4: 0, 6: 1, 8: 0, 10: 0, 12: 0, 14: 0, 16: 0
  });

  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const totalQuantity = Object.values(sizeQuantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = totalQuantity * PRICE_PER_UNIT;

  let summaryParts = [];
  Object.keys(sizeQuantities).forEach((sizeKey) => {
    const size = parseInt(sizeKey, 10);
    const qty = sizeQuantities[size];
    if (qty > 0) {
      const label = size >= 12 ? "سنة" : "سنوات";
      summaryParts.push(`(مقاس ${size} ${label} x ${qty})`);
    }
  });
  const selectedSummary = summaryParts.length > 0
    ? summaryParts.join(' + ')
    : 'لم يتم اختيار أي مقاس';

  const updateSizeQty = (size, change) => {
    setSizeQuantities((prev) => {
      const current = prev[size] || 0;
      let next = current + change;
      if (next < 0) next = 0;
      if (next > 20) next = 20;
      return { ...prev, [size]: next };
    });
  };

  const handleOpenOrderModal = () => {
    if (totalQuantity === 0) {
      alert("يرجى اختيار مقاس واحد على الأقل قبل الطلب.");
      return;
    }
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = () => {
    setSizeQuantities({
      2: 0, 4: 0, 6: 1, 8: 0, 10: 0, 12: 0, 14: 0, 16: 0
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-cairo">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-12 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <ImageGallery />
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 text-right">
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>المنتج الأكثر طلباً في فئة الأطفال</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold lg:leading-tight text-slate-900 leading-none">
                طقم الأبطال الصغار 🇩🇿
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-none">
                قميص + شورت - جودة عالية
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between text-right">
              <div className="space-y-1">
                <span className="text-3xl font-black text-algeria-green flex items-baseline gap-1 [direction:ltr]">
                  <span className="text-sm font-bold text-slate-500 mr-1">د.ج</span>
                  <span>{totalPrice}</span>
                </span>
              </div>
            </div>
            <SizeSelector
              sizeQuantities={sizeQuantities}
              onUpdateQty={updateSizeQty}
              onOpenSizeChart={() => setIsSizeChartOpen(true)}
            />
            <button
              onClick={handleOpenOrderModal}
              className="w-full bg-algeria-green hover:bg-emerald-800 text-white py-5 rounded-3xl font-extrabold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-b-4 border-emerald-950 active:scale-[0.98] focus:outline-none"
            >
              <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
              <span>اطلب الآن - دفع عند الاستلام</span>
            </button>
            <TrustBadges />
          </div>
        </div>
      </main>
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        totalPrice={totalPrice}
        selectedSummary={selectedSummary}
        totalQuantity={totalQuantity}
        onOrderSuccess={handleOrderSuccess}
      />
      <MobileStickyCTA
        totalPrice={totalPrice}
        onOpenOrderModal={handleOpenOrderModal}
      />
    </div>
  );
}
