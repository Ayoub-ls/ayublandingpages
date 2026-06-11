import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Check, BadgeCheck, AlertTriangle } from 'lucide-react';
import './index.css';

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY; // ← paste your anon key
const SOURCE = "pair-dz-high";           // ← change per landing page

const submitToSupabase = async (orderData) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: orderData.name,
      phone: orderData.phone,
      city: orderData.city,
      size: orderData.size || null,
      quantity: orderData.quantity || 1,
      product_name: orderData.size || SOURCE,
      client_id: "amourshop",
      source: SOURCE,
      status: "pending",
      created_at: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ALGERIA_PHONE_PREFIXES = ["05", "06", "07"];

const ALGERIAN_WILAYAS = [
  { code: 1, ar: "01 - أدرار" },
  { code: 2, ar: "02 - الشلف" },
  { code: 3, ar: "03 - الأغواط" },
  { code: 4, ar: "04 - أم البواقي" },
  { code: 5, ar: "05 - باتنة" },
  { code: 6, ar: "06 - بجاية" },
  { code: 7, ar: "07 - بسكرة" },
  { code: 8, ar: "08 - بشار" },
  { code: 9, ar: "09 - البليدة" },
  { code: 10, ar: "10 - البويرة" },
  { code: 11, ar: "11 - تمنراست" },
  { code: 12, ar: "12 - تبسة" },
  { code: 13, ar: "13 - تلمسان" },
  { code: 14, ar: "14 - تيارت" },
  { code: 15, ar: "15 - تيزي وزو" },
  { code: 16, ar: "16 - الجزائر العاصمة" },
  { code: 17, ar: "17 - الجلفة" },
  { code: 18, ar: "18 - جيجل" },
  { code: 19, ar: "19 - سطيف" },
  { code: 20, ar: "20 - سعيدة" },
  { code: 21, ar: "21 - سكيكدة" },
  { code: 22, ar: "22 - سيدي بلعباس" },
  { code: 23, ar: "23 - عنابة" },
  { code: 24, ar: "24 - قالمة" },
  { code: 25, ar: "25 - قسنطينة" },
  { code: 26, ar: "26 - المدية" },
  { code: 27, ar: "27 - مستغانم" },
  { code: 28, ar: "28 - المسيلة" },
  { code: 29, ar: "29 - معسكر" },
  { code: 30, ar: "30 - ورقلة" },
  { code: 31, ar: "31 - وهران" },
  { code: 32, ar: "32 - البيض" },
  { code: 33, ar: "33 - إليزي" },
  { code: 34, ar: "34 - برج بوعريريج" },
  { code: 35, ar: "35 - بومرداس" },
  { code: 36, ar: "36 - الطارف" },
  { code: 37, ar: "37 - تندوف" },
  { code: 38, ar: "38 - تيسمسيلت" },
  { code: 39, ar: "39 - الوادي" },
  { code: 40, ar: "40 - خنشلة" },
  { code: 41, ar: "41 - سوق أهراس" },
  { code: 42, ar: "42 - تيبازة" },
  { code: 43, ar: "43 - ميلة" },
  { code: 44, ar: "44 - عين الدفلى" },
  { code: 45, ar: "45 - النعامة" },
  { code: 46, ar: "46 - عين تموشنت" },
  { code: 47, ar: "47 - غرداية" },
  { code: 48, ar: "48 - غليزان" },
  { code: 49, ar: "49 - المغير" },
  { code: 50, ar: "50 - المنيعة" },
  { code: 51, ar: "51 - أولاد جلال" },
  { code: 52, ar: "52 - برج باجي مختار" },
  { code: 53, ar: "53 - بني عباس" },
  { code: 54, ar: "54 - عين صالح" },
  { code: 55, ar: "55 - عين قزام" },
  { code: 56, ar: "56 - تقرت" },
  { code: 57, ar: "57 - جانت" },
  { code: 58, ar: "58 - المغير (المغير)" }
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function OrderModal({
  isOpen,
  onClose,
  totalPrice,
  selectedSummary,
  totalQuantity,
  onOrderSuccess
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('');

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmitData, setLastSubmitData] = useState(null);

  useEffect(() => {
    if (isOpen) setStatus('idle');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    // Validate Algerian phone
    let phonePrefFound = false;
    for (const pref of ALGERIA_PHONE_PREFIXES) {
      if (trimmedPhone.startsWith(pref) && trimmedPhone.length >= 9 && trimmedPhone.length <= 14) {
        phonePrefFound = true;
        break;
      }
    }
    if (!phonePrefFound) {
      alert("يرجى إدخال رقم هاتف جزائري صالح يبدأ بـ 05 أو 06 أو 07 متبوعاً بـ 8 أرقام.");
      return;
    }

    const orderData = {
      name: trimmedName,
      phone: trimmedPhone,
      city: wilaya,
      size: selectedSummary,
      quantity: totalQuantity,
    };

    setLastSubmitData(orderData);
    setStatus('loading');

    try {
      await submitToSupabase(orderData);
      setStatus('success');
    } catch (err) {
      console.error("Supabase error:", err);
      setErrorMessage("فشل الاتصال بقاعدة البيانات. الخطأ: " + err.message);
      setStatus('error');
    }
  };

  const handleRetrySubmit = async () => {
    if (!lastSubmitData) return;
    setStatus('loading');
    try {
      await submitToSupabase(lastSubmitData);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  const handleResetAndRestart = () => {
    setName('');
    setPhone('');
    setWilaya('');
    setStatus('idle');
    setLastSubmitData(null);
    onOrderSuccess();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 transition-all duration-300 min-h-[500px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-l from-algeria-green to-emerald-800 p-5 text-white flex justify-between items-center shrink-0">
          <div className="space-y-1">
            <h3 className="font-extrabold text-xl flex items-center gap-2">
              <span>تأكيد الطلب السريع 🇩🇿</span>
            </h3>
            <p className="text-xs text-white/80">يرجى ملأ الاستمارة بدقة لتجهيز طرودكم بالسرعة القصوى</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-slate-200 transition-all focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Form Area */}
        <div className="p-6 flex-1 flex flex-col justify-center relative">

          {/* Main Input Form */}
          {status === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {/* Selected Items Status Banner */}
              <div className="bg-emerald-50 border border-emerald-100 text-algeria-green p-3.5 rounded-2xl flex justify-between items-center text-sm">
                <div className="flex-1">
                  <span className="font-bold block text-xs text-emerald-700 mb-1">الطلبية:</span>
                  <span className="font-black text-sm leading-tight block">{selectedSummary}</span>
                </div>
                <div className="h-8 w-[1px] bg-emerald-200/55 mx-3"></div>
                <div className="text-left shrink-0">
                  <span className="font-bold block text-xs text-emerald-700 mb-1">الإجمالي:</span>
                  <span className="font-black text-amber-700 text-base">{totalPrice} د.ج</span>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700 text-sm">الأسم الكامل للـمستلم *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-4 focus:bg-white focus:ring-2 focus:ring-algeria-green focus:border-algeria-green outline-none transition-all font-semibold"
                    placeholder="أدخل اسمك الثلاثي الكامل"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block font-bold text-slate-700 text-sm">رقم الهاتف الجوال *</label>
                  <span className="text-[10px] text-amber-600 font-bold">سنتصل بك لتأكيد العنوان والشحن</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-4 focus:bg-white focus:ring-2 focus:ring-algeria-green focus:border-algeria-green outline-none transition-all font-mono font-bold tracking-wider text-left [direction:ltr]"
                    placeholder="05 / 06 / 07 XXXXXXXX"
                  />
                </div>
              </div>

              {/* Wilayas Select */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700 text-sm">الولاية (58 ولاية متوفرة) *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3 flex items-center text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <select
                    required
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pr-11 pl-4 focus:bg-white focus:ring-2 focus:ring-algeria-green focus:border-algeria-green outline-none transition-all font-bold appearance-none"
                  >
                    <option value="" disabled>-- اختر ولايتك من القائمة --</option>
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w.code} value={w.ar}>{w.ar}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full initiate bg-algeria-green hover:bg-emerald-800 text-white py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all border-b-2 border-emerald-950 active:scale-[0.99] focus:outline-none"
                >
                  <Check className="w-5 h-5" />
                  <span>تأكيد وشراء الطلب الآن</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-2xl font-bold transition-all text-sm focus:outline-none"
                >
                  إلغاء وتعديل المقاس
                </button>
              </div>
            </form>
          )}

          {/* Loading Screen Overlay */}
          {status === 'loading' && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="w-16 h-16 border-4 border-algeria-green border-t-transparent rounded-full animate-spin mb-4"></div>
              <h4 className="font-extrabold text-xl text-slate-900">جاري تسجيل طلبك...</h4>
              <p className="text-sm text-slate-500 mt-2">يرجى الانتظار لحين الاتصال بخوادم أمن البيانات وتخزين الطلبية</p>
            </div>
          )}

          {/* Success Screen Overlay */}
          {status === 'success' && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center z-10 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-algeria-green flex items-center justify-center mb-5 animate-bounce shadow-inner">
                <BadgeCheck className="w-12 h-12" />
              </div>
              <h4 className="font-black text-2xl text-slate-950">تم تسجيل طلبك بنجاح! 🇩🇿</h4>

              <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm max-w-sm">
                <p className="text-slate-600 font-bold leading-relaxed">
                  ✅ تم تسجيل طلبك! سنتصل بك قريباً
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  سيتصل بكم قسم تأكيد الطلبيات والشحن هاتفياً في غضون 24 ساعة لتجهيز شحنتكم.
                </p>
              </div>

              <button
                onClick={handleResetAndRestart}
                className="bg-algeria-green hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 focus:outline-none"
              >
                إغلاق والعودة للمتجر
              </button>
            </div>
          )}

          {/* Error Screen Overlay */}
          {status === 'error' && (
            <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="w-20 h-20 rounded-full bg-red-100 text-algeria-red flex items-center justify-center mb-5">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h4 className="font-extrabold text-xl text-slate-900">حدث خطأ أثناء التسجيل</h4>

              <p className="text-sm text-slate-500 max-w-sm mt-3 leading-relaxed">
                {errorMessage || "لم نتمكن من الوصول لراوبط المعايير المرجوة. يرجى مراجعة شبكة الإنترنت لديك أو إعادة المحاولة لاحقاً."}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleRetrySubmit}
                  className="flex-1 bg-algeria-green hover:bg-emerald-800 text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md active:scale-95 focus:outline-none"
                >
                  إعادة المحاولة
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-2xl transition-all active:scale-95 focus:outline-none"
                >
                  إلغاء وإنهاء الدورة
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
