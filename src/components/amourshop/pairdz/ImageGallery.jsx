import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './index.css';
import img1 from "./image/img1.jpeg"
import img2 from "./image/img2.jpeg"
import img3 from "./image/img3.PNG"
import img4 from "./image/img4.PNG"

const IMAGES = [
  img1,
  img2,
  img3,
  img4,
];

export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="lg:col-span-7 space-y-4">
      {/* Main Image Container */}
      <div
        className="relative bg-white border border-slate-100 rounded-3xl overflow-hidden aspect-square custom-shadow transition-all duration-300 group"
      >
        {/* Discount Label */}
        <div
          className="absolute top-4 right-4 z-10 bg-algeria-red text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1"
        >
          <span>تخفيض 25%</span>
        </div>

        {/* Star badges */}
        <div
          className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-algeria-gold text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 border border-slate-100"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>جودة ممتازة</span>
        </div>

        <img
          src={IMAGES[activeIndex]}
          alt="طقم الجزائر الصغير"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 gap-3">
        {IMAGES.map((src, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative bg-white rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none transition-all duration-200 ${isActive
                ? "border-2 border-algeria-green shadow-sm"
                : "border border-slate-200 hover:border-slate-300"
                }`}
            >
              <img
                src={src}
                alt={`طقم الجزائر - عرض ${index === 0 ? "flat" : "نشاط"}`}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
