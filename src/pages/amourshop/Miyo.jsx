import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Check,
  Phone,
  User,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Sun,
  Star,
  Anchor,
  Smile,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  Sparkles,
  Plus,
  Minus,
  CheckCircle2,
  ThumbsUp,
  Flame,
  Waves,
  Heart,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  Truck,
  RotateCcw,
  Lock,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { submitOrder } from "../../components/amourshop/maio/supabase.js";
import "../../components/amourshop/maio/index.css"

// Hero main image
import heroImg1 from "../../components/amourshop/maio/assets/mayo/g1.jpeg";
import heroImg2 from "../../components/amourshop/maio/assets/mayo/g2.jpeg";
import heroImg3 from "../../components/amourshop/maio/assets/mayo/g3.jpeg";
import heroImg4 from "../../components/amourshop/maio/assets/mayo/g4.jpeg";
import heroImg5 from "../../components/amourshop/maio/assets/mayo/i1.jpeg";

// Audio proofs
import audioProof1 from "../../components/amourshop/maio/assets/mayo/AUDIO-2026-05-20-12-26-35.m4a.mp4";
import audioProof2 from "../../components/amourshop/maio/assets/mayo/AUDIO-2026-05-20-12-38-11.m4a.mp4";
import audioProof3 from "../../components/amourshop/maio/assets/mayo/WhatsApp Audio 2026-06-03 at 14.42.22.mp4";

// Design card images
import designImg1 from "../../components/amourshop/maio/assets/mayo/i1.jpeg";
import designImg2 from "../../components/amourshop/maio/assets/mayo/i2.jpeg";
import designImg3 from "../../components/amourshop/maio/assets/mayo/i3.jpeg";
import designImg4 from "../../components/amourshop/maio/assets/mayo/i4.jpeg";
import designImg5 from "../../components/amourshop/maio/assets/mayo/i5.jpeg";
import designImg6 from "../../components/amourshop/maio/assets/mayo/i6.jpeg";
import designImg7 from "../../components/amourshop/maio/assets/mayo/i7.jpeg";
import designImg8 from "../../components/amourshop/maio/assets/mayo/i8.jpeg";
import designImg9 from "../../components/amourshop/maio/assets/mayo/i9.jpeg";
import designImg10 from "../../components/amourshop/maio/assets/mayo/i10.jpeg";
import designImg11 from "../../components/amourshop/maio/assets/mayo/i11.jpeg";
import designImg12 from "../../components/amourshop/maio/assets/mayo/i12.jpeg";
import designImg13 from "../../components/amourshop/maio/assets/mayo/i13.jpeg";
import designImg14 from "../../components/amourshop/maio/assets/mayo/i14.PNG";

// Price per unit
const PRICE_PER_UNIT = 2900; // 2,900 DA

// Design cards data
const DESIGNS = [
  { id: 1, name: "تصميم 1 - أزرق شروق الشمس", image: designImg11, bgColor: "bg-blue-50", icon: Sun, colorName: "أزرق شروق الشمس" },
  { id: 2, name: "تصميم 2 - وردي القلوب السعيدة", image: designImg14, bgColor: "bg-pink-50", icon: Heart, colorName: "وردي القلوب السعيدة" },
  { id: 3, name: "تصميم 3 - تركواز موج البحر", image: designImg2, bgColor: "bg-teal-50", icon: Waves, colorName: "تركواز موج البحر" },
  { id: 4, name: "تصميم 4 - أصفر شمس الصيف", image: designImg4, bgColor: "bg-amber-50", icon: Smile, colorName: "أصفر شمس الصيف" },
  { id: 5, name: "تصميم 5 - بنفسجي النجوم اللامعة", image: designImg5, bgColor: "bg-purple-50", icon: Star, colorName: "بنفسجي النجوم اللامعة" },
  { id: 6, name: "تصميم 6 - كحلي مرساة البحر", image: designImg6, bgColor: "bg-blue-100", icon: Anchor, colorName: "كحلي مرساة البحر" },
  { id: 7, name: "تصميم 7 - أخضر لؤلؤي مميز", image: designImg7, bgColor: "bg-teal-100", icon: Sparkles, colorName: "أخضر لؤلؤي مميز" },
  { id: 8, name: "تصميم 8 - أزرق ثلجي رياضي", image: designImg8, bgColor: "bg-sky-50", icon: Flame, colorName: "أزرق ثلجي رياضي" },
  { id: 9, name: "تصميم 9 - فوشيا وردة الصيف", image: designImg9, bgColor: "bg-rose-50", icon: Heart, colorName: "فوشيا وردة الصيف" },
  { id: 10, name: "تصميم 10 - رمادي رياضي كلاسيكي", image: designImg10, bgColor: "bg-slate-100", icon: Star, colorName: "رمادي رياضي كلاسيكي" },
  { id: 11, name: "تصميم 11 - أحمر خارق", image: designImg1, bgColor: "bg-red-50", icon: ShieldCheck, colorName: "أحمر خارق" },
  { id: 12, name: "تصميم 12 - ذهبي ملكي", image: designImg12, bgColor: "bg-yellow-50", icon: Sparkles, colorName: "ذهبي ملكي" },
  { id: 13, name: "تصميم 13 - قطبي أزرق", image: designImg13, bgColor: "bg-sky-100", icon: Sparkles, colorName: "قطبي أزرق" },
  { id: 14, name: "تصميم 14 - فراشة ناعمة", image: designImg3, bgColor: "bg-pink-100", icon: Heart, colorName: "فراشة ناعمة" }
];

