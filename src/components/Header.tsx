"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Fashion", slug: "fashion" },
    { name: "Bags & Accessories", slug: "bags-accessories" },
    { name: "Footwear", slug: "footwear" },
    { name: "Watch & Accessories", slug: "watch-accessories" },
    { name: "Beauty & Wellness", slug: "beauty-wellness" },
    { name: "Gift & Lifestyle", slug: "gift-lifestyle" },
    { name: "Jewellery", slug: "jewellery" },
    { name: "Service & More", slug: "service-more" },
  ];

  return (
    <header className="bg-nex-dark text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-nex-dark/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm text-white/70">
          <span>🎉 Grand Opening Sale - Up to 50% OFF!</span>
          <div className="hidden md:flex items-center gap-4">
            <span>📞 +91 98765 43210</span>
            <span>✉️ info@thenexmall.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all">
                <span className="text-2xl font-black tracking-tighter">NEX</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-nex-gold rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider">THE NEX</h1>
              <p className="text-[10px] tracking-[0.3em] text-white/60 uppercase">
                Live With Nex
              </p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full py-2.5 px-4 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm">
              <Heart size={18} />
              <span className="hidden lg:inline">Wishlist</span>
            </button>
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <ShoppingCart size={18} />
              <span className="hidden lg:inline">Cart</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-nex-gold text-nex-dark text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 py-2">
            <li>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full hover:bg-white/10 text-sm font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3 py-1.5 rounded-full hover:bg-white/10 text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-nex-dark border-t border-white/10 animate-slide-in">
          <div className="p-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block px-4 py-2 rounded-lg hover:bg-white/10 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 rounded-lg hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
