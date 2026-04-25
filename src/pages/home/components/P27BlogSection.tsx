import { useState } from "react";
import { p27BlogPosts } from "@/mocks/sitsData";
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

const P27_FORM_URL = "https://readdy.ai/api/form/d7lurv7u2vahpmebf0gg";

export default function P27BlogSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    background: "",
    institution: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "message") {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, v));
      await fetch(P27_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const postsAnim = useStaggerAnimation(3);

  return (
    <section id="p27-blog" className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Research &amp; Education</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">P27 Blog</h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-gray-500 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Exploring the Post-Doctoral Dissertation, Hagion Theological Seminary curriculum, and the academic pursuit of Gospel truth.
          </p>
        </FadeIn>

        {/* Blog Posts */}
        <div ref={postsAnim.ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {p27BlogPosts.map((post, i) => (
            <article key={post.id} className="rounded-2xl overflow-hidden bg-[#F5F2EC] group cursor-pointer" style={postsAnim.getItemStyle(i, 0.1)}>
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">P27 Research</span>
                  <span className="text-gray-400 text-xs">·</span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h3 className="text-[#0A0E2A] font-black text-lg mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{post.date}</span>
                  <button className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer whitespace-nowrap">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* P27 Info + Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <FadeIn direction="left" delay={0.1}>
            <div className="bg-[#0A0E2A] rounded-2xl p-8 text-white mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl mb-4">
                <i className="ri-file-text-line text-[#C9A84C] text-2xl" />
              </div>
              <h3 className="text-2xl font-black text-[#C9A84C] mb-4">About P27</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                P27 is Dr. Haynes&apos; Post-Doctoral Dissertation — a groundbreaking research study that explores the Gospel through the paradigm of the Hebrew Wilderness Tabernacle. This work is planned for publication as a theological textbook.
              </p>
              <p className="text-white/75 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                We are seeking participants with backgrounds in theology, ministry, or biblical studies to contribute to this landmark research. Participants gain exclusive access to dissertation materials and curriculum resources.
              </p>
            </div>

            <div className="bg-[#F5F2EC] rounded-2xl p-8">
              <h3 className="text-xl font-black text-[#0A0E2A] mb-4">Hagion Theological Seminary</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                HTS offers a self-paced online theological curriculum with 1, 2, and 3-year programs. Built on a Google Classroom platform, students can earn certificates, diplomas, and degrees from anywhere in the world.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {["Certificate", "Diploma", "Degree"].map((level) => (
                  <div key={level} className="bg-white rounded-xl p-3 text-center">
                    <i className="ri-award-line text-[#C9A84C] text-xl" />
                    <p className="text-xs font-bold text-[#0A0E2A] mt-1">{level}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Registration Form */}
          <FadeIn direction="right" delay={0.2}>
          <div className="bg-[#F5F2EC] rounded-2xl p-8">
            <h3 className="text-2xl font-black text-[#0A0E2A] mb-2">Register for P27 Research</h3>
            <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join the research study and gain access to exclusive theological materials.
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-green-600 text-3xl" />
                </div>
                <h4 className="text-xl font-black text-[#0A0E2A] mb-2">Registration Received!</h4>
                <p className="text-gray-500 text-sm">Thank you for your interest in P27. Dr. Haynes will be in touch with you shortly.</p>
              </div>
            ) : (
              <form
                id="p27-registration-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. John Smith"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Theological Background *</label>
                  <select
                    name="background"
                    required
                    value={formData.background}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                  >
                    <option value="">Select your background</option>
                    <option value="Pastor/Minister">Pastor / Minister</option>
                    <option value="Theology Student">Theology Student</option>
                    <option value="Biblical Scholar">Biblical Scholar</option>
                    <option value="Church Leader">Church Leader</option>
                    <option value="Layperson">Layperson / Believer</option>
                    <option value="Academic Researcher">Academic Researcher</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Institution / Organization</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="University, Church, Seminary..."
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">
                    Why do you want to participate? ({charCount}/500)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us about your interest in the P27 research study..."
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C] resize-none"
                  />
                  {charCount > 450 && (
                    <p className="text-xs text-red-500 mt-1">{500 - charCount} characters remaining</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting || charCount > 500}
                  className="bg-[#C9A84C] text-[#0A0E2A] font-bold py-3 rounded-lg hover:bg-[#e0bc5a] transition-colors text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Register for P27 Research"}
                </button>
              </form>
            )}
          </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