// 58 Algerian Wilayas
const WILAYAS = [
  { id: "01", name: "01 - أدرار" },
  { id: "02", name: "02 - الشلف" },
  { id: "03", name: "03 - الأغواط" },
  { id: "04", name: "04 - أم البواقي" },
  { id: "05", name: "05 - باتنة" },
  { id: "06", name: "06 - بجاية" },
  { id: "07", name: "07 - بسكرة" },
  { id: "08", name: "08 - بشار" },
  { id: "09", name: "09 - البليدة" },
  { id: "10", name: "10 - البويرة" },
  { id: "11", name: "11 - تمنراست" },
  { id: "12", name: "12 - تبسة" },
  { id: "13", name: "13 - تلمسان" },
  { id: "14", name: "14 - تيارت" },
  { id: "15", name: "15 - تيزي وزو" },
  { id: "16", name: "16 - الجزائر" },
  { id: "17", name: "17 - الجلفة" },
  { id: "18", name: "18 - جيجل" },
  { id: "19", name: "19 - سطيف" },
  { id: "20", name: "20 - سعيدة" },
  { id: "21", name: "21 - سكيكدة" },
  { id: "22", name: "22 - سيدي بلعباس" },
  { id: "23", name: "23 - عنابة" },
  { id: "24", name: "24 - قالمة" },
  { id: "25", name: "25 - قسنطينة" },
  { id: "26", name: "26 - المدية" },
  { id: "27", name: "27 - مستغانم" },
  { id: "28", name: "28 - المسيلة" },
  { id: "29", name: "29 - معسكر" },
  { id: "30", name: "30 - ورقلة" },
  { id: "31", name: "31 - وهران" },
  { id: "32", name: "32 - البيض" },
  { id: "33", name: "33 - إليزي" },
  { id: "34", name: "34 - برج بوعريريج" },
  { id: "35", name: "35 - بومرداس" },
  { id: "36", name: "36 - الطارف" },
  { id: "37", name: "37 - تندوف" },
  { id: "38", name: "38 - تيسمسيلت" },
  { id: "39", name: "39 - الوادي" },
  { id: "40", name: "40 - خنشلة" },
  { id: "41", name: "41 - سوق أهراس" },
  { id: "42", name: "42 - تيبازة" },
  { id: "43", name: "43 - ميلة" },
  { id: "44", name: "44 - عين الدفلى" },
  { id: "45", name: "45 - النعامة" },
  { id: "46", name: "46 - عين تموشنت" },
  { id: "47", name: "47 - غرداية" },
  { id: "48", name: "48 - غليزان" },
  { id: "49", name: "49 - المغير" },
  { id: "50", name: "50 - المنيعة" },
  { id: "51", name: "51 - أولاد جلال" },
  { id: "52", name: "52 - برج باجي مختار" },
  { id: "53", name: "53 - بني عباس" },
  { id: "54", name: "54 - تيميمون" },
  { id: "55", name: "55 - تقرت" },
  { id: "56", name: "56 - جانت" },
  { id: "57", name: "57 - عين صالح" },
  { id: "58", name: "58 - عين قزام" }
];

const AVAILABLE_SIZES = [
  "2 سنوات",
  "4 سنوات",
  "6 سنوات",
  "8 سنوات",
  "10 سنوات",
  "12 سنة",
  "14 سنة",
  "16 سنة"
];

// Live reviews mock data to display real social proofs
const REVIEWS = [
  { name: "", location: "", date: "", text: "جودة القماش ممتازة والتقفيل روعة، بنتي فرحت بيه بزاف، المقاس جاني سوا سوا. شكراً ليكم التوصيل كان سريع جداً.", rating: 5 },
  { name: "", location: "", date: "", text: "صراحة المايو هايل وخفيف وينشف بسرعة، والألوان حية كيما في التصاور. يعجبني بزاف أنه محتشم ومريح في نفس الوقت.", rating: 5 },
  { name: "", location: "", date: "", text: "بنتي عمرها 8 سنوات والمقاس 8 جاها ممتاز. القماش نتاعو واقف وميتشربش الما بزاف. ننصح بيه كل الأمهات.", rating: 5 }
];

