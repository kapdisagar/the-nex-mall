"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: "Fashion", icon: "👗", color: "#D4A843" },
  { name: "Bags", icon: "👜", color: "#A8A8A8" },
  { name: "Footwear", icon: "👟", color: "#7C3AED" },
  { name: "Watches", icon: "⌚", color: "#D4A843" },
  { name: "Beauty", icon: "✨", color: "#EC4899" },
  { name: "Gifts", icon: "🎁", color: "#F59E0B" },
  { name: "Jewellery", icon: "💎", color: "#F0C860" },
  { name: "More", icon: "✦", color: "#6B7280" },
];

const titleText = "THE NEX MALL";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const chars = titleRef.current?.querySelectorAll(".char") ?? [];
      gsap.set(chars, { y: 120, opacity: 0, rotateX: -30 });
      gsap.to(chars, {
        y: 0, opacity: 1, rotateX: 0,
        duration: 1.4, stagger: 0.035, ease: "power4.out", delay: 0.2,
      });

      gsap.from([subtitleRef.current, taglineRef.current], {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", delay: 0.8,
      });

      gsap.from(ctaRef.current, {
        y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1.4,
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      tl.to(
        [titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current],
        { scale: 1.08, opacity: 0, y: -40, duration: 0.3 }, 0
      ).to(
        iconsRef.current, { y: 0, opacity: 1, duration: 0.35 }, 0.12
      ).to(
        glowRef.current, { opacity: 0.9, scale: 1.4, duration: 0.25 }, 0.3
      ).to(glowRef.current, { opacity: 0.3, scale: 0.9, duration: 0.3 }, 0.55
      ).to(stage, { opacity: 0, scale: 0.98, filter: "brightness(0.3)", duration: 0.3 }, 0.78);

      gsap.to(scrollCueRef.current, {
        opacity: 0, scrollTrigger: { trigger: section, start: "top top", end: "+=300", scrub: true },
      });

      const iconEls = iconsRef.current?.querySelectorAll(".cat-icon") ?? [];
      iconEls.forEach((el, i) => {
        gsap.to(el, {
          y: -12, duration: 2 + i * 0.15, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.15,
        });
      });

      // Particle canvas animation
      const canvas = particleRef.current;
      if (!canvas) return;
      const pctx = canvas.getContext("2d");
      if (!pctx) return;
      const particles: { x: number; y: number; vx: number; vy: number; s: number; o: number }[] = [];
      let particleAnim: number;

      const resize = () => {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
      };
      resize();
      window.addEventListener("resize", resize);

      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          s: Math.random() * 2 + 0.5,
          o: Math.random() * 0.4 + 0.1,
        });
      }

      function drawParticles() {
        if (!canvas || !pctx) return;
        pctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          pctx.beginPath();
          pctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
          pctx.fillStyle = `rgba(212,168,67,${p.o})`;
          pctx.fill();
        });
        particleAnim = requestAnimationFrame(drawParticles);
      }
      drawParticles();

      return () => {
        cancelAnimationFrame(particleAnim);
        window.removeEventListener("resize", resize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="nex-hero-track">
      <canvas ref={particleRef} className="nex-particles" />
      <div ref={stageRef} className="nex-hero-stage">
        <div className="nex-hero-bg" />
        <div ref={glowRef} className="nex-glow-blob" />
        <div className="nex-grain" />
        <div className="nex-vignette" />

        <div ref={titleRef} className="nex-hero-title" aria-label={titleText}>
          {titleText.split("").map((ch, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <p ref={subtitleRef} className="nex-hero-sub">
          India&rsquo;s Most Luxurious Shopping Destination
        </p>

        <p ref={taglineRef} className="nex-hero-tagline">
          <span className="nex-gold">500+</span> Premium Brands &nbsp;·&nbsp;
          <span className="nex-gold">8</span> Iconic Floors
        </p>

        <div ref={ctaRef} className="nex-hero-cta">
          <Link href="/products" className="nex-btn-primary">Explore Collection</Link>
          <Link href="#story" className="nex-btn-ghost">Our Story</Link>
        </div>

        <div ref={iconsRef} className="nex-category-icons" style={{ opacity: 0, transform: "translateY(40px)" }}>
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-icon" style={{ "--cat-color": cat.color } as React.CSSProperties}>
              <span className="cat-emoji">{cat.icon}</span>
              <span className="cat-label">{cat.name}</span>
            </div>
          ))}
        </div>

        <div ref={scrollCueRef} className="nex-scroll-cue">
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
