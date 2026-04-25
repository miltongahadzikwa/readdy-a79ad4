import { useState } from "react";
import { bookCovers } from "@/mocks/sitsData";
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

export default function BooksSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const gridAnim = useStaggerAnimation(5);

  const featuredBook = bookCovers.find((b) => b.id === 2);
  const allBooks = bookCovers;

  return (
    <section id="books" className="bg-[#FAFAF8] py-16 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Written Works</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">
            Books &amp; Publications
          </h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dr. Haynes is a prolific author whose writings bridge deep theological scholarship with practical, Spirit-filled ministry. Each book is a journey into the heart of the Gospel.
          </p>
        </FadeIn>

        {/* Featured Book Spotlight */}
        {featuredBook && (
          <FadeIn delay={0.1} className="mb-14">
            <div className="rounded-3xl overflow-hidden bg-[#0A0E2A] relative">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://readdy.ai/api/search-image?query=abstract%20gold%20light%20rays%20sanctuary%20tabernacle%20background%20texture%20elegant%20premium%20dark%20navy&width=1200&height=500&seq=bookbanner01&orientation=landscape"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Cover — large and prominent */}
                <div className="flex items-center justify-center p-10 lg:p-14">
                  <div className="relative" style={{ width: "280px" }}>
                    <div className="absolute -inset-6 bg-[#C9A84C]/20 rounded-3xl blur-3xl" />
                    <img
                      src={featuredBook.cover}
                      alt={featuredBook.title}
                      className="relative w-full rounded-2xl shadow-2xl object-cover object-top"
                      style={{ aspectRatio: "5/7", display: "block" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://readdy.ai/api/search-image?query=elegant%20gold%20sanctuary%20book%20cover%20theology%20biblical%20studies%20premium%20dark%20navy&width=400&height=560&seq=fallback002&orientation=portrait";
                      }}
                    />
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-col justify-center p-10 md:p-14 lg:pr-16">
                  <span className="inline-block bg-[#C9A84C] text-[#0A0E2A] text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest mb-6 w-fit">
                    Signature Work
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                    {featuredBook.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    The foundational work that launched the internationally recognized <strong className="text-[#C9A84C]">&ldquo;Salvation in the Sanctuary&rdquo;</strong> seminar revival series. Dr. Haynes masterfully unveils the Hebrew Wilderness Tabernacle as a complete typology of the Gospel of Jesus Christ.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: "ri-book-open-line", label: "Systematic Theology" },
                      { icon: "ri-global-line", label: "International Reach" },
                      { icon: "ri-award-line", label: "Ph.D. Level Research" },
                    ].map((badge) => (
                      <div key={badge.label} className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5">
                        <i className={`${badge.icon} text-[#C9A84C] text-sm`} />
                        <span className="text-white/80 text-xs font-semibold">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Complete Collection Grid */}
        <div className="mb-20">
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-10 bg-[#C9A84C] rounded-full" />
              <h3 className="text-2xl md:text-3xl font-black text-[#0A0E2A] uppercase tracking-tight">
                Complete Collection
              </h3>
            </div>
          </FadeIn>

          <div
            ref={gridAnim.ref}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
          >
            {allBooks.map((book, i) => (
              <div
                key={book.id}
                className="flex flex-col cursor-pointer group"
                style={gridAnim.getItemStyle(i, 0.1)}
                onMouseEnter={() => setHoveredId(book.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Book Cover */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden mb-4 bg-gray-100"
                  style={{ aspectRatio: "5/7" }}
                >
                  {/* Upcoming overlay */}
                  {!book.available && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0A0E2A]/85 rounded-2xl">
                      <div className="w-14 h-14 flex items-center justify-center bg-[#C9A84C]/20 rounded-full mb-3">
                        <i className="ri-time-line text-[#C9A84C] text-2xl" />
                      </div>
                      <span className="text-[#C9A84C] text-xs font-black uppercase tracking-widest text-center px-2">
                        Upcoming
                      </span>
                    </div>
                  )}

                  <img
                    src={book.cover}
                    alt={book.title}
                    className={`w-full h-full object-cover object-top transition-all duration-500 ${
                      hoveredId === book.id && book.available ? "scale-105" : "scale-100"
                    } ${!book.available ? "opacity-30" : ""}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://readdy.ai/api/search-image?query=elegant%20theology%20book%20cover%20dark%20navy%20gold%20cross%20biblical%20studies%20premium%20publication&width=400&height=560&seq=fallback00${book.id}&orientation=portrait`;
                    }}
                  />

                  {/* Hover gradient */}
                  {book.available && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0A0E2A]/60 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredId === book.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>

                {/* Book Info */}
                <div className="flex-1 flex flex-col">
                  {!book.available && (
                    <span className="inline-block bg-[#C9A84C]/15 text-[#C9A84C] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 w-fit">
                      Coming Soon
                    </span>
                  )}
                  <h4
                    className={`font-black text-sm md:text-base leading-snug mb-1.5 transition-colors duration-200 ${
                      book.available
                        ? "text-[#0A0E2A] group-hover:text-[#C9A84C]"
                        : "text-gray-400"
                    }`}
                  >
                    {book.title}
                  </h4>
                  <p
                    className="text-gray-500 text-xs leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {book.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.1}>
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-5 bg-white border border-[#E8E0D0] rounded-2xl px-10 py-8">
              <div className="w-14 h-14 flex items-center justify-center bg-[#C9A84C]/15 rounded-xl flex-shrink-0">
                <i className="ri-mail-line text-[#C9A84C] text-2xl" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[#0A0E2A] font-black text-lg">Interested in Dr. Haynes&apos; books?</p>
                <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact us directly to inquire about availability and ordering.
                </p>
              </div>
              <a
                href="mailto:dehaynesrol@gmail.com"
                className="whitespace-nowrap bg-[#0A0E2A] text-[#C9A84C] font-black text-sm px-8 py-3.5 rounded-lg hover:bg-[#C9A84C] hover:text-[#0A0E2A] transition-colors duration-200 cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
