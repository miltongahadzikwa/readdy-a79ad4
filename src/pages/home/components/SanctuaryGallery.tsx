import { useState, useEffect, useRef } from "react";

const sanctuaryImages = [
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/10c07399-69cb-48dc-8246-ead1ff274c5b_Ark-Of-Covenant-2-1.jpg?v=fd28ca09b621ded3a81c400dc178fd65",
    title: "The Ark of the Covenant",
    subtitle: "The Most Holy Place",
    scripture: "Exodus 25:10-22",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/4864418e-7ffc-4c56-8752-b72709c7628a_Cutaway-Overview1.jpg?v=10c237a6a0c9be5288c22869240c5b1d",
    title: "Cutaway Overview",
    subtitle: "The Tabernacle Structure",
    scripture: "Exodus 26:1-37",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/f99bf539-c654-4fe2-878a-2f337c82b9ca_Inside-Holy-1.jpg?v=3afef50a2b369965ed3757fb8ecde245",
    title: "Inside the Holy Place",
    subtitle: "The Inner Sanctuary",
    scripture: "Exodus 26:33",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/5bed007f-7117-4de9-a042-bf2c2ea10868_Intro-Ending-Title.jpg?v=8a41dc993518aad9fc298e5d3a9795ef",
    title: "Salvation in the Sanctuary",
    subtitle: "Series Introduction",
    scripture: "John 14:6",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/6c11ed2d-847e-4a55-b44e-f2a28647a916_Inside-Most-Holy.jpg?v=6dcb3686ab4dadf6d55d88373091148e",
    title: "Inside the Most Holy",
    subtitle: "The Holy of Holies",
    scripture: "Leviticus 16:2",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/d901b88b-3a7a-4547-831b-b135719db1a5_Most-Holy-Curtain-Blood.jpg?v=d4354b66c12c1cf9b53326b3c41a505c",
    title: "The Veil & The Blood",
    subtitle: "Atonement at the Curtain",
    scripture: "Hebrews 9:12",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/2331edca-4937-48e9-8009-0c6a25f2269e_Priest_Lamb.jpg?v=ac788c8f3d0891f51b0f1e83cd1030c7",
    title: "The Priest & The Lamb",
    subtitle: "The Sacrifice of Atonement",
    scripture: "John 1:29",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/0c936424-35f8-4f91-8899-133e277a9f47_The-Courtyard-2-1.jpg?v=ef5ae973d149d9d396a99fd2e06649c4",
    title: "The Courtyard",
    subtitle: "The Outer Court",
    scripture: "Exodus 27:9-19",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/4c52867f-52b4-4f89-b55b-e87d01325594_The-Courtyard-1.jpg?v=b777de52312ad57a1cfab5c699a38fdc",
    title: "The Courtyard — Entry",
    subtitle: "The Gate of the Tabernacle",
    scripture: "Psalm 100:4",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/145d47fe-fe5f-4ab1-b6e6-55c60109cd21_The-Courtyard-2-1_edited.png?v=7bef6ee03f62a1db72201a804f4df03b",
    title: "The Courtyard — Illuminated",
    subtitle: "Light of the Sanctuary",
    scripture: "Psalm 27:4",
  },
  // New images added
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/5487b634-5362-4631-b072-920ee2d46f1f_Wilderness-SANCTUARY--Creitz-Illustration-Studio-1.jpg?v=9a0466747a6714086916b60325cf30d1",
    title: "Wilderness Sanctuary",
    subtitle: "Creitz Illustration — View I",
    scripture: "Exodus 40:34",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/df9432c2-8ccf-4db0-8465-8aa3967e3b52_Wilderness-SANCTUARY--Creitz-Illustration-Studio.jpg?v=2b858a6e21b0a691b57e0c5e0a145f51",
    title: "Wilderness Sanctuary",
    subtitle: "Creitz Illustration — View II",
    scripture: "Numbers 9:15",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/fb0a56f4-b7b3-47d9-8aa0-c83c29ec5ad7_4baa4a37-6295-4f03-8835-07abca4a9bf4.jpg?v=43a1c0ba292e6a377e0f9915647b387f",
    title: "Sacred Illustration",
    subtitle: "Sanctuary Artwork",
    scripture: "Hebrews 8:5",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/009dcc94-3abe-4e78-bd09-427b597e0c47_Honor-Jehovahs-Great-Name--Watchtower-ONLINE-LIBRARY.jpg?v=aa2728dbc58cb542434352b075953dd4",
    title: "Honor Jehovah's Great Name",
    subtitle: "The Name Above All Names",
    scripture: "Psalm 83:18",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/8a1605da-4e40-45f7-aa0c-0d7eb351bc65_John-the-Baptist-Decreases-as-Jesus-Increases-_-Life-of-Jesus.jpg?v=40840430de092d4a4fc19ea97d10572a",
    title: "John Decreases, Jesus Increases",
    subtitle: "Life of Jesus",
    scripture: "John 3:30",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/0c17f330-91db-47fa-802e-099e0e9b385d_Justinen-Creative-Group.jpg?v=05dc59a6abbfc5ebe49cf4359433fd45",
    title: "Justinen Creative Group",
    subtitle: "Ministry Artwork",
    scripture: "Colossians 3:23",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/47714670-e04f-4f4b-ae6d-7e848263b4f6_Luke-3.jpg?v=0a5214bbf22e9efc7e15655d6c5f742c",
    title: "Luke Chapter 3",
    subtitle: "The Gospel of Luke",
    scripture: "Luke 3:16",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/bcd20d13-611e-4541-b3aa-4aa30878230b_Revelation-21-New-Jerusalem-Bible-Scriptures---New-Heavens-And-New-Earth.jpg?v=b839327e597e611ed7807d232e8cf984",
    title: "Revelation 21 — New Jerusalem",
    subtitle: "New Heavens and New Earth",
    scripture: "Revelation 21:1-4",
  },
  {
    url: "https://storage.readdy-site.link/project_files/c3b1d369-9239-4f91-9f3d-e6a7f388049f/7ce22520-78b4-4ec1-91ab-deaa68aa3f6c_The-baptism-of-Jesus-1.jpg?v=bab18f08a30832ee6ed26291510a62e4",
    title: "The Baptism of Jesus",
    subtitle: "The Jordan River",
    scripture: "Matthew 3:16-17",
  },
];