// WhatsApp Voice Note Component for Audio Social Proofs
function WhatsAppVoiceNote({ id, src, duration, playingAudioId, setPlayingAudioId }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && audio.duration !== Infinity) {
        setTotalDuration(audio.duration);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Sync external playing audio id
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playingAudioId !== id && isPlaying) {
      audio.pause();
    }
  }, [playingAudioId, id, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      setPlayingAudioId(id);
      audio.play().catch(e => console.log("Playback failed", e));
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-emerald-50/75 rounded-2xl p-3 md:p-4 border border-emerald-100/60 flex items-center gap-3 w-full shadow-xs text-right" dir="rtl">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Voice bubble play icon */}
      <button
        type="button"
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs active:scale-95 transition-all"
      >
        {isPlaying ? (
          <span className="flex gap-0.5 justify-center items-center">
            <span className="w-1 h-3.5 bg-white block rounded-full animate-pulse"></span>
            <span className="w-1 h-3.5 bg-white block rounded-full animate-pulse"></span>
          </span>
        ) : (
          <ChevronLeft className="w-5 h-5 fill-white translate-x-px" dir="ltr" />
        )}
      </button>

      {/* WhatsApp Voice Message Style */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] font-bold text-emerald-650 bg-emerald-100/60 px-2 py-0.5 rounded-md">رسالة صوتية 🎙️</span>
        </div>

        {/* Audio Waveform mock & Timing */}
        <div className="flex items-center gap-2">
          {/* Waveform representation */}
          <div className="flex-1 flex items-center gap-0.5 h-6">
            {[3, 5, 2, 7, 4, 6, 3, 5, 8, 4, 3, 6, 2, 5, 4, 7, 3, 5, 2, 6, 4].map((height, i) => {
              const progress = (currentTime / (totalDuration || 12)) * 100;
              const barPos = (i / 21) * 100;
              const isPlayed = progress > barPos;

              return (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-150`}
                  style={{
                    height: `${height * 10}%`,
                    backgroundColor: isPlayed ? "#10b981" : "#d1d5db"
                  }}
                />
              );
            })}
          </div>

          <span className="text-[10px] font-bold text-slate-500 font-mono select-none">
            {isPlaying ? formatTime(currentTime) : (duration || "0:12")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  // Page states
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // { [size]: qty }
  const [formData, setFormData] = useState({ name: "", phone: "", city: "" });
  const [showAllDesigns, setShowAllDesigns] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedOrderDetails, setSubmittedOrderDetails] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  const [stickyVisible, setStickyVisible] = useState(true);

  const selectionSectionRef = useRef(null);
  const sizeSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  // Intersection observer to hide sticky bottom CTA when checkout form is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide sticky button when checkout form is visible in viewport
        setStickyVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => {
      if (formSectionRef.current) {
        observer.unobserve(formSectionRef.current);
      }
    };
  }, []);

  // Phone validation
  const validatePhone = (phoneStr) => {
    const isMatched = /^(05|06|07)\d{8}$/.test(phoneStr);
    if (!phoneStr) {
      return "رقم الهاتف مطلوب لتأكيد طلبك";
    }
    if (!isMatched) {
      return "يجب أن يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام";
    }
    return "";
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\s+/g, "");
    setFormData(prev => ({ ...prev, phone: val }));
    setPhoneError(validatePhone(val));
  };

  // Scroll to helper
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Auto scroll to size selector after design selection
  useEffect(() => {
    if (selectedDesigns.length > 0) {
      const timer = setTimeout(() => {
        scrollTo(sizeSectionRef);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedDesigns]);

  // Auto scroll to form after size selection
  const hasSelectedSizes = Object.keys(selectedSizes).length > 0;
  useEffect(() => {
    if (hasSelectedSizes) {
      const timer = setTimeout(() => {
        scrollTo(formSectionRef);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [hasSelectedSizes]);

  const selectDesign = (design) => {
    setSelectedDesigns(prev => {
      const isAlreadySelected = prev.some(d => d.id === design.id);
      if (isAlreadySelected) {
        return prev.filter(d => d.id !== design.id);
      } else {
        // limit to 1 design to avoid decision paralysis, or let them toggle
        return [design];
      }
    });
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => {
      const copy = { ...prev };
      if (copy[size]) {
        delete copy[size];
      } else {
        copy[size] = 1;
      }
      return copy;
    });
  };

  const adjustQty = (size, delta) => {
    setSelectedSizes(prev => {
      const copy = { ...prev };
      if (!copy[size]) return prev;
      const newVal = copy[size] + delta;
      if (newVal < 1) {
        delete copy[size];
      } else {
        copy[size] = newVal;
      }
      return copy;
    });
  };

  const totalQuantity = Object.values(selectedSizes).reduce((acc, curr) => acc + curr, 0);
  const totalPrice = totalQuantity * PRICE_PER_UNIT;

  const sizeSummary = Object.entries(selectedSizes)
    .map(([size, qty]) => `(مقاس ${size} عدد ${qty})`)
    .join(" + ");

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const pErr = validatePhone(formData.phone);
    if (pErr) {
      setPhoneError(pErr);
      scrollTo(formSectionRef);
      return;
    }

    if (selectedDesigns.length === 0) {
      alert("الرجاء اختيار تصميم واحد على الأقل أولاً");
      scrollTo(selectionSectionRef);
      return;
    }

    if (totalQuantity === 0) {
      alert("الرجاء تحديد المقاس المطلوب أولاً");
      scrollTo(sizeSectionRef);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const orderData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      design: `${selectedDesigns.map(d => d.colorName).join(" / ")} | المقاسات: ${sizeSummary}`,
      totalQuantity
    };

    try {
      await submitOrder(orderData);
      setSubmittedOrderDetails(orderData);
      setStatus("success");
      // GTM dataLayer push
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'purchase',
        value: totalPrice,
        currency: 'DZD',
        quantity: totalQuantity
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "فشل تسجيل طلبك. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.");
      setStatus("error");
    }
  };

  // Filter designs: top 3 first, rest hidden behind accordion
  const topDesigns = DESIGNS.slice(0, 3);
  const otherDesigns = DESIGNS.slice(3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans overflow-x-hidden antialiased selection:bg-pink-500/10 selection:text-pink-600" dir="rtl">

      {/* Top Banner Alert */}
      <div className="bg-pink-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 animate-pulse text-yellow-350" />
        <span>عرض خاص بمناسبة موسم الصيف: توصيل سريع ودفع عند الاستلام في 58 ولاية! 🏝️</span>
      </div>

      {/* Header */}
      <header className="border-b border-pink-100 px-4 md:px-8 py-3.5 flex justify-between items-center bg-white/90 sticky top-0 z-45 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-pink-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-pink-100">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-pink-600 leading-none">Amourshop</span>
            <span className="text-[10px] text-pink-500 font-bold tracking-widest mt-0.5">PREMIUM KIDS</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            متوفر حالياً
          </span>
          <span className="px-3 py-1 bg-pink-50 rounded-full text-pink-700 font-extrabold text-xs hidden sm:inline-block">
            2,900 د.ج / قطعة
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 md:py-8 space-y-8 pb-24">

        {/* HERO SECTION */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-pink-100 shadow-sm overflow-hidden relative">

          {/* Subtle Pink Glow Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50/40 rounded-full blur-3xl -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">

            {/* Right Column: Copy & Value Proposition (7 cols on desktop) */}
            <div className="md:col-span-7 space-y-5">

              {/* Trust Badge above title */}
              <div className="flex items-center gap-1.5 bg-pink-50 text-pink-600 text-xs font-extrabold px-3 py-1.5 rounded-full w-fit border border-pink-100">
                <Award className="w-3.5 h-3.5" />
                <span>مايو البرينة الأصلي للأطفال - جودة ممتازة مضمونة ⭐⭐⭐⭐⭐</span>
              </div>

              {/* Hook / Headline */}
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-snug">
                امنحي طفلتك الأناقة والراحة المطلقة مع <span className="text-pink-600 relative inline-block">مايو البرينة الأكثر طلباً في الجزائر! 🏖️</span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                تصميم تركي مريح ومحتشم مصنوع خصيصاً لحماية بشرة طفلتك الحساسة من أشعة الشمس الصيفية. قماش فاخر مطاطي، مضاد للماء وسريع الجفاف ليضمن لها يوم بحر سعيد وبدون مضايقات.
              </p>

              {/* Pricing Callout */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-xs text-slate-400 font-bold line-through">السعر القديم: 3,800 د.ج</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-black text-pink-600">2,900</span>
                    <span className="text-sm font-extrabold text-pink-600">د.ج فقط</span>
                  </div>
                </div>
                <span className="bg-emerald-500 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs animate-bounce">
                  وفرتِ 900 د.ج اليوم! 🏷️
                </span>
              </div>

              {/* Quick Benefits Bullet Points */}
              <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm font-bold text-slate-700">
                <li className="flex items-center gap-2 bg-pink-50/40 p-2 rounded-xl border border-pink-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>قماش تركي ليكرا مميز</span>
                </li>
                <li className="flex items-center gap-2 bg-pink-50/40 p-2 rounded-xl border border-pink-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>حماية 100% من الشمس</span>
                </li>
                <li className="flex items-center gap-2 bg-pink-50/40 p-2 rounded-xl border border-pink-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>يجف بسرعة فائقة</span>
                </li>
                <li className="flex items-center gap-2 bg-pink-50/40 p-2 rounded-xl border border-pink-50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>مطاطي ومريح للعب</span>
                </li>
              </ul>

              {/* Hero CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => scrollTo(selectionSectionRef)}
                  className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all text-base transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>تصفح الألوان واطلب الآن 👇</span>
                </button>
              </div>

            </div>

            {/* Left Column: Hero Single High-Quality Image (5 cols on desktop) */}
            <div className="md:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-pink-100 shadow-lg bg-pink-50/30">

                {/* Single best image shown */}
                <img
                  src={heroImg4}
                  alt="مايو برينة أطفال ممتاز"
                  className="w-full aspect-[4/5] object-cover"
                  loading="eager"
                />

                {/* Best Seller Badge overlay */}
                <span className="absolute top-3 right-3 bg-pink-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-white text-white" />
                  الأكثر مبيعاً
                </span>

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <p className="text-xs font-bold text-pink-200">الراحة والأناقة في منتج واحد</p>
                  <p className="text-sm font-black mt-0.5">طقم متكامل (سروال + قميص بأكمام طويلة + حجاب سباحة متناسق)</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SOCIAL PROOF / STATS BAR */}
        <section className="bg-white rounded-3xl p-5 md:p-6 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-pink-50 pb-3">
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-extrabold text-lg shadow-xs">
              🔊
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black text-slate-900">استمعي لآراء ومكالمات زبوناتنا الحقيقية عبر الواتساب:</h3>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium">اضغطي على زر التشغيل الأخضر للاستماع للتسجيل الصوتي ⬇️</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WhatsAppVoiceNote
              id={1}
              src={audioProof1}
              name="أم أيمن"
              location="الجزائر العاصمة"
              duration="0:09"
              playingAudioId={playingAudioId}
              setPlayingAudioId={setPlayingAudioId}
            />
            <WhatsAppVoiceNote
              id={2}
              src={audioProof2}
              name="أم ساجد"
              location="وهران"
              duration="0:16"
              playingAudioId={playingAudioId}
              setPlayingAudioId={setPlayingAudioId}
            />
            <WhatsAppVoiceNote
              id={3}
              src={audioProof3}
              name="أم يوسف"
              location="سطيف"
              duration="0:12"
              playingAudioId={playingAudioId}
              setPlayingAudioId={setPlayingAudioId}
            />
          </div>
        </section>

        {/* STEP 1: DESIGNS GRID WITH TOP 3 AND SHOW MORE */}
        <section id="selection-section" ref={selectionSectionRef} className="scroll-mt-24 bg-white rounded-3xl p-5 md:p-8 border border-pink-100 shadow-sm space-y-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-pink-50 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-black font-mono">1</span>
                اختر التصميم المناسب لطفلتك:
              </h2>
              <p className="text-xs text-slate-500 mt-1 mr-9 font-medium">الرجاء اختيار أحد التصاميم الرائعة لتحديد مقاسك.</p>
            </div>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full w-fit mr-9 md:mr-0">
              متوفر حالياً 14 لوناً وتصميماً حصرياً
            </span>
          </div>

          {/* Core Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {topDesigns.map((design) => {
              const isSelected = selectedDesigns.some(d => d.id === design.id);

              return (
                <div
                  key={design.id}
                  onClick={() => selectDesign(design)}
                  className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col group overflow-hidden ${isSelected
                    ? "border-pink-600 ring-4 ring-pink-500/10 bg-pink-50/10 scale-[1.02]"
                    : "border-slate-100 hover:border-pink-200 bg-white hover:shadow-md"
                    }`}
                >
                  {/* Image container */}
                  <div className="aspect-square w-full relative overflow-hidden bg-slate-50">
                    <img
                      src={design.image}
                      alt={design.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

                    {/* Design name Tag */}
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] md:text-xs font-black text-pink-700 px-2.5 py-1 rounded-lg shadow-sm border border-pink-50">
                      {design.colorName}
                    </div>

                    {/* Checkmark overlay */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 bg-pink-600 text-white rounded-full p-1.5 shadow-md border border-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    {/* Best Seller ribbon on top design */}
                    {design.id === 2 && (
                      <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">
                        الأكثر طلباً 🔥
                      </span>
                    )}
                  </div>

                  {/* Card Label */}
                  <div className="p-3 text-center bg-white border-t border-slate-100 flex-1 flex flex-col justify-center">
                    <span className={`block font-black text-xs md:text-sm transition-colors ${isSelected ? "text-pink-600" : "text-slate-800"}`}>
                      {design.name.split(" - ")[0]}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">جاهز للتوصيل السريع</span>
                  </div>
                </div>
              );
            })}

            {/* Render Other Designs inside AnimatePresence (expanded state) */}
            <AnimatePresence>
              {showAllDesigns && otherDesigns.map((design) => {
                const isSelected = selectedDesigns.some(d => d.id === design.id);

                return (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => selectDesign(design)}
                    className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col group overflow-hidden ${isSelected
                      ? "border-pink-600 ring-4 ring-pink-500/10 bg-pink-50/10 scale-[1.02]"
                      : "border-slate-100 hover:border-pink-200 bg-white hover:shadow-md"
                      }`}
                  >
                    <div className="aspect-square w-full relative overflow-hidden bg-slate-50">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        draggable={false}
                        loading="lazy"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-[10px] md:text-xs font-black text-pink-700 px-2.5 py-1 rounded-lg shadow-sm border border-pink-50">
                        {design.colorName}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 bg-pink-600 text-white rounded-full p-1.5 shadow-md border border-white">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="p-3 text-center bg-white border-t border-slate-100 flex-1 flex flex-col justify-center">
                      <span className={`block font-black text-xs md:text-sm transition-colors ${isSelected ? "text-pink-600" : "text-slate-800"}`}>
                        {design.name.split(" - ")[0]}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">جاهز للتوصيل السريع</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Show More/Less Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllDesigns(!showAllDesigns)}
              className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-extrabold px-6 py-3.5 rounded-2xl flex items-center gap-2 border border-pink-100 transition-all text-xs md:text-sm cursor-pointer shadow-xs"
            >
              <span>{showAllDesigns ? "عرض خيارات أقل ⬆️" : "عرض باقي الألوان والتصاميم المتاحة (+11 تصميم إضافي) ⬇️"}</span>
            </button>
          </div>
        </section>

        {/* STEP 2: SIZE SELECTOR */}
        <section id="size-section" ref={sizeSectionRef} className="scroll-mt-24 bg-white rounded-3xl p-5 md:p-8 border border-pink-100 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-pink-50 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-black font-mono">2</span>
                اختر المقاسات المطلوبة:
              </h2>
              <p className="text-xs text-slate-500 mt-1 mr-9 font-medium">يمكنك اختيار مقاس واحد أو أكثر لأطفالك في نفس الطلبية.</p>
            </div>
            <span className="text-xs font-bold text-pink-600 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full w-fit mr-9 md:mr-0">
              المقاسات متوافقة مع الأعمار القياسية للأطفال
            </span>
          </div>

          {/* Design Selection Summary Banner if chosen */}
          {selectedDesigns.length > 0 && (
            <div className="bg-pink-50/50 text-pink-600 text-xs md:text-sm font-bold p-3.5 rounded-2xl border border-pink-100/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-pink-200">
                  <img src={selectedDesigns[0].image} alt="" className="w-full h-full object-cover" />
                </div>
                <span>لقد اخترتِ: <strong>{selectedDesigns[0].colorName}</strong></span>
              </div>
              <button
                onClick={() => {
                  setSelectedDesigns([]);
                  scrollTo(selectionSectionRef);
                }}
                className="text-pink-500 hover:text-pink-700 text-xs font-black cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-pink-100 shadow-xs"
              >
                تغيير
              </button>
            </div>
          )}

          {/* Sizes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {AVAILABLE_SIZES.map((size) => {
              const isSelected = !!selectedSizes[size];
              return (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`py-3.5 px-3 rounded-2xl text-center font-extrabold text-xs md:text-sm shadow-xs border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${isSelected
                    ? "bg-pink-600 text-white border-pink-600 font-black shadow-md shadow-pink-100 scale-[1.01]"
                    : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-pink-200"
                    }`}
                >
                  <span className="block font-black">{size}</span>
                  <span className={`block text-[9px] ${isSelected ? "text-pink-100" : "text-slate-400"}`}>
                    (مقاس {size.replace(" سنوات", "").replace(" سنة", "")})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quantity Controls for selected sizes */}
          {hasSelectedSizes ? (
            <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-500 mb-1.5">عدلي كميات المقاسات المختارة:</span>
              {Object.entries(selectedSizes).map(([size, qty]) => (
                <div key={size} className="bg-white p-3.5 rounded-xl border border-slate-100 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                    <span className="text-xs md:text-sm font-black text-slate-800">مقاس {size}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => adjustQty(size, -1)}
                      className="w-8 h-8 bg-slate-150 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center font-bold text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-black text-base w-6 text-center text-slate-800">{qty}</span>
                    <button
                      type="button"
                      onClick={() => adjustQty(size, 1)}
                      className="w-8 h-8 bg-pink-100 text-pink-600 hover:bg-pink-200 rounded-lg flex items-center justify-center font-bold text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-pink-50/30 rounded-2xl border border-pink-100/50 p-4 text-center">
              <p className="text-xs md:text-sm text-pink-600 font-bold">الرجاء الضغط على المقاس (المقاسات) المناسبة لطفلتك أعلاه للتفعيل 🌸</p>
            </div>
          )}
        </section>


        {/* STEP 3: ORDER FORM */}
        <section id="form-section" ref={formSectionRef} className="scroll-mt-24 bg-white rounded-3xl p-5 md:p-8 border border-pink-100 shadow-md space-y-6 relative overflow-hidden">

          {/* Header decoration */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-pink-500 via-pink-600 to-teal-400"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-pink-50 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-black font-mono">3</span>
                أدخلي معلومات التوصيل لتأكيد الطلب:
              </h2>
              <p className="text-xs text-slate-500 mt-1 mr-9 font-medium">يرجى ملء الاستمارة البسيطة لتأكيد طلبيتك وسنتصل بكِ هاتفياً.</p>
            </div>
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-fit mr-9 md:mr-0">
              🔒 طلب آمن ومحمي 100%
            </span>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-5">

            {/* Input Name */}
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                <User className="w-4 h-4 text-pink-500" />
                <span>الاسم واللقب الكامل *</span>
              </label>
              <input
                id="name-input"
                required
                type="text"
                placeholder="أدخلي اسمكِ الكامل هنا"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800 shadow-xs"
              />
            </div>

            {/* Input Phone */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="phone-input" className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                  <Phone className="w-4 h-4 text-pink-500" />
                  <span>رقم الهاتف النشط للاتصال وتأكيد الطلبية *</span>
                </label>
                {phoneError && (
                  <span className="text-[10px] text-rose-500 font-extrabold flex items-center gap-1 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {phoneError}
                  </span>
                )}
              </div>
              <input
                id="phone-input"
                required
                type="tel"
                placeholder="مثال: 05 XX XX XX XX / 06 / 07"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full px-4.5 py-3 rounded-2xl border bg-white text-sm focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-right shadow-xs ${phoneError ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-pink-500"
                  }`}
              />
            </div>

            {/* Input Wilaya */}
            <div className="space-y-1.5">
              <label htmlFor="city-input" className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>الولاية (يرجى تحديد ولايتكِ) *</span>
              </label>
              <select
                id="city-input"
                required
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4.5 py-3 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all font-bold text-slate-800 shadow-xs cursor-pointer"
              >
                <option value="" disabled>-- اختر الولاية من القائمة --</option>
                {WILAYAS.map((w) => (
                  <option key={w.id} value={w.name}>{w.name}</option>
                ))}
              </select>
            </div>

            {/* Calculated Order Summary widget */}
            <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100 space-y-3.5">
              <h4 className="text-xs font-black text-pink-600 tracking-wider">ملخص طلبيتكِ الحالية:</h4>

              <div className="space-y-2 text-xs md:text-sm font-bold text-slate-700">
                <div className="flex justify-between items-center">
                  <span>المايو المختار:</span>
                  <span className="text-slate-900">
                    {selectedDesigns.length > 0 ? selectedDesigns[0].colorName : "لم تختاري تصميماً بعد ❌"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>المقاسات والكمية:</span>
                  <span className="text-slate-900">
                    {totalQuantity > 0 ? `${totalQuantity} قطعة ${sizeSummary}` : "لم تحددي مقاساً بعد ❌"}
                  </span>
                </div>
                <div className="h-px bg-pink-100/50 my-1"></div>
                <div className="flex justify-between items-center">
                  <span>طريقة الدفع:</span>
                  <span className="text-emerald-600 font-extrabold">الدفع عند الاستلام (COD) 🤝</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>التوصيل:</span>
                  <span className="text-slate-500">سريع لكل الولايات (حسب الولاية)</span>
                </div>
                <div className="h-px bg-pink-100/50 my-1"></div>
                <div className="flex justify-between items-end">
                  <span className="text-slate-800 font-extrabold text-sm">السعر الإجمالي لطلبك:</span>
                  <div className="flex flex-col text-left">
                    {totalQuantity > 0 && (
                      <span className="text-slate-400 text-xs font-bold line-through">{(totalPrice * 1.3).toLocaleString()} د.ج</span>
                    )}
                    <span className="text-2xl font-black text-pink-600">{totalPrice.toLocaleString()} د.ج</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="submit-order-button"
                  type="submit"
                  disabled={selectedDesigns.length === 0 || totalQuantity === 0 || !formData.name || !formData.phone || !formData.city || !!phoneError}
                  className={`w-full font-black py-4.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg transition-all text-base cursor-pointer transform hover:-translate-y-0.5 ${(selectedDesigns.length === 0 || totalQuantity === 0 || !formData.name || !formData.phone || !formData.city || !!phoneError)
                    ? "bg-slate-200 text-slate-450 border border-slate-300 cursor-not-allowed shadow-none"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 active:scale-[0.98]"
                    }`}
                >
                  <Lock className="w-5 h-5 shrink-0" />
                  <span>تأكيد الطلب - الدفع عند الاستلام 🛡️</span>
                </button>
              </div>
            </div>

          </form>
        </section>

        {/* TRUST BADGES GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-white p-4.5 rounded-2xl border border-pink-150 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-650 flex items-center justify-center text-2xl shrink-0 font-extrabold shadow-sm">
              💵
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900">الدفع عند الاستلام (COD)</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                لن تدفعي سنتيماً واحداً حتى تستلمي المايو بين يديك وتفحصي القماش والجودة بنفسك!
              </p>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-pink-150 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-650 flex items-center justify-center text-2xl shrink-0 font-extrabold shadow-sm">
              🚚
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900">توصيل سريع لباب البيت</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                نقوم بشحن طلبيتك سريعاً مع موزعينا لكل ولايات الجزائر لتصلك مباشرة إلى باب بيتك أو مكتبك.
              </p>
            </div>
          </div>

        </section>

        {/* FEEDBACK REVIEWS LIST */}
        <section className="bg-white rounded-3xl p-5 md:p-8 border border-pink-100 shadow-sm space-y-6">
          <div className="border-b border-pink-50 pb-4">
            <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-pink-600" />
              أمهات جزائريات يشاركن آرائهن عن مايو البرينة للأطفال:
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">الآراء حقيقية 100% لزبائننا الأوفياء.</p>
          </div>

          <div className="space-y-4">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-black text-xs md:text-sm text-slate-800">{review.name}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{review.location} • {review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-pink-100 py-6 px-4 text-center space-y-2.5 text-xs text-slate-400 font-medium font-sans">
        <div className="flex justify-center items-center gap-1 text-pink-600 font-extrabold text-sm">
          <span>Amourshop</span>
          <span>•</span>
          <span className="text-slate-500 font-bold">ملابس أطفال فاخرة</span>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          نحن في Amourshop نضمن جودة المنتج ورضا زبائننا بنسبة 100%. الدفع دائماً عند الاستلام بعد معاينة وفحص طلبيتكِ.
        </p>
        <div className="h-px bg-slate-100 max-w-xs mx-auto my-2"></div>
        <p className="text-[10px] text-slate-400">جميع الحقوق محفوظة © 2026 | Amourshop Algeria</p>
      </footer>

      {/* STICKY BOTTOM MOBILE CTA */}
      <AnimatePresence>
        {stickyVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-pink-100 px-4 py-3.5 flex items-center justify-between z-40 shadow-2xl md:max-w-lg md:mx-auto md:rounded-t-3xl"
          >
            {/* Left: Price and summary */}
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-slate-400 font-bold leading-none">مايو برينة أطفال</span>
              <span className="text-lg font-black text-pink-600 mt-1 leading-none">
                {totalQuantity > 0 ? totalPrice.toLocaleString() : "2,900"} <span className="text-xs font-bold">د.ج</span>
              </span>
              <span className="text-[9px] text-emerald-600 font-extrabold mt-1">الدفع عند الاستلام 🤝</span>
            </div>

            {/* Right: Pulsing CTA Button */}
            <button
              onClick={() => {
                if (selectedDesigns.length === 0) {
                  scrollTo(selectionSectionRef);
                } else if (!hasSelectedSizes) {
                  scrollTo(sizeSectionRef);
                } else {
                  scrollTo(formSectionRef);
                }
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25 transition-all text-xs md:text-sm cursor-pointer animate-pulse active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>اطلب الآن - معاينة قبل الدفع 🚚</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP OVERLAYS / FEEDBACK MODALS */}

      {/* 1. Loading State */}
      {status === "loading" && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-slate-100"
          >
            <RefreshCw className="w-10 h-10 text-pink-600 animate-spin mx-auto mb-3.5" />
            <h4 className="text-md font-black text-slate-900">جاري تسجيل طلبيتكِ...</h4>
            <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-medium">
              الرجاء الانتظار لحظة واحدة للاتصال الآمن بخادمنا لإرسال معلومات التوصيل.
            </p>
          </motion.div>
        </div>
      )}

      {/* 2. Success Modal */}
      {status === "success" && submittedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 md:p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-slate-100 relative"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4.5 shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h4 className="text-xl font-black text-slate-900 mb-2">الحمد لله، طلبكِ مسجل بنجاح! 🎉</h4>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-medium">
              شكراً لثقتكِ في <strong className="text-pink-600">Amourshop</strong>. لقد تلقينا طلبيتكِ وسيتصل بكِ وكيل خدمة العملاء هاتفياً خلال الساعات القادمة لتأكيد المقاسات وتأمين الإرسال السريع!
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl text-right text-xs text-slate-700 space-y-2 border border-slate-150 mb-6 font-bold">
              <p className="flex justify-between">
                <span className="text-slate-400">الاسم واللقب:</span>
                <span className="text-slate-800">{submittedOrderDetails.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-400">رقم الهاتف:</span>
                <span className="text-slate-800">{submittedOrderDetails.phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-400">ولاية التوصيل:</span>
                <span className="text-slate-800">{submittedOrderDetails.city}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-400">المايو واللون:</span>
                <span className="text-slate-800">{selectedDesigns.length > 0 ? selectedDesigns[0].colorName : ""}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-400">المقاسات والكمية:</span>
                <span className="text-slate-800">{submittedOrderDetails.totalQuantity} قطع {sizeSummary}</span>
              </p>
              <div className="h-px bg-slate-200 my-1"></div>
              <p className="pt-1.5 font-black flex justify-between text-sm">
                <span>السعر الإجمالي للدفع عند الاستلام:</span>
                <span className="text-pink-650 font-black">{totalPrice.toLocaleString()} د.ج</span>
              </p>
            </div>

            <button
              onClick={() => {
                setStatus("idle");
                setSelectedDesigns([]);
                setSelectedSizes({});
                setFormData({ name: "", phone: "", city: "" });
              }}
              className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-pink-100 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              مفهوم، إغلاق لتصفح باقي المنتجات
            </button>
          </motion.div>
        </div>
      )}

      {/* 3. Error Modal */}
      {status === "error" && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-slate-100"
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3.5">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h4 className="text-md font-black text-slate-900 mb-1.5">فشل تسجيل الطلبية ❌</h4>
            <p className="text-slate-500 text-xs mb-4.5 leading-relaxed font-medium">{errorMessage}</p>

            <div className="flex gap-2">
              <button
                onClick={() => setStatus("idle")}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                تعديل الاستمارة
              </button>
              <button
                onClick={(e) => handleOrderSubmit(e)}
                className="flex-1 py-3 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition-all cursor-pointer"
              >
                إعادة المحاولة
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
