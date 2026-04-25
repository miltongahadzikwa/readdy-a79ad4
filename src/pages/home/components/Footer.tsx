export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06091a] text-white pt-16 pb-8 px-4 md:px-8" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/ef4333b3-5c34-4393-ae46-fe8984ce2a6e_SITS_logo.jpg?v=427defaab434077b30e2e715a91b6431"
                alt="SITS Logo"
                className="w-12 h-12 object-contain rounded-full"
              />
              <div>
                <p className="text-[#C9A84C] font-black text-sm leading-tight">SITS</p>
                <p className="text-white/50 text-xs">Salvation in the Sanctuary</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              H.I.M. — Hagion International Ministries. Building the Kingdom of God through teaching, preaching, and discipleship worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "ri-facebook-fill", href: "https://www.facebook.com/share/1JQUjKNFTC/?mibextid=wwXIfr" },
                { icon: "ri-twitter-x-line", href: "#" },
                { icon: "ri-youtube-fill", href: "#" },
                { icon: "ri-instagram-line", href: "https://www.instagram.com/dehaynesrol?igsh=MWJlcjNiOTZzYjVyYQ==" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#C9A84C] hover:text-[#0A0E2A] transition-all cursor-pointer"
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A84C] font-black text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", id: "about" },
                { label: "P27 Blog", id: "p27-blog" },
                { label: "Sanctuary Blog", id: "sanctuary-blog" },
                { label: "Audio Series", id: "audio-series" },
                { label: "YouTube Channel", id: "youtube-channel" },
                { label: "Subscribers", id: "subscribers" },
                { label: "Contact Us", id: "contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry */}
          <div>
            <h4 className="text-[#C9A84C] font-black text-sm uppercase tracking-widest mb-5">Ministry</h4>
            <ul className="space-y-3">
              {[
                "H.I.M. — Hagion International Ministries",
                "HTS — Hagion Theological Seminary",
                "GSF — God's Special Forces",
                "P27 Research Study",
                "Project Hope",
                "Online Church",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/50 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-black text-sm uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-global-line text-[#C9A84C] text-sm" />
                </div>
                <a
                  href="https://hihsits.org"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  hihsits.org
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-mail-line text-[#C9A84C] text-sm" />
                </div>
                <a
                  href="mailto:dehaynesrol@gmail.com"
                  className="text-white/50 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  dehaynesrol@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-youtube-line text-[#C9A84C] text-sm" />
                </div>
                <span className="text-white/50 text-sm">YouTube: Salvation in the Sanctuary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          {/* Large Brand Text */}
          <div className="overflow-hidden mb-6">
            <p
              className="text-white/5 font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              SALVATION IN THE SANCTUARY
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              &copy; {new Date().getFullYear()} Salvation in the Sanctuary — H.I.M. Hagion International Ministries. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Dr. Dwight Eric Haynes · <a href="https://hihsits.org" rel="nofollow noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">hihsits.org</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