function LightboxModal({
  image,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  image: (typeof sanctuaryImages)[0];
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-[#C9A84C] transition-colors cursor-pointer w-10 h-10 flex items-center justify-center"
        >
          <i className="ri-close-line text-2xl" />
        </button>
        <p className="absolute -top-12 left-0 text-white/50 text-sm font-semibold tracking-widest uppercase">
          {index + 1} / {total}
        </p>
        <div className="w-full rounded-2xl overflow-hidden" style={{ maxHeight: "70vh" }}>
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-contain"
            style={{ maxHeight: "70vh" }}
          />
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-white text-xl font-black tracking-wide">{image.title}</h3>
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mt-1">{image.subtitle}</p>
          <p className="text-white/50 text-xs mt-2 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            {image.scripture}
          </p>
        </div>
        <button
          onClick={onPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#C9A84C]/30 rounded-full text-white transition-all cursor-pointer"
        >
          <i className="ri-arrow-left-s-line text-xl" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#C9A84C]/30 rounded-full text-white transition-all cursor-pointer"
        >
          <i className="ri-arrow-right-s-line text-xl" />
        </button>
      </div>
    </div>
  );
}

// 3D Auto-scrolling Vista Banner
function Vista3DBanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6;

    const animate = () => {
      if (!hovered) {
        posRef.current += speed;
        const totalWidth = track.scrollWidth / 2;
        if (posRef.current >= totalWidth) {
          posRef.current = 0;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovered]);

  // Use first 10 images for the vista strip, duplicated for seamless loop
  const vistaImages = sanctuaryImages.slice(0, 10);

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-8"
      style={{ height: "220px", perspective: "1200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dark overlay gradient for depth */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0A0E2A 0%, transparent 15%, transparent 85%, #0A0E2A 100%)",
        }}
      />
      {/* Top/bottom fade */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0A0E2A 0%, transparent 30%, transparent 70%, #0A0E2A 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-3 absolute top-0 left-0 h-full"
        style={{
          willChange: "transform",
          transform: "translateX(0px)",
        }}
      >
        {[...vistaImages, ...vistaImages].map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative overflow-hidden rounded-xl"
            style={{
              width: "320px",
              height: "220px",
              transformStyle: "preserve-3d",
              transform: `rotateY(${idx % 2 === 0 ? "2deg" : "-2deg"}) scale(0.97)`,
              transition: "transform 0.4s ease",
            }}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.75) saturate(1.1)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-bold truncate">{img.title}</p>
              <p className="text-[#C9A84C] text-xs truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
                {img.scripture}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Center label */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.5em] uppercase mb-1 opacity-90">
            Sanctuary Gallery
          </p>
          <p className="text-white/50 text-xs tracking-widest uppercase">
            {hovered ? "Paused" : "Scroll to explore"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SanctuaryGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % sanctuaryImages.length);
      }, 3500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  const openLightbox = (idx: number) => {
    setIsAutoPlaying(false);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsAutoPlaying(true);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + sanctuaryImages.length) % sanctuaryImages.length);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % sanctuaryImages.length);
  };

  const featured = sanctuaryImages[activeIndex];

  return (
    <div className="mb-16">
      {lightboxIndex !== null && (
        <LightboxModal
          image={sanctuaryImages[lightboxIndex]}
          index={lightboxIndex}
          total={sanctuaryImages.length}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-3">Visual Journey</p>
        <h3 className="text-3xl md:text-4xl font-black text-[#0A0E2A] uppercase tracking-tight">
          Sanctuary Graphics
        </h3>
        <div className="w-16 h-1 bg-[#C9A84C] mx-auto mt-4 mb-4" />
        <p className="text-gray-500 text-sm max-w-xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
          Explore the sacred architecture of the Hebrew Wilderness Tabernacle — every detail a type and shadow of Jesus Christ.
        </p>
      </div>

      {/* 3D Auto-Scrolling Vista Banner */}
      <div className="bg-[#0A0E2A] rounded-2xl overflow-hidden p-4 mb-6">
        <Vista3DBanner />

        {/* Featured Rotating Display */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: "radial-gradient(ellipse at center, #C9A84C 0%, transparent 70%)",
                animation: "galleryPulse 4s ease-in-out infinite",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10">
            {/* Main Featured Image */}
            <div
              className="lg:col-span-2 relative overflow-hidden cursor-pointer group rounded-xl"
              style={{ height: "480px" }}
              onClick={() => openLightbox(activeIndex)}
            >
              {sanctuaryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    opacity: idx === activeIndex ? 1 : 0,
                    transform: idx === activeIndex ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E2A] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0E2A]/40" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block bg-[#C9A84C] text-[#0A0E2A] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                  {featured.subtitle}
                </span>
                <h4 className="text-white text-2xl md:text-3xl font-black leading-tight mb-2">
                  {featured.title}
                </h4>
                <p className="text-[#C9A84C] text-sm font-semibold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {featured.scripture}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-fullscreen-line text-white text-lg" />
              </div>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
                  className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-full text-white hover:bg-[#C9A84C]/40 transition-colors cursor-pointer"
                >
                  <i className={isAutoPlaying ? "ri-pause-line text-sm" : "ri-play-line text-sm"} />
                </button>
                {isAutoPlaying && (
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Auto</span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="lg:col-span-1 p-4 flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: "480px" }}>
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2 px-2">
                All Graphics ({sanctuaryImages.length})
              </p>
              {sanctuaryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveIndex(idx); setIsAutoPlaying(false); }}
                  className={`flex items-center gap-3 rounded-xl p-2 transition-all cursor-pointer text-left w-full ${
                    idx === activeIndex
                      ? "bg-[#C9A84C]/20 border border-[#C9A84C]/50"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="w-14 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold leading-tight truncate ${idx === activeIndex ? "text-[#C9A84C]" : "text-white/80"}`}>
                      {img.title}
                    </p>
                    <p className="text-white/40 text-xs truncate mt-0.5">{img.scripture}</p>
                  </div>
                  {idx === activeIndex && (
                    <div className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[#C9A84C]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 py-4 relative z-10 flex-wrap">
            {sanctuaryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveIndex(idx); setIsAutoPlaying(false); }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? "w-6 h-2 bg-[#C9A84C]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid Gallery — all images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {sanctuaryImages.map((img, idx) => (
          <div
            key={idx}
            className="relative group cursor-pointer rounded-xl overflow-hidden"
            style={{ height: "110px" }}
            onClick={() => openLightbox(idx)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#0A0E2A]/0 group-hover:bg-[#0A0E2A]/60 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                <i className="ri-zoom-in-line text-[#C9A84C] text-xl mb-1 block" />
                <p className="text-white text-xs font-bold leading-tight">{img.title}</p>
              </div>
            </div>
            {idx === activeIndex && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes galleryPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
