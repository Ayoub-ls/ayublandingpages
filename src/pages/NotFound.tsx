import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div id="notfound-container" dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 font-sans antialiased">
      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-rose-500/10 rounded-full text-rose-400">
          <AlertTriangle id="alert-icon" className="w-12 h-12" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-rose-500 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-white">الصفحة غير موجودة</h2>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-4" />

        <p className="text-slate-400 text-sm leading-relaxed leading-6">
          العنوان المرفق غير متوفر حالياً. يرجى التأكد من الرابط أو العودة إلى الصفحة الرئيسية للإبحار عبر صفحات الهبوط.
        </p>

        <a 
          id="back-home-btn"
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-100 text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md group mt-3 hover:text-white"
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}
