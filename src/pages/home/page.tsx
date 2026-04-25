import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BooksSection from "./components/BooksSection";
import P27BlogSection from "./components/P27BlogSection";
import SanctuaryBlogSection from "./components/SanctuaryBlogSection";
import AudioSeriesSection from "./components/AudioSeriesSection";
import YouTubeSection from "./components/YouTubeSection";
import SubscribersSection from "./components/SubscribersSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const SECTIONS = ["hero", "about", "books", "p27-blog", "sanctuary-blog", "audio-series", "youtube-channel", "subscribers", "contact"];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    // Using a royalty-free gospel/worship ambient track placeholder
    // Replace with actual SITS Theme Song URL
    audio.src = "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/bd3924ee-f4aa-44b5-856e-8cb74ed1c39c_jessequinnmedia-christian-instrumental-piano-worship-calm-emotional-soaking-prayer-249459.mp3?v=57200a024fc8c902792b01a8a75a84bb";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <Navbar
        activeSection={activeSection}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />
      <HeroSection
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        audioRef={audioRef}
      />
      <AboutSection />
      <BooksSection />
      <P27BlogSection />
      <SanctuaryBlogSection />
      <AudioSeriesSection />
      <YouTubeSection />
      <SubscribersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
