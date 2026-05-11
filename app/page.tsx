"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import Lenis from "@studio-freight/lenis";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CalendarPlus,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Navigation,
  Sparkles,
  MousePointer2
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import * as THREE from "three";

const weddingDate = new Date("2026-05-21T10:30:00+05:30").getTime();
const mapsUrl = "https://share.google/3tcVWeTHQcC8XW4Xz";
const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Almas%20%26%20Nizar%20Nikah&dates=20260521T050000Z/20260521T060000Z&details=From%20Dua%20To%20Forever&location=SNR%20Mahal%2C%20Keezhputhupattu%2C%20Pondicherry";

const copy = {
  en: {
    invite: "With the blessings of Allah, we invite you to celebrate the Nikah of",
    names: "Almas & Nizar",
    tagline: "From Dua To Forever",
    countdown: "The blessed morning begins in",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    storyTitle: "Written In Dua",
    story:
      "Two hearts guided by faith, brought together through love, family, and Allah's blessings. Their forever begins here.",
    timelineTitle: "Ceremony Flow",
    venueTitle: "The Nikah Venue",
    galleryTitle: "A Cinematic Prelude",
    actionsTitle: "Keep The Invitation Close",
    dua:
      "May Allah bless this union with endless love, peace, barakah, and happiness."
  },
  ta: {
    invite: "அல்லாஹ்வின் அருளுடனும், குடும்பங்களின் ஆசீர்வாதங்களுடனும் நிக்காஹ் விழாவிற்கு அன்புடன் அழைக்கிறோம்",
    names: "அல்மாஸ் & நிஸார்",
    tagline: "துஆவிலிருந்து என்றும் ஒன்றாக",
    countdown: "ஆசீர்வதிக்கப்பட்ட காலை தொடங்க இன்னும்",
    days: "நாட்கள்",
    hours: "மணி",
    minutes: "நிமிடம்",
    seconds: "வினாடி",
    storyTitle: "துஆவில் எழுதப்பட்ட இணைவு",
    story:
      "இரு இதயங்கள் ஈமானின் வழியில், அன்பும் குடும்பமும் அல்லாஹ்வின் அருளும் இணைத்த புனித பயணம். அவர்களின் என்றும் நிலைக்கும் வாழ்வு இங்கே தொடங்குகிறது.",
    timelineTitle: "விழா நிகழ்வுகள்",
    venueTitle: "நிக்காஹ் நடைபெறும் இடம்",
    galleryTitle: "ஒரு சினிமாபோன்ற முன்னுரை",
    actionsTitle: "அழைப்பிதழை சேமித்து வையுங்கள்",
    dua:
      "இந்த இணைவிற்கு அல்லாஹ் முடிவில்லா அன்பு, அமைதி, பரகத், மகிழ்ச்சி அருள்வானாக."
  },
  ar: {
    invite: "ببركة الله ندعوكم للاحتفال بنكاح",
    names: "ألماس ونزار",
    tagline: "من الدعاء إلى الأبد",
    countdown: "يبدأ الصباح المبارك بعد",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    storyTitle: "مكتوب في الدعاء",
    story:
      "قلبان هداهما الإيمان، جمعهما الحب والأسرة وبركات الله. تبدأ رحلتهما إلى الأبد من هنا.",
    timelineTitle: "مسار الحفل",
    venueTitle: "مكان النكاح",
    galleryTitle: "مقدمة سينمائية",
    actionsTitle: "احتفظوا بالدعوة بالقرب منكم",
    dua: "بارك الله هذا الاتحاد بالحب والسلام والبركة والسعادة."
  }
};

const languages = [
  { id: "en", label: "English" },
  { id: "ta", label: "தமிழ்" },
  { id: "ar", label: "عربي" }
] as const;

type Language = (typeof languages)[number]["id"];

function getTimeLeft() {
  const distance = Math.max(weddingDate - Date.now(), 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

function GoldenMist() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.035;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.04;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#FFD89B"
        size={0.032}
        transparent
        opacity={0.48}
        depthWrite={false}
      />
    </points>
  );
}

function AmbientCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="webgl-layer" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
        <GoldenMist />
      </Canvas>
    </div>
  );
}

