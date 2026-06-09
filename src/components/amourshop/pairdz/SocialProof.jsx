import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Star, CheckCircle2, Volume2, VolumeX, Headphones } from 'lucide-react';
import audio1 from './image/1.mp4';
import audio2 from './image/2.mp4';
import audio3 from './image/3.mp4';
import './index.css';

const TESTIMONIALS = [
  {
    id: 1,
    audioSrc: audio3,
    avatarColor: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    avatarInitial: "أ"
  },
  {
    id: 2,
    audioSrc: audio1,
    avatarColor: "bg-red-50 text-algeria-red border border-red-100",
    avatarInitial: "ب"
  },
  {
    id: 3,
    audioSrc: audio2,
    avatarColor: "bg-red-50 text-algeria-red border border-red-100",
    avatarInitial: "ت"
  }
];

const BAR_HEIGHTS = [
  30, 45, 60, 50, 40, 55, 70, 85, 90, 75, 60, 50,
  40, 55, 65, 80, 95, 80, 65, 50, 40, 35, 25, 20
];

function AudioTestimonialCard({ testimonial, isActive, onPlay, onPause }) {
  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isActive && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPause();
    } else {
      onPlay(testimonial.id);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Playback failed:", err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    onPause();
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleWaveformClick = (e) => {
    if (!audioRef.current || duration === 0) return;
    const rect = waveformRef.current.getBoundingClientRect();
    // We are in RTL or LTR layout. Let's calculate based on RTL first, but we can do simple math:
    // width ratio = click relative position / total width
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // For RTL, the click position is inverted if progress flows from right to left
    // But commonly waveforms can be simple LTR progress, or standard RTL progress.
    // Let's support RTL: right side of container is 0, left is 100%
    const progressPercent = 1 - (clickX / width);
    const newTime = progressPercent * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 text-right">
      <audio
        ref={audioRef}
        src={testimonial.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        preload="metadata"
      />

      {/* Top section: User profile & stars */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0 ${testimonial.avatarColor}`}>
            {testimonial.avatarInitial}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md text-[9px] font-bold border border-emerald-100">
                <CheckCircle2 className="w-2.5 h-2.5 fill-current" />
                <span>زبون مؤكد</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      </div>

      {/* Quote / Transcript */}
      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
        {testimonial.comment}
      </p>

      {/* Custom Player Box */}
      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center gap-3 [direction:rtl]">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isPlaying
            ? 'bg-algeria-green text-white shadow-md shadow-emerald-900/10'
            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current translate-x-[1px]" />
          )}
        </button>

        {/* Interactive Waveform container */}
        <div
          ref={waveformRef}
          onClick={handleWaveformClick}
          className="flex-1 h-10 flex items-end justify-between px-1 cursor-pointer select-none [direction:rtl]"
        >
          {BAR_HEIGHTS.map((height, i) => {
            // Percent position of this bar (flowing from right to left in RTL)
            const barPercent = (i / BAR_HEIGHTS.length) * 100;
            const isPlayed = currentPercent >= barPercent;

            return (
              <span
                key={i}
                className={`w-[3px] rounded-t-full transition-all duration-150 ${isPlayed
                  ? 'bg-algeria-green'
                  : 'bg-slate-200 hover:bg-slate-300'
                  } ${isPlaying && isPlayed ? 'animate-wave-bar' : ''
                  }`}
                style={{
                  height: `${height}%`,
                  animationDelay: `${i * 0.04}s`,
                }}
              />
            );
          })}
        </div>

        {/* Timer & Mute */}
        <div className="flex items-center gap-2 shrink-0 [direction:ltr]">
          <span className="text-[10px] font-bold text-slate-500 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  const [activePlayerId, setActivePlayerId] = useState(null);

  const handlePlay = (id) => {
    setActivePlayerId(id);
  };

  const handlePause = () => {
    // We can keep the activePlayerId or clear it if needed.
  };

  return (
    <div className="space-y-4">
      {/* Style block for soundwave animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes soundWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.45); }
        }
        .animate-wave-bar {
          animation: soundWave 0.9s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}} />

      {/* Title block */}
      <div className="flex items-center justify-between text-right border-b border-slate-100 pb-3">
        <div className="space-y-0.5">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 justify-end">
            <span>آراء وتجارب بالصوت</span>
            <Headphones className="w-4 h-4 text-algeria-green animate-pulse" />
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">استمع لشهادات زبائننا الكرام</p>
        </div>
      </div>

      {/* Grid of testimonial cards */}
      <div className="grid grid-cols-1 gap-4">
        {TESTIMONIALS.map((testimonial) => (
          <AudioTestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={activePlayerId === testimonial.id}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        ))}
      </div>
    </div>
  );
}
