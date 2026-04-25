import { useState, useRef, useEffect } from "react";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const translateMap = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0,0)" : translateMap[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface AudioTrack {
  id: number;
  title: string;
  series: string;
  part: string;
  date: string;
  duration: string;
  cover: string;
  label: string;
  src: string;
  description: string;
}

const audioTracks: AudioTrack[] = [
  {
    id: 1,
    title: "First Service of Pastor Haynes",
    series: "Salvation in the Sanctuary",
    part: "Series Premiere",
    date: "March 30, 2013",
    duration: "Loading...",
    cover: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/48a7e0ed-923a-414c-a5f4-cc91631e815c_Audio-Cover-copy.jpg?v=606536f905993118faaf5d86e8e2283b",
    label: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/e48eb0bc-5240-4b26-b5b9-e4749a45e88a_Audio-Label_sample-copy.jpg?v=24516f2274438f8c730790d03dc77790",
    src: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/00de3d9b-fac2-45e3-8887-258da894886e_30-3-2013---First-service-of-Pastor-Haynes.mp3?v=f7b2004cb724245c07b8c024668f8b6b",
    description: "The inaugural sermon of Dr. Dwight Eric Haynes — a landmark message that launched the Salvation in the Sanctuary ministry. Experience the anointed teaching that began this transformative journey through the Hebrew Wilderness Tabernacle.",
  },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VinylDisc({ label, isPlaying }: { label: string; isPlaying: boolean }) {
  return (
    <div
      className="relative w-full h-full rounded-full overflow-hidden"
      style={{
        animation: isPlaying ? "spin 4s linear infinite" : "none",
      }}
    >
      {/* Vinyl grooves */}
      <div className="absolute inset-0 rounded-full bg-[#111] border-4 border-[#1a1a1a]" />
      {[0.85, 0.75, 0.65, 0.55, 0.45].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#2a2a2a]"
          style={{
            inset: `${(1 - scale) * 50}%`,
          }}
        />
      ))}
      {/* Label image in center */}
      <div
        className="absolute rounded-full overflow-hidden border-2 border-[#333]"
        style={{ inset: "25%" }}
      >
        <img src={label} alt="Disc Label" className="w-full h-full object-cover" />
      </div>
      {/* Center hole */}
      <div className="absolute w-3 h-3 rounded-full bg-[#0A0E2A] border border-[#333]" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function AudioPlayer({ track }: { track: AudioTrack }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVinyl, setShowVinyl] = useState(false);

  useEffect(() => {
    const audio = new Audio(track.src);
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("ended", () => { setIsPlaying(false); setShowVinyl(false); });
    audio.addEventListener("waiting", () => setIsLoading(true));
    audio.addEventListener("canplay", () => setIsLoading(false));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [track.src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setShowVinyl(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
      setShowVinyl(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (secs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + secs));
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full">
      {/* Main Player Card */}
      <div className="bg-[#0A0E2A] rounded-3xl overflow-hidden relative">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.4) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row">
          {/* Left — Cover Art + Vinyl */}
          <div className="relative w-full lg:w-80 flex-shrink-0">
            {/* Cover image */}
            <div className="w-full h-72 lg:h-full min-h-[280px] relative overflow-hidden">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover object-top"
                style={{
                  filter: isPlaying ? "brightness(0.5)" : "brightness(0.85)",
                  transition: "filter 0.6s ease",
                }}
              />
              {/* Vinyl overlay when playing */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{ opacity: showVinyl ? 1 : 0 }}
              >
                <div className="w-48 h-48">
                  <VinylDisc label={track.label} isPlaying={isPlaying} />
                </div>
              </div>
              {/* Series badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#C9A84C] text-[#0A0E2A] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {track.part}
                </span>
              </div>
            </div>
          </div>

          {/* Right — Player Controls */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            {/* Track Info */}
            <div className="mb-6">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase mb-2">
                {track.series}
              </p>
              <h3
                className="text-white font-black text-2xl md:text-3xl leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {track.title}
              </h3>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                Dr. Dwight Eric Haynes · {track.date}
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                {track.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div
                ref={progressRef}
                className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-[#C9A84C] rounded-full relative transition-all duration-100"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#C9A84C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-white/40 text-xs">{formatTime(currentTime)}</span>
                <span className="text-white/40 text-xs">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              {/* Skip + Play */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => skip(-15)}
                  className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Back 15s"
                >
                  <i className="ri-replay-15-line text-xl" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 flex items-center justify-center bg-[#C9A84C] rounded-full hover:bg-[#e0bc5a] transition-all cursor-pointer relative"
                  style={{
                    boxShadow: isPlaying ? "0 0 24px rgba(201,168,76,0.6)" : "none",
                    transition: "box-shadow 0.4s ease, background 0.2s ease",
                  }}
                >
                  {isLoading ? (
                    <i className="ri-loader-4-line text-[#0A0E2A] text-xl animate-spin" />
                  ) : (
                    <i className={`ri-${isPlaying ? "pause" : "play"}-fill text-[#0A0E2A] text-2xl ${isPlaying ? "" : "ml-0.5"}`} />
                  )}
                </button>

                <button
                  onClick={() => skip(15)}
                  className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Forward 15s"
                >
                  <i className="ri-forward-15-line text-xl" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  <i className={`ri-${isMuted ? "volume-mute-line" : volume < 0.5 ? "volume-down-line" : "volume-up-line"} text-base`} />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-20 accent-[#C9A84C] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spin keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function AudioSeriesSection() {
  const [selectedTrack] = useState<AudioTrack>(audioTracks[0]);
  const statsAnim = useStaggerAnimation(3);

  return (
    <section id="audio-series" className="bg-[#06091a] py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20dark%20texture%20pattern%20subtle%20geometric%20lines%20deep%20navy%20background%20minimal%20elegant&width=1920&height=1080&seq=audio_bg_01&orientation=landscape"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Listen & Be Transformed</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Audio Series
          </h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-white/50 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Powerful teachings by Dr. Dwight Eric Haynes — available to stream and download. Each message is a deep dive into the Word of God through the lens of the Hebrew Wilderness Tabernacle.
          </p>
        </FadeIn>

        {/* Bible Study Cover + Player Layout */}
        <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Bible Study Cover — left */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="relative group rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/59931d85-26e9-448b-9ab6-1e5d95adc361_BibleStudy-copy.jpg?v=ac9ce01275cd88f860ca9b0acf23c132"
                alt="Bible Study Series Cover"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="bg-[#C9A84C] text-[#0A0E2A] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Bible Study Series
                </span>
                <p className="text-white font-black text-lg mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Salvation in the Sanctuary
                </p>
                <p className="text-white/60 text-xs mt-1">Dr. Dwight Eric Haynes</p>
              </div>
            </div>

            {/* Coming Soon tracks */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-4">More Coming Soon</p>
              <div className="space-y-3">
                {[
                  "Part 1.1 — The Way, The Truth, The Life",
                  "Part 1.2 — The Way Is in the Sanctuary",
                  "Part 2.1 — The Brazen Altar",
                  "Part 2.2 — The Laver of Washing",
                  "Part 3.1 — The Golden Lampstand",
                ].map((title, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-full flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                      <i className="ri-lock-line text-white/30 text-xs group-hover:text-[#C9A84C] transition-colors" />
                    </div>
                    <span className="text-white/40 text-xs group-hover:text-white/60 transition-colors">{title}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/30 text-xs text-center">Subscribe to unlock all audio teachings</p>
              </div>
            </div>
          </div>

          {/* Audio Player — right */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AudioPlayer track={selectedTrack} />

            {/* Audio Label Display */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C9A84C]/30">
                <img
                  src="https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/e48eb0bc-5240-4b26-b5b9-e4749a45e88a_Audio-Label_sample-copy.jpg?v=24516f2274438f8c730790d03dc77790"
                  alt="Audio Label"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-1">Official Audio Recording</p>
                <p className="text-white font-black text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Salvation in the Sanctuary Series
                </p>
                <p className="text-white/50 text-sm mt-1">H.I.M. — Hagion International Ministries</p>
                <p className="text-white/30 text-xs mt-2">© 2013 Dr. Dwight Eric Haynes · All Rights Reserved</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/10 rounded-full border border-[#C9A84C]/30">
                  <i className="ri-headphone-line text-[#C9A84C] text-lg" />
                </div>
                <span className="text-white/30 text-xs">HD Audio</span>
              </div>
            </div>

            {/* Stats row */}
            <div ref={statsAnim.ref} className="grid grid-cols-3 gap-4">
              {[
                { icon: "ri-mic-line", label: "Series", value: "Salvation in the Sanctuary" },
                { icon: "ri-calendar-line", label: "Recorded", value: "March 30, 2013" },
                { icon: "ri-award-line", label: "Speaker", value: "Dr. Dwight Eric Haynes" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center" style={statsAnim.getItemStyle(i, 0.2)}>
                  <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                    <i className={`${stat.icon} text-[#C9A84C] text-lg`} />
                  </div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-white text-xs font-bold leading-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>

        {/* CTA Banner */}
        <FadeIn delay={0.1}>
        <div className="bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-[#C9A84C]/20 rounded-2xl p-8 border border-[#C9A84C]/30 text-center">
          <i className="ri-headphone-line text-[#C9A84C] text-3xl mb-4 block" />
          <h3 className="text-white font-black text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            More Audio Teachings Coming Soon
          </h3>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Subscribe to the Salvation in the Sanctuary ministry to receive instant access to the full audio library as new teachings are released — including the complete Sanctuary Series, Bible Studies, and special messages.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("subscribers");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#C9A84C] text-[#0A0E2A] font-black px-8 py-3 rounded-full hover:bg-[#e0bc5a] transition-colors text-sm uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            Subscribe for Full Access — $10/mo
          </button>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
