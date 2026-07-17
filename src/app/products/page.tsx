"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, ShoppingCart, Heart, Star, SlidersHorizontal, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string | null;
  image: string | null;
  rating: string;
  reviews: number;
  isNew: boolean;
  featured: boolean;
  inStock: boolean;
  categoryId: number;
}

const CATEGORIES = [
  { id: 0, label: "All", emoji: "✦" },
  { id: 1, label: "Fashion", emoji: "👗" },
  { id: 2, label: "Bags", emoji: "👜" },
  { id: 3, label: "Footwear", emoji: "👠" },
  { id: 4, label: "Watches", emoji: "⌚" },
  { id: 5, label: "Beauty", emoji: "✨" },
  { id: 6, label: "Jewellery", emoji: "💎" },
];

const SORT_OPTIONS = ["Featured", "Price: Low → High", "Price: High → Low", "Newest", "Best Rated"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortBy, setSortBy] = useState("Featured");
  const [showSort, setShowSort] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setFiltered(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter + sort
  useEffect(() => {
    let result = [...products];
    if (activeCategory !== 0) result = result.filter((p) => p.categoryId === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sortBy === "Price: Low → High") result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sortBy === "Price: High → Low") result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    else if (sortBy === "Newest") result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
    else if (sortBy === "Best Rated") result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    setFiltered(result);
  }, [products, search, activeCategory, sortBy]);

  // Scroll reveal for grid cards
  useEffect(() => {
    if (loading) return;
    const cards = gridRef.current?.querySelectorAll(".product-card");
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${(i % 5) * 60}ms`;
      io.observe(c);
    });
    return () => io.disconnect();
  }, [filtered, loading]);

  // Sticky nav reveal on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const heroH = heroRef.current?.offsetHeight || 500;
      if (window.scrollY > heroH * 0.6) {
        navRef.current.classList.add("nav-on");
      } else {
        navRef.current.classList.remove("nav-on");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── GLOBAL STYLES for this dark luxury page ── */}
      <style>{`
        .products-page {
          background: #07070a;
          color: #f0ede8;
          min-height: 100vh;
          font-family: 'Inter', 'Outfit', sans-serif;
        }

        /* Sticky nav */
        .prod-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 90;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 4vw;
          background: rgba(7,7,10,0.82);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(200,169,110,0.1);
          opacity: 0; pointer-events: none;
          transform: translateY(-10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .prod-nav.nav-on { opacity: 1; pointer-events: auto; transform: none; }
        .prod-nav-mark {
          font-size: 12px; letter-spacing: 0.4em; text-indent: 0.4em;
          color: #C8A96E; text-transform: uppercase; font-weight: 600;
          text-decoration: none;
        }
        .prod-nav-search {
          display: flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(200,169,110,0.2);
          border-radius: 100px;
          padding: 8px 18px;
        }
        .prod-nav-search input {
          background: none; border: none; outline: none;
          color: #f0ede8; font-size: 13px; width: 200px;
        }
        .prod-nav-search input::placeholder { color: rgba(240,237,232,0.35); }

        /* Hero */
        .products-hero {
          position: relative; height: 70vh; overflow: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding-bottom: 8vh;
        }
        .products-hero-img {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #07070a 0%, #0f0e14 50%, #07070a 100%);
        }
        .products-hero-img img { object-fit: cover; opacity: 0.45; }
        .products-hero-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, #07070a 100%);
        }
        .products-hero-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 35%;
          background: linear-gradient(to bottom, transparent, #07070a);
        }
        .products-hero-content {
          position: relative; z-index: 2; text-align: center;
        }
        .products-hero-kicker {
          font-size: 11px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #C8A96E; margin-bottom: 20px;
        }
        .products-hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(52px, 9vw, 130px);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 0.92;
          background: linear-gradient(135deg, #E8CC8A 0%, #C8A96E 50%, #a0834f 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .products-hero-sub {
          margin-top: 18px; font-size: clamp(13px, 1.2vw, 16px);
          color: rgba(240,237,232,0.48); letter-spacing: 0.1em;
        }

        /* Back link */
        .back-link {
          position: absolute; top: 28px; left: 4vw; z-index: 10;
          display: flex; align-items: center; gap: 8px;
          color: rgba(240,237,232,0.5); text-decoration: none;
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          transition: color 0.3s;
        }
        .back-link:hover { color: #C8A96E; }

        /* Category bar */
        .cat-bar {
          display: flex; align-items: center; gap: 8px;
          overflow-x: auto; padding: 0 4vw 0;
          scrollbar-width: none;
          border-bottom: 1px solid rgba(240,237,232,0.07);
          background: #07070a;
          position: sticky; top: 0; z-index: 80;
        }
        .cat-bar::-webkit-scrollbar { display: none; }
        .cat-btn {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 6px;
          padding: 14px 20px;
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(240,237,232,0.45);
          border-bottom: 2px solid transparent;
          cursor: pointer; background: none; border-top: none; border-left: none; border-right: none;
          transition: color 0.25s, border-color 0.25s;
          white-space: nowrap;
        }
        .cat-btn:hover { color: rgba(240,237,232,0.85); }
        .cat-btn.active { color: #C8A96E; border-bottom-color: #C8A96E; }

        /* Toolbar */
        .prod-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 4vw 20px;
          max-width: 1500px; margin: 0 auto;
        }
        .prod-count {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(240,237,232,0.35);
        }
        .sort-btn {
          display: flex; align-items: center; gap-6px;
          gap: 6px; padding: 10px 18px;
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(240,237,232,0.5);
          border: 1px solid rgba(240,237,232,0.1);
          border-radius: 100px; background: none; cursor: pointer;
          transition: all 0.25s;
          position: relative;
        }
        .sort-btn:hover { color: #C8A96E; border-color: rgba(200,169,110,0.3); }
        .sort-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #111117; border: 1px solid rgba(200,169,110,0.2);
          border-radius: 12px; overflow: hidden;
          min-width: 200px; z-index: 100;
        }
        .sort-option {
          display: block; padding: 12px 18px;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(240,237,232,0.5); cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .sort-option:hover { background: rgba(200,169,110,0.1); color: #C8A96E; }
        .sort-option.active { color: #C8A96E; }

        /* Product grid */
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          padding: 0 4vw 16vh;
          max-width: 1500px; margin: 0 auto;
        }

        /* Product card */
        .product-card {
          background: #0d0d12;
          border: 1px solid rgba(240,237,232,0.07);
          border-radius: 16px; overflow: hidden;
          cursor: pointer; text-decoration: none; color: inherit;
          display: flex; flex-direction: column;
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(.2,.6,.2,1),
                      transform 0.7s cubic-bezier(.2,.6,.2,1),
                      border-color 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
          border-color: rgba(200,169,110,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,169,110,0.15);
          transform: translateY(-4px) !important;
        }
        .card-img-wrap {
          position: relative; height: 220px; overflow: hidden;
          background: linear-gradient(135deg, #111117, #0a0a0f);
          flex-shrink: 0;
        }
        .card-img-wrap img { object-fit: cover; transition: transform 0.6s ease; }
        .product-card:hover .card-img-wrap img { transform: scale(1.06); }
        .card-placeholder {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          font-size: 52px; opacity: 0.12;
        }
        .card-badge {
          position: absolute; top: 12px; left: 12px;
          display: flex; flex-direction: column; gap: 6px; z-index: 2;
        }
        .badge-new {
          padding: 4px 10px; background: #C8A96E; color: #07070a;
          font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; border-radius: 100px;
        }
        .badge-disc {
          padding: 4px 10px; background: #ef4444; color: #fff;
          font-size: 10px; font-weight: 700; border-radius: 100px;
        }
        .card-wish {
          position: absolute; top: 12px; right: 12px; z-index: 2;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(7,7,10,0.7); backdrop-filter: blur(8px);
          border: 1px solid rgba(240,237,232,0.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(240,237,232,0.4); cursor: pointer;
          opacity: 0; transition: opacity 0.3s, color 0.3s;
        }
        .product-card:hover .card-wish { opacity: 1; }
        .card-wish:hover { color: #ef4444 !important; }
        .card-quick-add {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 12px;
          background: linear-gradient(to top, rgba(7,7,10,0.95), transparent);
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(.2,.6,.2,1);
        }
        .product-card:hover .card-quick-add { transform: translateY(0); }
        .quick-add-btn {
          width: 100%; padding: 10px;
          background: #C8A96E; color: #07070a;
          font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; border: none; border-radius: 8px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: background 0.25s;
        }
        .quick-add-btn:hover { background: #E8CC8A; }
        .card-info { padding: 18px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .card-name {
          font-size: 14px; font-weight: 600; line-height: 1.4;
          color: #f0ede8; letter-spacing: -0.01em;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-stars { display: flex; align-items: center; gap: 5px; }
        .card-stars-row { display: flex; gap: 2px; }
        .card-review-count { font-size: 11px; color: rgba(240,237,232,0.3); }
        .card-price { display: flex; align-items: baseline; gap: 8px; margin-top: auto; }
        .card-price-main { font-size: 18px; font-weight: 700; color: #E8CC8A; letter-spacing: -0.02em; }
        .card-price-orig { font-size: 13px; color: rgba(240,237,232,0.3); text-decoration: line-through; }

        /* Empty */
        .prod-empty {
          text-align: center; padding: 16vh 4vw;
          color: rgba(240,237,232,0.3);
        }
        .prod-empty-icon { font-size: 64px; margin-bottom: 24px; }
        .prod-empty-title { font-size: 24px; font-weight: 700; color: #f0ede8; margin-bottom: 10px; }

        /* Skeleton */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px; padding: 0 4vw 16vh; max-width: 1500px; margin: 0 auto;
        }
        .skeleton-card {
          background: #0d0d12; border: 1px solid rgba(240,237,232,0.05);
          border-radius: 16px; overflow: hidden;
        }
        .skeleton-img { height: 220px; background: linear-gradient(90deg, #111117 25%, #1a1a22 50%, #111117 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        .skeleton-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
        .skeleton-line { height: 12px; border-radius: 6px; background: linear-gradient(90deg, #111117 25%, #1a1a22 50%, #111117 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* Section divider */
        .prod-divider {
          width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, rgba(200,169,110,0.4), transparent);
          margin: 0 auto 8px;
        }
      `}</style>

      <div className="products-page">
        {/* ── Sticky Nav (appears after hero) ── */}
        <nav ref={navRef} className="prod-nav">
          <Link href="/" className="prod-nav-mark">← The Nex Mall</Link>
          <div className="prod-nav-search">
            <Search size={14} style={{ color: "rgba(200,169,110,0.6)" }} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </nav>

        {/* ── Hero ── */}
        <div ref={heroRef} className="products-hero">
          <Link href="/" className="back-link">
            <ArrowLeft size={14} />
            Back
          </Link>

          <div className="products-hero-img">
            <Image
              src="/img/products-hero.png"
              alt="The Nex Mall Products"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="products-hero-vignette" />
          <div className="products-hero-bottom" />

          <div className="products-hero-content">
            <p className="products-hero-kicker">The Nex Mall — Curated Collection</p>
            <h1 className="products-hero-title">Shop</h1>
            <p className="products-hero-sub">India's most luxurious selection, all in one place</p>
          </div>
        </div>

        {/* ── Category Filter Bar ── */}
        <div className="cat-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`cat-btn ${activeCategory === c.id ? "active" : ""}`}
              onClick={() => setActiveCategory(c.id)}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="prod-toolbar">
          <p className="prod-count">
            {loading ? "Loading..." : `${filtered.length} Products`}
          </p>

          {/* Inline search (visible before nav appears) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(240,237,232,0.1)",
              borderRadius: "100px", padding: "8px 16px"
            }}>
              <Search size={13} style={{ color: "rgba(200,169,110,0.5)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "none", border: "none", outline: "none",
                  color: "#f0ede8", fontSize: "12px", width: "140px",
                  letterSpacing: "0.05em"
                }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <button
                className="sort-btn"
                onClick={() => setShowSort((s) => !s)}
              >
                <SlidersHorizontal size={13} />
                {sortBy}
                <ChevronDown size={12} style={{ marginLeft: "2px", transform: showSort ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
              </button>
              {showSort && (
                <div className="sort-dropdown">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o}
                      className={`sort-option ${sortBy === o ? "active" : ""}`}
                      onClick={() => { setSortBy(o); setShowSort(false); }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Product Grid ── */}
        {loading ? (
          <div className="skeleton-grid">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line" style={{ width: "70%" }} />
                  <div className="skeleton-line" style={{ width: "45%" }} />
                  <div className="skeleton-line" style={{ width: "30%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="prod-empty">
            <div className="prod-empty-icon">✦</div>
            <h3 className="prod-empty-title">No products found</h3>
            <p>Try a different category or search term</p>
          </div>
        ) : (
          <div ref={gridRef} className="prod-grid">
            {filtered.map((product) => {
              const discount = product.originalPrice
                ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
                : 0;
              const rating = parseFloat(product.rating || "4");

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="product-card"
                >
                  {/* Image */}
                  <div className="card-img-wrap">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="card-placeholder">🛍️</div>
                    )}

                    {/* Badges */}
                    <div className="card-badge">
                      {product.isNew && <span className="badge-new">New</span>}
                      {discount > 0 && <span className="badge-disc">-{discount}%</span>}
                    </div>

                    {/* Wishlist */}
                    <button
                      className="card-wish"
                      onClick={(e) => e.preventDefault()}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={14} />
                    </button>

                    {/* Quick Add */}
                    <div className="card-quick-add">
                      <button
                        className="quick-add-btn"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingCart size={13} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="card-info">
                    <p className="card-name">{product.name}</p>

                    <div className="card-stars">
                      <div className="card-stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            style={{
                              fill: i < Math.floor(rating) ? "#C8A96E" : "transparent",
                              color: i < Math.floor(rating) ? "#C8A96E" : "rgba(240,237,232,0.2)"
                            }}
                          />
                        ))}
                      </div>
                      <span className="card-review-count">({product.reviews})</span>
                    </div>

                    <div className="card-price">
                      <span className="card-price-main">₹{Number(product.price).toLocaleString("en-IN")}</span>
                      {product.originalPrice && (
                        <span className="card-price-orig">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Footer strip ── */}
        {!loading && filtered.length > 0 && (
          <div style={{ textAlign: "center", padding: "0 0 10vh" }}>
            <div className="prod-divider" />
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,237,232,0.2)" }}>
              The Nex Mall · Premium Shopping
            </p>
          </div>
        )}
      </div>
    </>
  );
}
