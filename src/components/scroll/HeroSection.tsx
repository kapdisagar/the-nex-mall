"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: "Fashion", emoji: "👗", color: "#0D9488" },
  { name: "Bags", emoji: "👜", color: "#1E40AF" },
  { name: "Footwear", emoji: "👟", color: "#7C3AED" },
  { name: "Watches", emoji: "⌚", color: "#C8A96E" },
  { name: "Beauty", emoji: "✨", color: "#EC4899" },
  { name: "Gifts", emoji: "🎁", color: "#F59E0B" },
  { name: "Jewellery", emoji: "💎", color: "#C8A96E" },
  { name: "More", emoji: "🏪", color: "#6B7280" },
];

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      // ── Intro: title letters stagger in ──
      const chars = titleRef.current?.querySelectorAll(".char") ?? [];
      gsap.set(chars, { y: 80, opacity: 0 });
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "power3.out",
        delay: 0.3,
      });

      // subtitle + tagline fade in
      gsap.from([subtitleRef.current, taglineRef.current], {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.9,
      });

      // CTA fade in
      gsap.from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.4,
      });

      // ── Scroll-driven timeline (pinned) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Phase 1 (0–0.3): title zooms + fades, icons slide up
      tl.to(
        [titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current],
        { scale: 1.06, opacity: 0, duration: 0.25 },
        0
      ).to(
        iconsRef.current,
        { y: 0, opacity: 1, duration: 0.3 },
        0.1
      );

      // Phase 2 (0.3–0.7): icons hover, glow pulses
      tl.to(
        glowRef.current,
        { opacity: 0.8, scale: 1.3, duration: 0.3 },
        0.25
      ).to(glowRef.current, { opacity: 0.4, scale: 1.0, duration: 0.3 }, 0.55);

      // Phase 3 (0.7–1): everything fades to dark for transition
      tl.to(stage, { opacity: 0, duration: 0.25 }, 0.8);

      // Scroll cue fades out on any scroll
      gsap.to(scrollCueRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });

      // Category icon individual floats
      const iconEls = iconsRef.current?.querySelectorAll(".cat-icon") ?? [];
      iconEls.forEach((el, i) => {
        gsap.to(el, {
          y: -10,
          duration: 1.8 + i * 0.15,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "THE NEX MALL";

  return (
    <section ref={sectionRef} className="nex-hero-track">
      <div ref={stageRef} className="nex-hero-stage">
        {/* Background image */}
        <div className="nex-hero-bg" />

        {/* Glow blob */}
        <div ref={glowRef} className="nex-glow-blob" />

        {/* Film grain overlay */}
        <div className="nex-grain" />

        {/* Vignette */}
        <div className="nex-vignette" />

        {/* Main title */}
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
          <span className="nex-gold">500+</span> Premium Brands &nbsp;·&nbsp;{" "}
          <span className="nex-gold">8</span> Iconic Floors
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="nex-hero-cta">
          <Link href="/products" className="nex-btn-primary">
            Explore Collection
          </Link>
          <Link href="#story" className="nex-btn-ghost">
            Our Story
          </Link>
        </div>

        {/* Category Icons — revealed on scroll */}
        <div
          ref={iconsRef}
          className="nex-category-icons"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          {CATEGORIES.map((cat, i) => (
            <div key={i} className="cat-icon" style={{ "--cat-color": cat.color } as React.CSSProperties}>
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className="nex-scroll-cue">
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