function SakuraField() {
  const petals = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: index,
        left: `${(index * 29) % 100}%`,
        delay: `${(index * 0.57) % 9}s`,
        duration: `${11 + (index % 7)}s`,
        size: `${8 + (index % 5) * 3}px`,
        drift: `${index % 2 === 0 ? 32 : -34}px`
      })),
    []
  );

  return (
    <div className="sakura-field" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={
            {
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size,
              "--drift": petal.drift
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Lantern({ side }: { side: "left" | "right" }) {
  return (
    <div className={`lantern lantern-${side}`} aria-hidden="true">
      <div className="lantern-chain" />
      <div className="lantern-crown" />
      <div className="lantern-body">
        <div className="lantern-window" />
      </div>
      <div className="lantern-glow" />
    </div>
  );
}

function MosqueSilhouette() {
  return (
    <svg className="mosque" viewBox="0 0 1200 260" aria-hidden="true">
      <path
        d="M0 218h95v-64h28v64h48V94h24v124h44V135c0-37 29-69 68-75 40 6 69 38 69 75v83h49V107h24v111h58V72h25v146h67v-62c0-55 43-102 100-111 57 9 101 56 101 111v62h66V72h25v146h58V107h24v111h49v-83c0-37 29-69 69-75 39 6 68 38 68 75v83h44V94h24v124h48v-64h28v64h95v42H0z"
        fill="currentColor"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label reveal">
      <Sparkles size={15} />
      <span>{children}</span>
    </div>
  );
}

function IntroOverlay({ onOpen, isTapped, onTap }: { onOpen: () => void; isTapped: boolean; onTap: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = () => {
    if (isTapped) return;
    onTap();
    setTimeout(onOpen, 1500);
  };

  return (
    <div 
      className={`intro-wrapper ${isTapped ? "opened" : ""}`}
      onClick={handleTap}
      style={{ cursor: "pointer" }}
    >
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      
      <motion.div 
        className="intro-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="glitter-container">
          {mounted && [...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="glitter-sparkle" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          <AnimatePresence>
            {!isTapped && (
              <motion.div 
                className="intro-names" 
                layoutId="names-container"
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              >
                <motion.span className="name-part" layoutId="name-almas">Almas</motion.span>
                <motion.span className="name-amp" layoutId="name-amp">&</motion.span>
                <motion.span className="name-part" layoutId="name-nizar">Nizar</motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {!isTapped && (
            <motion.button 
              className="tap-to-open"
              onClick={handleTap}
              exit={{ opacity: 0, y: 20 }}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <MousePointer2 size={20} />
              <span>TAP TO OPEN</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function CoupleNames({ language }: { language: Language }) {
  const names = {
    en: ["Almas", "&", "Nizar"],
    ta: ["அல்மாஸ்", "&", "நிஸார்"],
    ar: ["ألماس", "و", "نزار"]
  }[language];

  return (
    <motion.div style={{ display: "contents" }} layoutId="names-container">
      <motion.span className="name-part" layoutId="name-almas">{names[0]}</motion.span>
      <motion.span className="name-amp" layoutId="name-amp">{names[1]}</motion.span>
      <motion.span className="name-part" layoutId="name-nizar">{names[2]}</motion.span>
    </motion.div>
  );
}

function Countdown({ t }: { t: (typeof copy)[Language] }) {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const timer = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    [t.days, time?.days],
    [t.hours, time?.hours],
    [t.minutes, time?.minutes],
    [t.seconds, time?.seconds]
  ] as const;

  return (
    <section className="section countdown-section">
      <SectionLabel>21 May 2026 · 10:30 AM</SectionLabel>
      <h2 className="section-title reveal">{t.countdown}</h2>
      <div className="countdown-unified-board reveal">
        {units.map(([label, value], index) => (
          <Fragment key={label}>
            <div className="unit-column">
              <div className="unit-number">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={value}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {typeof value === "number" ? String(value).padStart(2, "0") : "--"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="unit-label">{label}</span>
            </div>
            {index < units.length - 1 && <div className="unit-colon">:</div>}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function Story({ t }: { t: (typeof copy)[Language] }) {
  return (
    <section className="section story-section">
      <div className="floral-corner floral-one" aria-hidden="true" />
      <div className="story-copy">
        <SectionLabel>Alhamdulillah</SectionLabel>
        <h2 className="section-title reveal">{t.storyTitle}</h2>
        <p className="story-text reveal">{t.story}</p>
      </div>
      <div className="quote-panel reveal">
        <p className="arabic">وَخَلَقْنَاكُمْ أَزْوَاجًا</p>
        <span>And We created you in pairs</span>
      </div>
      <div className="floral-corner floral-two" aria-hidden="true" />
    </section>
  );
}

function Timeline({ t }: { t: (typeof copy)[Language] }) {
  const events = [
    {
      title: "Nikah Ceremony",
      time: "10:30 AM",
      detail: "A sacred beginning blessed with dua, family, and faith."
    },
    {
      title: "Reception",
      time: "11:30 AM",
      detail: "Warm greetings, shared joy, and a graceful wedding feast."
    },
    {
      title: "Family Gathering",
      time: "After Nikah",
      detail: "A tender celebration of two families becoming one."
    }
  ];

  return (
    <section className="section timeline-section">
      <SectionLabel>Faith · Family · Forever</SectionLabel>
      <h2 className="section-title reveal">{t.timelineTitle}</h2>
      <div className="timeline">
        {events.map((event) => (
          <div className="timeline-item reveal" key={event.title}>
            <div className="timeline-orb">
              <Heart size={16} />
            </div>
            <div className="timeline-card">
              <span>{event.time}</span>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Venue({ t }: { t: (typeof copy)[Language] }) {
  return (
    <section className="section venue-section">
      <div className="venue-copy">
        <SectionLabel>SNR Mahal</SectionLabel>
        <h2 className="section-title reveal">{t.venueTitle}</h2>
        <p className="venue-address reveal">
          SNR Mahal,
          <br />
          Keezhputhupattu,
          <br />
          Pondicherry
        </p>
        <a className="lux-button reveal" href={mapsUrl} target="_blank" rel="noreferrer">
          <Navigation size={18} />
          Open In Google Maps
        </a>
      </div>
      <div className="map-shell reveal">
        <iframe
          title="SNR Mahal map"
          src="https://www.google.com/maps?q=SNR%20Mahal%20Keezhputhupattu%20Pondicherry&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function Gallery({ t }: { t: (typeof copy)[Language] }) {
  const slides = [
    "Nikah invitation suite with rose silk, gold foil, and ivory paper",
    "Warm lantern corridor with floral shadows and evening glow",
    "South Indian Muslim wedding hall with maroon drapes and jasmine florals"
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      3600
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="section gallery-section">
      <SectionLabel>Soft Florals · Golden Light</SectionLabel>
      <h2 className="section-title reveal">{t.galleryTitle}</h2>
      <div className="gallery-stage reveal">
        <AnimatePresence mode="wait">
          <motion.div
            className={`gallery-slide gallery-slide-${active + 1}`}
            key={active}
            initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(10px)" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="gallery-pattern" />
            <p>{slides[active]}</p>
          </motion.div>
        </AnimatePresence>
        <div className="gallery-dots">
          {slides.map((slide, index) => (
            <button
              aria-label={slide}
              className={active === index ? "active" : ""}
              key={slide}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Actions({ t }: { t: (typeof copy)[Language] }) {
  const shareText = encodeURIComponent(
    "Almas & Nizar Nikah Invitation - From Dua To Forever. 21 May 2026, 10:30 AM at SNR Mahal, Pondicherry."
  );
  const actions = [
    { label: "Share on WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${shareText}` },
    { label: "Add To Calendar", icon: CalendarPlus, href: calendarUrl },
    { label: "Open Maps", icon: MapPin, href: mapsUrl }
  ];

  return (
    <section className="section actions-section">
      <SectionLabel>Invitation Details</SectionLabel>
      <h2 className="section-title reveal">{t.actionsTitle}</h2>
      <div className="action-grid">
        {actions.map(({ label, icon: Icon, href }) => (
          <a className="action-button reveal" href={href} key={label} target="_blank" rel="noreferrer">
            <Icon size={18} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [isOpened, setIsOpened] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const t = copy[language];

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpened]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
    reveals.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 36, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%"
          }
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <main className={language === "ar" ? "rtl" : ""}>
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="intro"
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          >
            <IntroOverlay 
              isTapped={isTapped}
              onTap={() => setIsTapped(true)}
              onOpen={() => setIsOpened(true)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AmbientCanvas />
      <SakuraField />
      <div className="ambient-backdrop" aria-hidden="true" />
      <nav className="language-switcher" aria-label="Language">
        {languages.map((item) => (
          <button
            className={language === item.id ? "active" : ""}
            key={item.id}
            onClick={() => setLanguage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="hero-section">
        <Lantern side="left" />
        <Lantern side="right" />
        <MosqueSilhouette />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <motion.p
            className="bismillah"
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.25 }}
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </motion.p>
          <motion.p
            className="hero-invite"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
          >
            {t.invite}
          </motion.p>
          <motion.h1
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {(isOpened || isTapped) && <CoupleNames language={language} />}
          </motion.h1>
          <motion.div
            className="hero-liquid-glass"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.55 }}
          >
            <span className="tagline-txt">{t.tagline}</span>
            <div className="glass-sep" />
            <div className="date-txt">
              <Clock3 size={16} />
              <span>21 May 2026 · 10:30 AM to 11:30 AM</span>
            </div>
          </motion.div>
        </motion.div>
        <a className="scroll-cue" href="#countdown" aria-label="Scroll to invitation">
          <ChevronDown size={24} />
        </a>
      </section>

      <div id="countdown">
        <Countdown t={t} />
      </div>
      <Story t={t} />
      <Timeline t={t} />
      <Venue t={t} />
      <Gallery t={t} />
      <Actions t={t} />

      <footer className="footer-section">
        <p className="arabic reveal">اللهم بارك لهما وبارك عليهما واجمع بينهما في خير</p>
        <h2 className="reveal">{t.dua}</h2>
        <span className="reveal">Almas & Nizar · 21 May 2026</span>
      </footer>
    </main>
  );
}
