import { useState } from "react";
import { sanctuaryBlogPosts, SanctuaryPost } from "@/mocks/sitsData";
import SanctuaryGallery from "./SanctuaryGallery";
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

function ArticleModal({ post, onClose }: { post: SanctuaryPost; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-64 overflow-hidden rounded-t-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover object-top" />
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#C9A84C] text-[#0A0E2A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.series}
            </span>
            <span className="text-gray-400 text-xs">{post.readTime}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#0A0E2A] mb-2 leading-tight">{post.title}</h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider">
              <i className="ri-book-open-line mr-1" />{post.scripture}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-xs">{post.date}</span>
          </div>
          <div className="space-y-5">
            {post.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-gray-700 text-base leading-relaxed"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {para}
              </p>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            <p className="text-gray-400 text-xs">— Dr. Dwight Eric Haynes</p>
            <button
              onClick={onClose}
              className="bg-[#0A0E2A] text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider hover:bg-[#1a2040] transition-colors cursor-pointer whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SanctuaryBlogSection() {
  const [selectedPost, setSelectedPost] = useState<SanctuaryPost | null>(null);

  const featured = sanctuaryBlogPosts[0];
  const rest = sanctuaryBlogPosts.slice(1);
  const postsAnim = useStaggerAnimation(3);

  return (
    <section id="sanctuary-blog" className="bg-[#F5F2EC] py-16 px-4 md:px-8">
      {selectedPost && <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Gospel Unveiled</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">Sanctuary Blog</h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-gray-500 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            An ongoing conversation on understanding the Gospel by way of the Hebrew Wilderness Tabernacle — where ancient types meet eternal truth.
          </p>
        </FadeIn>

        {/* Sanctuary Graphics Gallery */}
        <SanctuaryGallery />

        {/* Featured Post — Part 1.2 */}
        <FadeIn delay={0.1}>
        <div className="bg-white rounded-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="w-full h-[400px] lg:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-[#C9A84C] text-[#0A0E2A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Latest
                </span>
                <span className="text-gray-400 text-xs">{featured.series}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#0A0E2A] mb-4 leading-tight">
                {featured.title}
              </h3>

              {/* Scripture reference */}
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-book-open-line text-[#C9A84C] text-sm" />
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider">{featured.scripture}</span>
              </div>

              {/* Full article paragraphs */}
              <div className="space-y-4 mb-6">
                {featured.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-400 text-xs">{featured.date}</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400 text-xs">{featured.readTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPost(featured)}
                  className="bg-[#0A0E2A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1a2040] transition-colors text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
                >
                  Read Full Article
                </button>
                <span className="text-gray-400 text-xs">— Dr. Dwight Eric Haynes</span>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>

        {/* Other Posts */}
        <div ref={postsAnim.ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rest.map((post, i) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer"
              style={postsAnim.getItemStyle(i, 0.1)}
              onClick={() => setSelectedPost(post)}
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-book-open-line text-[#C9A84C] text-xs" />
                  <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">{post.scripture}</span>
                </div>
                <h3 className="text-[#0A0E2A] font-black text-lg mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{post.date}</span>
                  <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider group-hover:underline whitespace-nowrap">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Tabernacle Journey Banner */}
        <FadeIn delay={0.1}>
        <div className="bg-[#0A0E2A] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img
              src="https://readdy.ai/api/search-image?query=Hebrew%20tabernacle%20wilderness%20Israel%20ancient%20sacred%20tent%20sanctuary%20gold%20pattern%20abstract%20background&width=1200&height=400&seq=tabernacle_bg&orientation=landscape"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">The Journey Through the Tabernacle</p>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
              From the Outer Court<br />
              <span className="text-[#C9A84C]">to the Holy of Holies</span>
            </h3>
            <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Every element of the Hebrew Wilderness Tabernacle points to Jesus Christ. Join Dr. Haynes on this transformative journey through the types and shadows of the Old Testament, discovering the fullness of the Gospel hidden in plain sight.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["The Brazen Altar", "The Laver", "The Lampstand", "The Table of Shewbread", "The Altar of Incense", "The Ark of the Covenant"].map((item) => (
                <span key={item} className="bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold px-4 py-2 rounded-full border border-[#C9A84C]/30">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
