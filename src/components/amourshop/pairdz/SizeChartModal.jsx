import React from 'react';
import { Ruler, X } from 'lucide-react';
import './index.css';

export default function SizeChartModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-algeria-green to-emerald-800 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            <h3 className="font-extrabold text-lg">جدول المقاسات والأعمار</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-slate-200 transition-all focus:outline-none">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-500 leading-relaxed">
            نوصي باختيار المقاس المعتاد لطفلك. إذا كان طفلك أطول قليلاً، يرجى اختيار مقاس واحد أكبر لراحة أفضل.
          </p>

          <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold">
                <tr>
                  <th className="px-4 py-3">المقاس الرقـمي</th>
                  <th className="px-4 py-3">العمر المقترح</th>
                  <th className="px-4 py-3">الطول التقريبي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">XS (2)</td>
                  <td className="px-4 py-3">1 - 2 سنوات</td>
                  <td className="px-4 py-3">86 - 92 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">S (4)</td>
                  <td className="px-4 py-3">3 - 4 سنوات</td>
                  <td className="px-4 py-3">98 - 104 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">M (6)</td>
                  <td className="px-4 py-3">5 - 6 سنوات</td>
                  <td className="px-4 py-3">110 - 116 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">L (8)</td>
                  <td className="px-4 py-3">7 - 8 سنوات</td>
                  <td className="px-4 py-3">122 - 128 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">XL (10)</td>
                  <td className="px-4 py-3">9 - 10 سنوات</td>
                  <td className="px-4 py-3">134 - 140 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">XXL (12)</td>
                  <td className="px-4 py-3">11 - 12 سنة</td>
                  <td className="px-4 py-3">146 - 152 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">3XL (14)</td>
                  <td className="px-4 py-3">13 - 14 سنة</td>
                  <td className="px-4 py-3">158 - 164 سم</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-bold text-algeria-green">4XL (16)</td>
                  <td className="px-4 py-3">15 - 16 سنة</td>
                  <td className="px-4 py-3">170 - 176 سم</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-extrabold transition-all focus:outline-none"
          >
            حـسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
}
