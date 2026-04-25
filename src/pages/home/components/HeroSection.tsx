import { useState, useEffect, useRef } from "react";
import { heroImages } from "@/mocks/sitsData";

interface HeroSectionProps {
  isMuted: boolean;
  onToggleMute: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function HeroSection({ isMuted, onToggleMute, audioRef }: HeroSectionProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImage(currentImage);
      setIsTransitioning(true);
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
      setTimeout(() => {
        setPrevImage(null);
        setIsTransitioning(false);
      }, 1200);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: idx === currentImage ? 1 : 0,
            zIndex: idx === currentImage ? 2 : 1,
          }}
        >
          <img
            src={img}
            alt={`Ministry slide ${idx + 1}`}
            className="w-full h-full object-cover object-top"
            style={{
              animation: idx === currentImage ? "kenBurns 10s ease-in-out infinite alternate" : "none",
            }}
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/ef4333b3-5c34-4393-ae46-fe8984ce2a6e_SITS_logo.jpg?v=427defaab434077b30e2e715a91b6431"
            alt="SITS Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full mx-auto"
            style={{ filter: "drop-shadow(0 0 20px rgba(201,168,76,0.6))" }}
          />
        </div>

        <p className="text-[#C9A84C] text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-3 italic">
          Welcome to
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-4 uppercase">
          Salvation in the
          <br />
          <span className="text-[#C9A84C]">Sanctuary</span>
        </h1>
        <p className="text-white/80 text-base md:text-xl italic font-light mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Dr. Dwight Eric Haynes — Senior Pastor &amp; Founder
        </p>
        <p className="text-white/60 text-sm md:text-base tracking-widest uppercase mb-10">
          H.I.M. — Hagion International Ministries
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => scrollTo("about")}
            className="bg-[#C9A84C] text-[#0A0E2A] font-bold px-8 py-3 rounded-full hover:bg-[#e0bc5a] transition-all duration-200 text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
          >
            Enter the Sanctuary
          </button>
          <button
            onClick={() => scrollTo("subscribers")}
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200 text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
          >
            Subscribe — $10/mo
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <i className="ri-arrow-down-line text-[#C9A84C] text-xl" />
        </div>

        {/* Image dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentImage ? "bg-[#C9A84C] w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Audio Player Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#0A0E2A]/90 backdrop-blur-sm border-t border-[#C9A84C]/30 px-4 md:px-8 h-10 flex items-center gap-4">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-music-2-line text-[#C9A84C] text-sm" />
        </div>
        <span className="text-white/70 text-xs tracking-wider flex-1">
          Christian Instrumental Worship — <span className="text-[#C9A84C]">Playing Now</span>
        </span>
        {/* Waveform animation */}
        <div className="hidden sm:flex items-end gap-0.5 h-5">
          {[3, 5, 4, 6, 3, 5, 4, 3, 6, 4, 5, 3].map((h, i) => (
            <div
              key={i}
              className="w-0.5 bg-[#C9A84C] rounded-full"
              style={{
                height: isMuted ? "2px" : `${h * 3}px`,
                animation: isMuted ? "none" : `wave ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
                transition: "height 0.3s",
              }}
            />
          ))}
        </div>
        <button
          onClick={onToggleMute}
          className="w-7 h-7 flex items-center justify-center text-[#C9A84C] hover:text-white transition-colors cursor-pointer"
        >
          <i className={`ri-${isMuted ? "volume-mute-line" : "volume-up-line"} text-base`} />
        </button>
      </div>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1) translate(0, 0); }
          to { transform: scale(1.08) translate(-1%, -1%); }
        }
        @keyframes wave {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
