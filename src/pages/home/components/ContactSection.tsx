import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

const CONTACT_FORM_URL = "https://readdy.ai/api/form/d7glk571fip3ogo5fnbg";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      await fetch(CONTACT_FORM_URL, {
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

  return (
    <section id="contact" className="bg-[#F5F2EC] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">Contact Us</h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-gray-500 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            We&apos;d love to hear from you. Reach out for ministry inquiries, subscriber support, or to connect with Dr. Haynes.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <FadeIn direction="left" delay={0.1}>
          <div>
            <div className="bg-[#0A0E2A] rounded-2xl p-8 mb-6">
              <h3 className="text-[#C9A84C] font-black text-xl mb-6 uppercase tracking-wider">Ministry Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl flex-shrink-0">
                    <i className="ri-global-line text-[#C9A84C] text-lg" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Website</p>
                    <a
                      href="https://hihsits.org"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-white font-semibold text-sm hover:text-[#C9A84C] transition-colors"
                    >
                      hihsits.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl flex-shrink-0">
                    <i className="ri-mail-line text-[#C9A84C] text-lg" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Email</p>
                    <a
                      href="mailto:dehaynesrol@gmail.com"
                      className="text-white font-semibold text-sm hover:text-[#C9A84C] transition-colors"
                    >
                      dehaynesrol@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl flex-shrink-0">
                    <i className="ri-youtube-line text-[#C9A84C] text-lg" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">YouTube Channel</p>
                    <p className="text-white font-semibold text-sm">Salvation in the Sanctuary</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-[#0A0E2A] font-black text-lg mb-2 uppercase tracking-wider">Social Media</h3>
              <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Subscribers receive all social media platform information upon joining.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "ri-facebook-fill", label: "Facebook", color: "#1877F2", href: "https://www.facebook.com/share/1JQUjKNFTC/?mibextid=wwXIfr" },
                  { icon: "ri-twitter-x-line", label: "Twitter / X", color: "#000000", href: "#" },
                  { icon: "ri-messenger-line", label: "Messenger", color: "#0084FF", href: "#" },
                  { icon: "ri-instagram-line", label: "Instagram", color: "#E1306C", href: "https://www.instagram.com/dehaynesrol?igsh=MWJlcjNiOTZzYjVyYQ==" },
                  { icon: "ri-youtube-fill", label: "YouTube", color: "#FF0000", href: "#" },
                  { icon: "ri-tiktok-line", label: "TikTok", color: "#010101", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel="nofollow noopener noreferrer"
                    className="flex items-center gap-3 bg-[#F5F2EC] rounded-xl px-4 py-3 cursor-pointer hover:bg-[#0A0E2A] group transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: `${social.color}20` }}>
                      <i className={`${social.icon} text-base`} style={{ color: social.color }} />
                    </div>
                    <span className="text-[#0A0E2A] group-hover:text-white text-sm font-semibold transition-colors">{social.label}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl p-4 text-center">
                <p className="text-[#C9A84C] text-xs font-semibold">
                  <i className="ri-lock-line mr-1" />
                  Full social media access provided to subscribers
                </p>
              </div>
            </div>
          </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn direction="right" delay={0.2}>
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-black text-[#0A0E2A] mb-2">Send a Message</h3>
            <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              For ministry inquiries, speaking engagements, or general questions.
            </p>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-green-600 text-3xl" />
                </div>
                <h4 className="text-xl font-black text-[#0A0E2A] mb-2">Message Sent!</h4>
                <p className="text-gray-500 text-sm">Thank you for reaching out. Dr. Haynes&apos; team will respond to you shortly.</p>
              </div>
            ) : (
              <form
                id="contact-form"
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
                      placeholder="Your name"
                      className="w-full bg-[#F5F2EC] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
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
                      className="w-full bg-[#F5F2EC] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">Subject *</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#F5F2EC] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                  >
                    <option value="">Select a subject</option>
                    <option value="Ministry Inquiry">Ministry Inquiry</option>
                    <option value="Speaking Engagement">Speaking Engagement</option>
                    <option value="Subscriber Support">Subscriber Support</option>
                    <option value="HTS Enrollment">HTS Enrollment</option>
                    <option value="P27 Research">P27 Research</option>
                    <option value="GSF Partnership">GSF Partnership</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0A0E2A] uppercase tracking-wider mb-1 block">
                    Message * ({charCount}/500)
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    placeholder="How can we help you?"
                    className="w-full bg-[#F5F2EC] border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#C9A84C] resize-none"
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
                  {submitting ? "Sending..." : "Send Message"}
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
