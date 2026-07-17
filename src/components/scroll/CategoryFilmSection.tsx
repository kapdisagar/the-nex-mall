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
      if (!section) return;

      const totalSlides = SHOWCASE.length;

      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;

        const img = slide.querySelector(".cf-img");
        const label = slide.querySelector(".cf-label");
        const headline = slide.querySelectorAll(".cf-headline-line");
        const sub = slide.querySelector(".cf-sub");
        const cta = slide.querySelector(".cf-cta");

        const startFrac = i / totalSlides;
        const endFrac = (i + 1) / totalSlides;
        const midFrac = (startFrac + endFrac) / 2;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        // Each slide: enter at startFrac, peak at midFrac, exit at endFrac
        if (i === 0) {
          // First slide starts visible
          gsap.set(slide, { opacity: 1 });
        } else {
          gsap.set(slide, { opacity: 0, y: 30 });
          // Enter
          tl.to(
            slide,
            { opacity: 1, y: 0, duration: 0.08 },
            startFrac - 0.02
          );
        }

        // Animate headline lines in
        gsap.set(headline, { y: 60, opacity: 0 });
        tl.to(
          headline,
          { y: 0, opacity: 1, stagger: 0.02, duration: 0.06 },
          startFrac + 0.01
        );
        tl.to(
          [label, sub, cta],
          { opacity: 1, y: 0, duration: 0.05 },
          startFrac + 0.04
        );

        // Image parallax
        tl.fromTo(
          img,
          { scale: 1.1, opacity: 0.7 },
          { scale: 1.0, opacity: 1, duration: 0.2 },
          startFrac
        );

        // Exit (not last)
        if (i < totalSlides - 1) {
          tl.to(
            slide,
            { opacity: 0, y: -20, duration: 0.06 },
            endFrac - 0.02
          );
        }

        // Progress bar
        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            {
              width: `${((i + 1) / totalSlides) * 100}%`,
              duration: 1 / totalSlides,
            },
            startFrac
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cf-track">
      <div ref={stageRef} className="cf-stage">
        {/* Progress bar */}
        <div className="cf-progress-bg">
          <div ref={progressBarRef} className="cf-progress-fill" />
        </div>

        {/* Chapter label */}
        <div className="cf-chapter-tag">The Collection</div>

        {/* Slides */}
        {SHOWCASE.map((item, i) => (
          <div
            key={i}
            ref={(el) => { slidesRef.current[i] = el; }}
            className="cf-slide"
            style={i === 0 ? {} : { opacity: 0, transform: "translateY(30px)" }}
          >
            {/* Image side */}
            <div className="cf-image-side">
              <div className="cf-img-wrap">
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="cf-img object-cover"
                  priority={i === 0}
                />
                <div className="cf-img-overlay" />
              </div>
            </div>

            {/* Text side */}
            <div className="cf-text-side">
              <p
                className="cf-label"
                style={i !== 0 ? { opacity: 0, transform: "translateY(20px)" } : {}}
              >
                {item.label}
              </p>
              <h2 className="cf-headline">
                {item.headline.split("\n").map((line, j) => (
                  <span
                    key={j}
                    className="cf-headline-line"
                    style={i !== 0 ? { opacity: 0, transform: "translateY(60px)" } : {}}
                  >
                    {line}
                  </span>
                ))}
              </h2>
              <p
                className="cf-sub"
                style={i !== 0 ? { opacity: 0, transform: "translateY(20px)" } : {}}
              >
                {item.sub}
              </p>
              <Link
                href={`/category/${item.slug}`}
                className="cf-cta"
                style={i !== 0 ? { opacity: 0, transform: "translateY(20px)" } : {}}
              >
                Explore {item.label.split("— ")[1]} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
