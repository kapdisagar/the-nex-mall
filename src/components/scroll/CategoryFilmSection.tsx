"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE = [
  {
    slug: "fashion",
    label: "01 — Fashion",
    headline: "Wear what\nthe world\nwatches.",
    sub: "Curated collections from the world's finest ateliers.",
    img: "/img/fashion-detail.png",
  },
  {
    slug: "jewellery",
    label: "02 — Jewellery",
    headline: "Each piece,\na story\nuntold.",
    sub: "Fine jewellery crafted for moments that last forever.",
    img: "/img/jewellery-detail.png",
  },
  {
    slug: "watch-accessories",
    label: "03 — Watches",
    headline: "Time,\nrefined\nto art.",
    sub: "Precision timepieces from heritage manufactures.",
    img: "/img/watches-luxury.png",
  },
];

export default function CategoryFilmSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const totalSlides = SHOWCASE.length;

      // Single timeline for all slides
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
        paused: true,
      });

      // Prepare all slides
      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        const img = slide.querySelector(".cf-img");
        const label = slide.querySelectorAll(".cf-label");
        const headline = slide.querySelectorAll(".cf-headline-line");
        const sub = slide.querySelectorAll(".cf-sub");
        const cta = slide.querySelectorAll(".cf-cta");

        if (i > 0) gsap.set(slide, { opacity: 0, y: 40 });
        gsap.set(headline, { y: 80, opacity: 0 });
        gsap.set(label, { opacity: 0, y: 20 });
        gsap.set(sub, { opacity: 0, y: 20 });
        gsap.set(cta, { opacity: 0, y: 20 });
      });

      // First slide visible
      gsap.set(slidesRef.current[0], { opacity: 1 });

      // Progress bar start
      gsap.set(progressBarRef.current, { width: "0%" });

      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        const startFrac = i / totalSlides;
        const endFrac = (i + 1) / totalSlides;

        const img = slide.querySelector(".cf-img");
        const label = slide.querySelectorAll(".cf-label");
        const headline = slide.querySelectorAll(".cf-headline-line");
        const sub = slide.querySelectorAll(".cf-sub");
        const cta = slide.querySelectorAll(".cf-cta");

        // Enter
        tl.to(slide, { opacity: 1, y: 0, duration: 0.1 }, startFrac)
          .to(label, { opacity: 1, y: 0, duration: 0.04 }, startFrac + 0.02)
          .to(headline, { y: 0, opacity: 1, stagger: 0.02, duration: 0.05 }, startFrac + 0.04)
          .to(sub, { opacity: 1, y: 0, duration: 0.04 }, startFrac + 0.08)
          .to(cta, { opacity: 1, y: 0, duration: 0.04 }, startFrac + 0.1)

        // Image parallax
        if (img) {
          tl.fromTo(img, { scale: 1.15, opacity: 0.6 }, { scale: 1.0, opacity: 1, duration: 0.25 }, startFrac);
        }

        // Progress
        tl.to(progressBarRef.current, { width: `${((i + 1) / totalSlides) * 100}%`, duration: 0.95 / totalSlides }, startFrac);

        // Exit (unless last)
        if (i < totalSlides - 1) {
          tl.to(slide, { opacity: 0, y: -30, duration: 0.08 }, endFrac - 0.03);
        }
      });

      // Last slide lingers
      tl.to(stage, { opacity: 1 }, 1);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cf-track">
      <div ref={stageRef} className="cf-stage">
        <div className="cf-progress-bg">
          <div ref={progressBarRef} className="cf-progress-fill" />
        </div>

        <div className="cf-chapter-tag">The Collection</div>

        {SHOWCASE.map((item, i) => (
          <div key={i} ref={(el) => { slidesRef.current[i] = el; }} className="cf-slide">
            <div className="cf-image-side">
              <div className="cf-img-wrap">
                <Image src={item.img} alt={item.label} fill className="cf-img object-cover" priority={i === 0} />
                <div className="cf-img-overlay" />
              </div>
            </div>
            <div className="cf-text-side">
              <p className="cf-label">{item.label}</p>
              <h2 className="cf-headline">
                {item.headline.split("\n").map((line, j) => (
                  <span key={j} className="cf-headline-line">{line}</span>
                ))}
              </h2>
              <p className="cf-sub">{item.sub}</p>
              <Link href={`/category/${item.slug}`} className="cf-cta">
                Explore {item.label.split("— ")[1]} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
