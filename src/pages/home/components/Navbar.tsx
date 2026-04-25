import { useState, useEffect } from "react";

const tabs = [
  { id: "about", label: "About Us" },
  { id: "books", label: "Books" },
  { id: "p27-blog", label: "P27 Blog" },
  { id: "sanctuary-blog", label: "Sanctuary Blog" },
  { id: "audio-series", label: "Audio Series" },
  { id: "youtube-channel", label: "YouTube Channel" },
  { id: "subscribers", label: "Subscribers" },
  { id: "contact", label: "Contact Us" },
];

interface NavbarProps {
  activeSection: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function Navbar({ activeSection, isMuted, onToggleMute }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0A0E2A] shadow-lg" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid rgba(201,168,76,0.3)" : "none" }}
    >
      <div className="px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/ef4333b3-5c34-4393-ae46-fe8984ce2a6e_SITS_logo.jpg?v=427defaab434077b30e2e715a91b6431"
            alt="SITS Logo"
            className="w-10 h-10 object-contain rounded-full"
          />
          <span className="hidden sm:block text-[#C9A84C] font-bold text-sm tracking-widest uppercase whitespace-nowrap">
            Salvation in the Sanctuary
          </span>
        </button>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeSection === tab.id
                  ? "text-[#C9A84C] border-b-2 border-[#C9A84C]"
                  : "text-white/80 hover:text-[#C9A84C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className="w-8 h-8 flex items-center justify-center text-[#C9A84C] hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Unmute music" : "Mute music"}
          >
            <i className={`ri-${isMuted ? "volume-mute-line" : "volume-up-line"} text-lg`} />
          </button>
          <button
            onClick={() => scrollTo("subscribers")}
            className="hidden md:block bg-[#C9A84C] text-[#0A0E2A] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#e0bc5a] transition-colors whitespace-nowrap cursor-pointer"
          >
            Join Now
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-white cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`ri-${mobileOpen ? "close-line" : "menu-line"} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0E2A] border-t border-[#C9A84C]/20 px-4 py-3 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`text-left px-3 py-2 text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                activeSection === tab.id ? "text-[#C9A84C]" : "text-white/80 hover:text-[#C9A84C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("subscribers")}
            className="mt-2 bg-[#C9A84C] text-[#0A0E2A] text-xs font-bold px-4 py-2 rounded-full hover:bg-[#e0bc5a] transition-colors whitespace-nowrap cursor-pointer"
          >
            Join Now — $10/mo
          </button>
        </div>
      )}
    </nav>
  );
}
