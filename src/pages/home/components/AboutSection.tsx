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

export default function AboutSection() {
  const statsAnim = useStaggerAnimation(3);
  const credAnim = useStaggerAnimation(3);
  const cardAnim = useStaggerAnimation(6);
  const ministryAnim = useStaggerAnimation(6);

  return (
    <section id="about" className="bg-[#F5F2EC] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Who We Are</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A0E2A] uppercase tracking-tight">About Us</h2>
          <div className="w-20 h-1 bg-[#C9A84C] mx-auto mt-5 mb-8" />
        </FadeIn>

        {/* Dr. Haynes Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <FadeIn direction="left" delay={0.1}>
            <div className="relative">
              <div className="w-full h-[520px] rounded-2xl overflow-hidden">
                <img
                  src="https://static.readdy.ai/image/1e419030250307f48c03c16c2ab57c68/16c5d543d6450874597eb180b6e68256.jpeg"
                  alt="Dr. Dwight Eric Haynes"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 15%", objectFit: "cover", transform: "scale(0.95)", transformOrigin: "center top" }}
                />
              </div>
              <div className="mt-4 bg-[#0A0E2A] rounded-xl p-4">
                <p className="text-[#C9A84C] font-bold text-lg">Dr. Dwight Eric Haynes</p>
                <p className="text-white/80 text-sm">Theologian, Speaker &amp; Pastor | Ph.D. Systematic Theology</p>
                <p className="text-white/60 text-xs mt-1">H.I.M. — Hagion International Ministries</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#0A0E2A] mb-6 leading-tight">
                A Life Transformed by the<br />
                <span className="text-[#C9A84C]">Power of Jesus Christ</span>
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Dr. Dwight Eric Haynes is a dynamic theologian, speaker, and pastor whose life stands as a powerful testament to transformation, purpose, and unwavering faith. After overcoming a past marked by adversity — including years of involvement in crime, substance abuse, and incarceration — Dr. Haynes experienced a profound spiritual turning point that redirected his life toward ministry and scholarship.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Today, he is fully devoted to the service of the Lord Jesus Christ, dedicating his life to sharing hope, truth, and restoration through the Gospel. With over 48 years of pastoral and ministry experience, he has faithfully served congregations and communities, and has contributed academically as a theology instructor at Oakwood University.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A prolific communicator, Dr. Haynes is the author of five books and numerous articles, and has been featured across radio and television platforms. He is widely recognized nationally and internationally for his impactful seminar revival series, <strong>&ldquo;Salvation in the Sanctuary,&rdquo;</strong> through which he has traveled extensively, sharing biblical truth and inspiring spiritual renewal around the world.
              </p>
              <div ref={statsAnim.ref} className="grid grid-cols-3 gap-4">
                {[
                  { stat: "48+", label: "Years in Ministry" },
                  { stat: "5", label: "Published Books" },
                  { stat: "43+", label: "Years Married" },
                ].map((item, i) => (
                  <div key={item.label} className="text-center bg-white rounded-xl p-4" style={statsAnim.getItemStyle(i, 0.3)}>
                    <p className="text-3xl font-black text-[#C9A84C]">{item.stat}</p>
                    <p className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Academic Credentials */}
        <FadeIn delay={0.1}>
          <div className="bg-[#0A0E2A] rounded-2xl p-8 md:p-10 mb-16">
            <div className="text-center mb-8">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-3">Academic Credentials</p>
              <h3 className="text-2xl md:text-3xl font-black text-white">Education &amp; Scholarship</h3>
              <div className="w-16 h-1 bg-[#C9A84C] mx-auto mt-4" />
            </div>
            <div ref={credAnim.ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  degree: "B.A. in Theology",
                  detail: "Minors in Biblical Languages &amp; Business Management",
                  icon: "ri-book-2-line",
                },
                {
                  degree: "M.A. in Systematic Theology",
                  detail: "Cognate in Biblical Languages",
                  icon: "ri-graduation-cap-line",
                },
                {
                  degree: "Ph.D. in Systematic Theology",
                  detail: "Doctor of Philosophy — Systematic Theology",
                  icon: "ri-award-line",
                },
              ].map((cred, i) => (
                <div key={cred.degree} className="bg-white/5 rounded-xl p-6 text-center border border-[#C9A84C]/20" style={credAnim.getItemStyle(i, 0.2)}>
                  <div className="w-12 h-12 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl mx-auto mb-4">
                    <i className={`${cred.icon} text-[#C9A84C] text-2xl`} />
                  </div>
                  <p className="text-[#C9A84C] font-black text-base mb-2">{cred.degree}</p>
                  <p className="text-white/60 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: cred.detail }} />
                </div>
              ))}
            </div>
            <div ref={cardAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-[#C9A84C]/20" style={cardAnim.getItemStyle(0, 0.4)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl flex-shrink-0">
                    <i className="ri-building-4-line text-[#C9A84C] text-xl" />
                  </div>
                  <p className="text-[#C9A84C] font-black text-sm uppercase tracking-wider">Oakwood University</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Theology Instructor — contributing to the academic formation of the next generation of ministers and biblical scholars.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-[#C9A84C]/20" style={cardAnim.getItemStyle(1, 0.4)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl flex-shrink-0">
                    <i className="ri-heart-line text-[#C9A84C] text-xl" />
                  </div>
                  <p className="text-[#C9A84C] font-black text-sm uppercase tracking-wider">Family</p>
                </div>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Happily married for over 43 years to Eve Estelle Haynes, an accomplished educator with a master&apos;s degree in education. Together they are blessed with four adult children and eight grandchildren.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Ministry Cards */}
        <div ref={ministryAnim.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "ri-building-line",
              title: "H.I.M.",
              subtitle: "Hagion International Ministries",
              desc: "A global ministry dedicated to building the Kingdom of God through teaching, preaching, and discipleship across all nations.",
              color: "#0A0E2A",
            },
            {
              icon: "ri-graduation-cap-line",
              title: "HTS",
              subtitle: "Hagion Theological Seminary",
              desc: "Self-paced 1, 2, and 3-year theological curriculum offering certificates, diplomas, and degrees via Google Classroom platform.",
              color: "#1a2a1a",
            },
            {
              icon: "ri-shield-star-line",
              title: "GSF",
              subtitle: "God's Special Forces",
              desc: "A church growth system implemented through the active participation of church members — mobilizing the body of Christ for Kingdom expansion.",
              color: "#2a1a0a",
            },
            {
              icon: "ri-book-open-line",
              title: "P27",
              subtitle: "Post-Doctoral Research",
              desc: "A landmark research study exploring the Gospel through the Hebrew Wilderness Tabernacle — soon to be published as a theological textbook.",
              color: "#0A0E2A",
            },
            {
              icon: "ri-heart-line",
              title: "Project Hope",
              subtitle: "Community Outreach Evangelism",
              desc: "An effective community outreach evangelism system designed to involve all church auxiliaries, departments, and members in reaching the lost.",
              color: "#1a0a1a",
            },
            {
              icon: "ri-global-line",
              title: "Online Church",
              subtitle: "H.I.M. Digital Ministry",
              desc: "Experience the power of worship and teaching from anywhere in the world through our online church platform — the Sanctuary comes to you.",
              color: "#0a1a2a",
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: card.color, ...ministryAnim.getItemStyle(i, 0.1) }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#C9A84C]/20 rounded-xl mb-4">
                <i className={`${card.icon} text-[#C9A84C] text-2xl`} />
              </div>
              <h4 className="text-xl font-black text-[#C9A84C] mb-1">{card.title}</h4>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">{card.subtitle}</p>
              <p className="text-white/75 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Teaching — Salvation in the Sanctuary Series Part 1.2 */}
        <FadeIn delay={0.1}>
          <div className="mb-16">
            <div className="text-center mb-10">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-3">Featured Teaching</p>
              <h3 className="text-3xl md:text-4xl font-black text-[#0A0E2A] uppercase tracking-tight">
                Salvation in the Sanctuary
              </h3>
              <div className="w-16 h-1 bg-[#C9A84C] mx-auto mt-4 mb-10" />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 w-full h-[320px] lg:h-auto overflow-hidden">
                  <img
                    src="https://readdy.ai/api/search-image?query=ancient%20Hebrew%20wilderness%20tabernacle%20sanctuary%20glowing%20golden%20light%20pathway%20entrance%20sacred%20holy%20ground%20Israel%20desert%20spiritual%20illustration%20warm%20gold%20navy%20tones%20cinematic%20dramatic&width=800&height=600&seq=sits_about_p12&orientation=portrait"
                    alt="Salvation in the Sanctuary Series Part 1.2"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="bg-[#C9A84C] text-[#0A0E2A] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                      Series Part 1.2
                    </span>
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Salvation in the Sanctuary</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-[#0A0E2A] mb-6 leading-tight">
                    The Way Is Clearly Identified<br />
                    <span className="text-[#C9A84C]">as Being in the Sanctuary</span>
                  </h4>
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                      The way is clearly identified as being in the sanctuary. Jesus states that He is &ldquo;the way, the truth, and the life, and no man cometh unto the Father&rdquo; but by Him. Before Jesus ever came to earth the sanctuary was the only way of truth that led to forgiveness and life everlasting with God Almighty. God&apos;s people always related to Him and understood Him by way of the sanctuary.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                      After Adam and Eve sinned in the Garden of Eden, how did God&apos;s people seek forgiveness of sin from God?
                    </p>
                    <blockquote className="border-l-4 border-[#C9A84C] pl-5 py-2 bg-[#F5F2EC] rounded-r-xl">
                      <p className="text-[#0A0E2A] text-sm font-semibold leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                        &ldquo;And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the Lord had respect unto Abel and to his offering.&rdquo;
                      </p>
                      <cite className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mt-2 block not-italic">
                        — Genesis 4:4
                      </cite>
                    </blockquote>
                    <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                      This system of sacrificing animals to God as offerings was the only acceptable way God would forgive sin. There was no other way to God to receive forgiveness. This way was the truth. This way was the life of God&apos;s people.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <i className="ri-book-open-line text-[#C9A84C] text-sm" />
                      <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider">John 14:6 &nbsp;|&nbsp; Genesis 4:4</span>
                    </div>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-400 text-xs">— Dr. Dwight Eric Haynes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* SITS Mission Banner */}
        <FadeIn delay={0.1}>
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #0A0E2A 0%, #1a2040 100%)" }}
          >
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://readdy.ai/api/search-image?query=abstract%20gold%20pattern%20cross%20church%20ministry%20background%20texture%20elegant%20premium&width=1200&height=400&seq=banner001&orientation=landscape"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 px-8 md:px-16 py-12 text-center">
              <p className="text-[#C9A84C] text-xs font-bold tracking-[0.4em] uppercase mb-4">Our Mission</p>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-6">
                &ldquo;Building the Kingdom of God<br />
                <span className="text-[#C9A84C]">One Soul at a Time&rdquo;</span>
              </h3>
              <p className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                Through teaching, preaching, theological education, community outreach, and digital ministry, Salvation in the Sanctuary is committed to making disciples of all nations — fulfilling the Great Commission of Jesus Christ.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
