"use client";

import dynamic from "next/dynamic";

// Dynamic imports to avoid SSR issues with GSAP
const SmoothScrollProvider = dynamic(
  () => import("@/components/scroll/SmoothScrollProvider"),
  { ssr: false }
);
const HeroSection = dynamic(
  () => import("@/components/scroll/HeroSection"),
  { ssr: false }
);
const CategoryFilmSection = dynamic(
  () => import("@/components/scroll/CategoryFilmSection"),
  { ssr: false }
);
const BrandSections = dynamic(
  () => import("@/components/scroll/BrandSections"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="nex-dark-page">
        {/* Sticky Brand Nav — managed by BrandSections useEffect */}
        <nav id="brandnav" className="brandnav">
          <span className="brandnav-mark">THE NEX MALL</span>
          <div className="brandnav-links">
            <a href="#story">Story</a>
            <a href="#craft">Craft</a>
            <a href="#specs">Details</a>
            <a href="#gallery">Gallery</a>
          </div>
          <a className="brandnav-cta" href="#reserve">
            Visit Now
          </a>
        </nav>

        <main>
          {/* ── ACT 1: Cinematic Hero (pinned 300vh) ── */}
          <HeroSection />

          {/* ── ACT 2: Category Showcase Film (pinned 200vh) ── */}
          <CategoryFilmSection />

          {/* ── ACT 3: Full Brand Homepage (normal scroll) ── */}
          <BrandSections />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}