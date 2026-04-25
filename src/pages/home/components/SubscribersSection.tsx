import { useState } from "react";
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

export default function SubscribersSection() {
  const benefitsAnim = useStaggerAnimation(10);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ fullname: "", email: "", password: "" });
  const [loginMsg, setLoginMsg] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginMsg(null);
    if (!loginData.email || !loginData.password) {
      setLoginError("Please enter your email and password.");
      return;
    }
    setLoginMsg("Login functionality will be available once the subscriber system is fully activated. Please contact info@hihsits.org for access.");
  };

  const handlePayPalSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.fullname || !signupData.email || !signupData.password) {
      return;
    }
    // PayPal subscription link — replace with your actual PayPal subscription button link
    const paypalUrl = "https://www.paypal.com/subscribe?hosted_button_id=SITS_SUBSCRIPTION";
    window.open(paypalUrl, "_blank", "noopener,noreferrer");
  };

  const benefits = [
    { icon: "ri-user-star-line", text: "Personal access to Dr. Dwight Eric Haynes" },
    { icon: "ri-video-line", text: "Full 52-part Sanctuary Video Series" },
    { icon: "ri-book-open-line", text: "All Bible studies & evangelism materials" },
    { icon: "ri-disc-line", text: "Complete CD Bible study series library" },
    { icon: "ri-mic-line", text: "Exclusive sermons, radio talks & lectures" },
    { icon: "ri-sun-line", text: "Daily devotions & Morning Manna" },
    { icon: "ri-music-2-line", text: "SG International Choir recordings" },
    { icon: "ri-share-line", text: "All social media platform information" },
    { icon: "ri-graduation-cap-line", text: "HTS theological curriculum access" },
    { icon: "ri-file-text-line", text: "P27 dissertation & research materials" },
  ];

  return (
    <section id="subscribers" className="bg-[#0A0E2A] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Exclusive Access</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            YouTube <span className="text-[#C9A84C]">Subscribers</span>
          </h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
          <p className="text-white/60 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join the SITS subscriber community for just $10 USD per month and gain unlimited access to all ministry materials, personal access to Dr. Haynes, and exclusive content.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <FadeIn direction="left" delay={0.1}>
          <div>
            {/* Price Card */}
            <div className="bg-[#C9A84C] rounded-2xl p-8 mb-8 text-center">
              <p className="text-[#0A0E2A] text-xs font-bold uppercase tracking-widest mb-2">Subscriber Plan</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="text-[#0A0E2A] text-5xl font-black">$10</span>
                <span className="text-[#0A0E2A]/70 text-lg font-semibold mb-2">USD / month</span>
              </div>
              <p className="text-[#0A0E2A]/70 text-sm">Cancel anytime · Instant access · Secure payment</p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <i className="ri-shield-check-line text-[#0A0E2A]/60 text-base" />
                <span className="text-[#0A0E2A]/60 text-xs font-semibold">Powered by PayPal — 256-bit SSL encryption</span>
              </div>
            </div>

            {/* Benefits List */}
            <div ref={benefitsAnim.ref} className="space-y-3">
              <h3 className="text-white font-black text-lg mb-4 uppercase tracking-wider">What&apos;s Included:</h3>
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 rounded-xl px-4 py-3" style={benefitsAnim.getItemStyle(idx, 0.15)}>
                  <div className="w-8 h-8 flex items-center justify-center bg-[#C9A84C]/20 rounded-lg flex-shrink-0">
                    <i className={`${b.icon} text-[#C9A84C] text-base`} />
                  </div>
                  <span className="text-white/80 text-sm">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
          </FadeIn>

          {/* Login / Signup Panel */}
          <FadeIn direction="right" delay={0.2}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* Tabs */}
            <div className="flex bg-white/10 rounded-full p-1 mb-8">
              <button
                onClick={() => { setActiveTab("signup"); setLoginMsg(null); setLoginError(null); }}
                className={`flex-1 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "signup" ? "bg-[#C9A84C] text-[#0A0E2A]" : "text-white/60 hover:text-white"
                }`}
              >
                Subscribe
              </button>
              <button
                onClick={() => { setActiveTab("login"); setLoginMsg(null); setLoginError(null); }}
                className={`flex-1 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "login" ? "bg-[#C9A84C] text-[#0A0E2A]" : "text-white/60 hover:text-white"
                }`}
              >
                Login
              </button>
            </div>

            {/* Subscribe Tab */}
            {activeTab === "signup" && (
              <form onSubmit={handlePayPalSubscribe} className="flex flex-col gap-5">
                <div>
                  <p className="text-white/80 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Enter your details below, then you&apos;ll be securely redirected to our Stripe payment page to complete your $10/month subscription.
                  </p>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    required
                    value={signupData.fullname}
                    onChange={handleSignupChange}
                    placeholder="Your full name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5 block">Create Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Choose a secure password"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <div className="bg-[#003087]/20 border border-[#009cde]/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-paypal-line text-[#009cde] text-lg mt-0.5" />
                    <div>
                      <p className="text-[#009cde] text-xs font-bold uppercase tracking-wider mb-1">Secure PayPal Payment</p>
                      <p className="text-white/50 text-xs leading-relaxed">
                        You will be securely redirected to PayPal to complete your $10/month subscription. Pay with your PayPal account or any major credit card.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#009cde] text-white font-black py-3.5 rounded-full hover:bg-[#0085c0] transition-colors text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="ri-paypal-line text-base" />
                  Subscribe Now — $10/mo via PayPal
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-white/40 text-xs text-center hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Already a subscriber? Login →
                </button>
              </form>
            )}

            {/* Login Tab */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                {loginMsg && (
                  <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-xl p-4">
                    <p className="text-[#C9A84C] text-xs leading-relaxed">{loginMsg}</p>
                  </div>
                )}
                {loginError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-400 text-xs">{loginError}</p>
                  </div>
                )}
                <div>
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1.5 block">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#C9A84C] text-[#0A0E2A] font-black py-3.5 rounded-full hover:bg-[#e0bc5a] transition-colors text-sm tracking-wider uppercase whitespace-nowrap cursor-pointer"
                >
                  Login to My Account
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-white/40 text-xs text-center hover:text-[#C9A84C] transition-colors cursor-pointer"
                >
                  Don&apos;t have an account? Subscribe now →
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs text-center mb-4">Subscribers also receive access to:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Facebook", "Twitter/X", "Messenger", "Instagram", "YouTube"].map((platform) => (
                  <span key={platform} className="bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
