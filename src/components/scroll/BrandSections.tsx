"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { num: "500+", label: "Premium Brands" },
  { num: "50K+", label: "Authentic Products" },
  { num: "8", label: "Iconic Floors" },
  { num: "1", label: "Destination" },
];

const SPECS = [
  { spec: "Founded", value: "2018, Surat" },
  { spec: "Total Area", value: "4.2 Lakh sq. ft." },
  { spec: "Premium Brands", value: "500+ curated labels" },
  { spec: "Dining", value: "32 gourmet restaurants" },
  { spec: "Parking", value: "3,000+ capacity" },
  { spec: "Experience Zones", value: "Beauty · Wellness · Events" },
];

export default function BrandSections() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("bp-in");
        }),
      { threshold: 0.12 }
    );

    const els = containerRef.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el) => io.observe(el));

    const revealNow = () => {
      containerRef.current
        ?.querySelectorAll("[data-reveal]:not(.bp-in)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.92 && r.bottom > 0)
            el.classList.add("bp-in");
        });
    };
    window.addEventListener("scroll", revealNow, { passive: true });
    revealNow();

    const nav = document.getElementById("brandnav");
    const hero = document.querySelector(".nex-hero-track") as HTMLElement | null;
    const onScroll = () => {
      const heroH = hero ? hero.offsetHeight : window.innerHeight * 3;
      nav?.classList.toggle("brandnav-on", window.scrollY > heroH * 0.88);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", revealNow);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="bp-root">
      <section className="bp bp-manifesto" id="story">
        <div data-reveal>
          <p className="bp-kicker">The Nex Mall</p>
          <h2>One mall.<br />Every desire.</h2>
        </div>
      </section>

      <section className="bp">
        <div className="bp-split">
          <div data-reveal>
            <p className="bp-kicker">Our Story</p>
            <h2>Built for those<br />who want more.</h2>
            <p className="bp-lead">
              We didn&rsquo;t just build a mall. We built a world — where every corridor is an edit, every floor a destination.
            </p>
          </div>
          <div data-reveal className="bp-img-wrap">
            <Image src="/img/mall-exterior.png" alt="The Nex Mall exterior" fill className="bp-img object-cover" />
          </div>
        </div>
      </section>

      <section className="bp" id="craft">
        <div className="bp-split bp-flip">
          <div data-reveal>
            <p className="bp-kicker">Craft — 01</p>
            <h2>Fashion that<br />speaks first.</h2>
            <p className="bp-lead">
              Every stitch sourced from ateliers across Milan, Paris, and Mumbai. The Nex Mall is their Indian home.
            </p>
          </div>
          <div data-reveal className="bp-img-wrap">
            <Image src="/img/fashion-detail.png" alt="Fashion detail" fill className="bp-img object-cover" />
          </div>
        </div>
      </section>

      <section className="bp">
        <div className="bp-split">
          <div data-reveal>
            <p className="bp-kicker">Craft — 02</p>
            <h2>Jewellery that<br />outlasts time.</h2>
            <p className="bp-lead">
              Certified diamonds, heritage gold, and artisan silver — all under one roof. Authentication guaranteed.
            </p>
          </div>
          <div data-reveal className="bp-img-wrap">
            <Image src="/img/jewellery-detail.png" alt="Jewellery" fill className="bp-img object-cover" />
          </div>
        </div>
      </section>

      <section className="bp">
        <div className="bp-stats">
          {STATS.map((s, i) => (
            <div key={i} data-reveal>
              <div className="bp-stat-num">{s.num}</div>
              <div className="bp-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bp bp-specs" id="specs">
        <div data-reveal>
          <p className="bp-kicker" style={{ textAlign: "center" }}>The Details</p>
          <table>
            <tbody>
              {SPECS.map((row, i) => (
                <tr key={i}>
                  <td>{row.spec}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bp bp-quote">
        <div data-reveal>
          <blockquote>
            &ldquo;The Nex Mall isn&rsquo;t a mall. It&rsquo;s a mood.&rdquo;
          </blockquote>
          <cite>— Early shopper, Surat</cite>
        </div>
      </section>

      <section className="bp" id="gallery">
        <p data-reveal className="bp-kicker" style={{ marginBottom: "2rem" }}>Gallery</p>
        <div className="bp-gallery">
          <div data-reveal className="bp-g1 bp-img-wrap">
            <Image src="/img/hero-mall.png" alt="Mall interior" fill className="bp-img object-cover" />
          </div>
          <div data-reveal className="bp-g2 bp-img-wrap">
            <Image src="/img/lifestyle-shopping.png" alt="Shopping experience" fill className="bp-img object-cover" />
          </div>
          <div data-reveal className="bp-g3 bp-img-wrap">
            <Image src="/img/watches-luxury.png" alt="Luxury watches" fill className="bp-img object-cover" />
          </div>
          <div data-reveal className="bp-g4 bp-img-wrap">
            <Image src="/img/mall-exterior.png" alt="Mall exterior" fill className="bp-img object-cover" />
          </div>
        </div>
      </section>

      <section className="bp bp-ctaband" id="reserve">
        <div data-reveal>
          <h2>Your world,<br />waiting inside.</h2>
          <Link href="/products" className="nex-btn-primary" style={{ marginTop: "2rem" }}>
            Start Exploring
          </Link>
        </div>
      </section>

      <footer className="bp-footer">
        <div className="bp-footer-cols">
          <div>
            <span className="bp-footer-brand">THE NEX MALL</span>
            <p className="bp-lead" style={{ marginTop: "1rem", fontSize: "13px" }}>
              India&rsquo;s most luxurious shopping destination. Curated for the discerning few.
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#story">Our Story</a>
            <a href="#craft">Craft</a>
            <a href="#specs">Details</a>
            <a href="#gallery">Gallery</a>
          </div>
          <div>
            <h4>Shop</h4>
            <Link href="/category/fashion">Fashion</Link>
            <Link href="/category/jewellery">Jewellery</Link>
            <Link href="/category/watch-accessories">Watches</Link>
            <Link href="/products">All Products</Link>
          </div>
          <div>
            <h4>Visit</h4>
            <a href="#">Location</a>
            <a href="#">Parking</a>
            <a href="#">Events</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <p className="bp-footer-fine">
          &copy; 2026 The Nex Mall. Premium Shopping Destination. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
