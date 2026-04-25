import { useState } from "react";
import { mediaItems, bookCovers, bibleStudies, cdBibleSeries } from "@/mocks/sitsData";
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

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const mediaAnim = useStaggerAnimation(6);
  const booksAnim = useStaggerAnimation(5);

  return (
    <section id="youtube-channel" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Audio &amp; Video Ministry</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">YouTube Channel</h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-gray-500 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sermons, teachings, devotions, radio talks, and the full 52-part Sanctuary Video Series — all by Dr. Dwight Eric Haynes.
          </p>
        </FadeIn>

        {/* GSF Link Banner */}
        <FadeIn delay={0.05}>
        <div className="bg-[#F5F2EC] rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-[#0A0E2A] rounded-xl flex-shrink-0">
            <i className="ri-shield-star-line text-[#C9A84C] text-2xl" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-black text-[#0A0E2A] text-lg">God&apos;s Special Forces (GSF)</h4>
            <p className="text-gray-500 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              A church growth system implemented through the participation of church members — mobilizing the body of Christ.
            </p>
          </div>
          <a
            href="https://hihsits.org"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="bg-[#C9A84C] text-[#0A0E2A] font-bold px-6 py-2.5 rounded-full hover:bg-[#e0bc5a] transition-colors text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
          >
            Visit GSF →
          </a>
        </div>
        </FadeIn>

        {/* Media Grid */}
        <div ref={mediaAnim.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mediaItems.map((item, i) => (
            <div key={item.id} className="rounded-2xl overflow-hidden bg-[#F5F2EC] group" style={mediaAnim.getItemStyle(i, 0.1)}>
              <div className="relative w-full h-48 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(item.id)}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#C9A84C] rounded-full">
                    <i className="ri-play-fill text-[#0A0E2A] text-2xl" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-[#C9A84C] text-[#0A0E2A] text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-black text-[#0A0E2A] text-base leading-tight mb-3">{item.title}</h4>
                <button
                  onClick={() => setActiveVideo(item.id)}
                  className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-youtube-line text-base" />
                  Watch on YouTube
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-[#0A0E2A] rounded-2xl overflow-hidden w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h4 className="text-white font-bold text-sm">
                  {mediaItems.find((m) => m.id === activeVideo)?.title}
                </h4>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white cursor-pointer"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-youtube-line text-[#C9A84C] text-6xl mb-4" />
                  <p className="text-white/60 text-sm">YouTube video would play here</p>
                  <p className="text-white/40 text-xs mt-1">Connect your YouTube channel to embed videos</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Covers */}
        <FadeIn delay={0.05}>
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-[#C9A84C] rounded-full" />
            <h3 className="text-2xl font-black text-[#0A0E2A] uppercase tracking-tight">Published Books</h3>
          </div>
          <div ref={booksAnim.ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {bookCovers.map((book, i) => (
              <div key={book.id} className="group cursor-pointer" style={booksAnim.getItemStyle(i, 0.08)}>
                <div className="w-full h-56 rounded-xl overflow-hidden mb-3">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
                  />
                </div>
                <p className="text-[#0A0E2A] font-bold text-xs text-center leading-tight">{book.title}</p>
                <p className="text-gray-400 text-xs text-center mt-0.5">{book.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>

        {/* Bible Studies */}
        <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bible Studies */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-[#C9A84C] rounded-full" />
              <h3 className="text-xl font-black text-[#0A0E2A] uppercase tracking-tight">Bible Studies &amp; Evangelism</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bibleStudies.map((study, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-[#F5F2EC] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#0A0E2A] group transition-colors"
                >
                  <span className="text-[#C9A84C] text-xs font-black w-5 flex-shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-[#0A0E2A] group-hover:text-white text-xs font-semibold leading-tight transition-colors">{study}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CD Bible Series */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-8 bg-[#C9A84C] rounded-full" />
              <h3 className="text-xl font-black text-[#0A0E2A] uppercase tracking-tight">CD Bible Study Series</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cdBibleSeries.map((series, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-[#F5F2EC] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#0A0E2A] group transition-colors"
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-disc-line text-[#C9A84C] text-sm" />
                  </div>
                  <span className="text-[#0A0E2A] group-hover:text-white text-xs font-semibold leading-tight transition-colors">{series}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
