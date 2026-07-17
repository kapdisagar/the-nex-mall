"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Search, Heart, ChevronDown, User } from "lucide-react";

// Category data with subcategories for mega menu
const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Kids' Clothing", slug: "kids-clothing" },
      { name: "Traditional Wear", slug: "traditional-wear" },
      { name: "Innerwear & Sleepwear", slug: "innerwear-sleepwear" },
    ]
  },
  {
    name: "Bags & Accessories",
    slug: "bags-accessories",
    subcategories: [
      { name: "Handbags", slug: "handbags" },
      { name: "Backpacks", slug: "backpacks" },
      { name: "Wallets", slug: "wallets" },
      { name: "Belts", slug: "belts" },
      { name: "Travel Bags", slug: "travel-bags" },
    ]
  },
  {
    name: "Footwear",
    slug: "footwear",
    subcategories: [
      { name: "Men's Shoes", slug: "mens-shoes" },
      { name: "Women's Shoes", slug: "womens-shoes" },
      { name: "Kids' Shoes", slug: "kids-shoes" },
      { name: "Sports Shoes", slug: "sports-shoes" },
      { name: "Sandals & Flip Flops", slug: "sandals-flip-flops" },
    ]
  },
  {
    name: "Watches & Accessories",
    slug: "watch-accessories",
    subcategories: [
      { name: "Men's Watches", slug: "mens-watches" },
      { name: "Women's Watches", slug: "womens-watches" },
      { name: "Smart Watches", slug: "smart-watches" },
      { name: "Sunglasses", slug: "sunglasses" },
      { name: "Jewellery Accessories", slug: "jewellery-accessories" },
    ]
  },
  {
    name: "Beauty & Wellness",
    slug: "beauty-wellness",
    subcategories: [
      { name: "Skincare", slug: "skincare" },
      { name: "Makeup", slug: "makeup" },
      { name: "Hair Care", slug: "hair-care" },
      { name: "Perfumes", slug: "perfumes" },
      { name: "Personal Care", slug: "personal-care" },
    ]
  },
  {
    name: "Gift & Lifestyle",
    slug: "gift-lifestyle",
    subcategories: [
      { name: "Gift Sets", slug: "gift-sets" },
      { name: "Home Decor", slug: "home-decor" },
      { name: "Kitchenware", slug: "kitchenware" },
      { name: "Stationery", slug: "stationery" },
      { name: "Festive Decor", slug: "festive-decor" },
    ]
  },
  {
    name: "Jewellery",
    slug: "jewellery",
    subcategories: [
      { name: "Gold Jewellery", slug: "gold-jewellery" },
      { name: "Silver Jewellery", slug: "silver-jewellery" },
      { name: "Diamond Jewellery", slug: "diamond-jewellery" },
      { name: "Fashion Jewellery", slug: "fashion-jewellery" },
      { name: "Traditional Jewellery", slug: "traditional-jewellery" },
    ]
  },
  {
    name: "Service & More",
    slug: "service-more",
    subcategories: [
      { name: "Gift Cards", slug: "gift-cards" },
      { name: "Extended Warranty", slug: "extended-warranty" },
      { name: "Installation Services", slug: "installation-services" },
      { name: "Customization", slug: "customization" },
      { name: "Corporate Gifts", slug: "corporate-gifts" },
    ]
  },
];

// Mega Menu Component
function MegaMenu({ onClose }: { onClose?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="absolute inset-x-0 top-full bg-white shadow-2xl border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-8 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className={`col-span-1 ${
                activeCategory === category.slug ? "bg-gray-50 rounded-lg p-4" : ""
              }`}
              onMouseEnter={() => setActiveCategory(category.slug)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/category/${category.slug}`}
                className="block font-semibold text-nex-dark hover:text-nex-accent transition-colors mb-4"
                onClick={onClose}
              >
                {category.name}
              </Link>

              {activeCategory === category.slug && (
                <div className="space-y-2">
                  {category.subcategories.map((subcat) => (
                    <Link
                      key={subcat.slug}
                      href={`/category/${category.slug}/${subcat.slug}`}
                      className="block text-sm text-gray-600 hover:text-nex-accent hover:pl-1 transition-all"
                      onClick={onClose}
                    >
                      {subcat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Featured links */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-6">
          <Link
            href="/sale"
            className="flex items-center gap-2 text-nex-accent font-semibold hover:underline"
            onClick={onClose}
          >
            <span className="w-2 h-2 bg-nex-accent rounded-full"></span>
            Sale Collection
          </Link>
          <Link
            href="/new-arrivals"
            className="flex items-center gap-2 text-nex-accent font-semibold hover:underline"
            onClick={onClose}
          >
            <span className="w-2 h-2 bg-nex-accent rounded-full"></span>
            New Arrivals
          </Link>
          <Link
            href="/premium"
            className="flex items-center gap-2 text-nex-gold font-semibold hover:underline"
            onClick={onClose}
          >
            <span className="w-2 h-2 bg-nex-gold rounded-full"></span>
            Premium Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

// Mobile Mega Menu
function MobileMegaMenu({ onClose }: { onClose: () => void }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-nex-primary to-nex-light rounded-lg flex items-center justify-center">
            <span className="text-lg font-black tracking-tighter text-white">NEX</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-nex-dark">THE NEX</h1>
            <p className="text-[10px] tracking-[0.3em] text-nex-secondary uppercase">
              Live With Nex
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
          <X size={24} className="text-nex-dark" />
        </button>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            className="w-full py-3 px-4 pr-12 rounded-full bg-gray-100 border border-gray-200 text-nex-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nex-accent focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-nex-accent hover:bg-nex-light transition-colors">
            <Search size={18} className="text-white" />
          </button>
        </div>

        {/* Categories */}
        <nav className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug} className="border-b border-gray-100">
              <button
                className="w-full flex items-center justify-between py-4 text-left font-semibold text-nex-dark hover:text-nex-accent transition-colors"
                onClick={() => setExpandedCategory(expandedCategory === category.slug ? null : category.slug)}
              >
                <span>{category.name}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    expandedCategory === category.slug ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategory === category.slug && (
                <div className="pb-4 pl-4 space-y-2">
                  {category.subcategories.map((subcat) => (
                    <Link
                      key={subcat.slug}
                      href={`/category/${category.slug}/${subcat.slug}`}
                      className="block py-2 text-gray-600 hover:text-nex-accent transition-colors"
                      onClick={onClose}
                    >
                      {subcat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Links */}
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
          <Link
            href="/"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/sale"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            Sale Collection
          </Link>
          <Link
            href="/new-arrivals"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            New Arrivals
          </Link>
          <Link
            href="/premium"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            Premium Collection
          </Link>
          <Link
            href="/brands"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            Our Brands
          </Link>
          <Link
            href="/account"
            className="block py-2 font-medium text-nex-dark hover:text-nex-accent"
            onClick={onClose}
          >
            My Account
          </Link>
        </div>

        {/* User Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
          <Link
            href="/account/wishlist"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-nex-cream border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <Heart size={18} className="text-nex-secondary" />
            <span className="font-medium">Wishlist</span>
          </Link>
          <Link
            href="/cart"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-nex-accent text-white hover:bg-nex-light transition-colors"
            onClick={onClose}
          >
            <ShoppingCart size={18} />
            <span className="font-medium">Cart</span>
            <span className="w-5 h-5 bg-white text-nex-dark text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Top Announcement Bar
function TopAnnouncementBar() {
  return (
    <div className="bg-nex-dark text-white">
      <div className="container py-2">
        <div className="flex items-center justify-center md:justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-nex-accent rounded-full animate-pulse"></span>
            <span>Grand Opening Sale - Up to 50% OFF on Selected Brands</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="tel:+919876543210" className="hover:text-white transition-colors">
              📞 +91 98765 43210
            </a>
            <a href="mailto:info@thenexmall.com" className="hover:text-white transition-colors">
              ✉️ info@thenexmall.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Header
function MainHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="bg-nex-cream border-b border-gray-200 sticky top-0 z-40">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-nex-primary to-nex-light rounded-xl flex items-center justify-center border-2 border-nex-primary group-hover:border-nex-accent transition-all shadow-lg">
                <span className="text-2xl font-black tracking-tighter text-white">NEX</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-nex-gold rounded-full border-2 border-nex-cream"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-wider text-nex-dark">THE NEX</h1>
              <p className="text-[10px] tracking-[0.3em] text-nex-secondary uppercase">
                Live With Nex
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category.slug}
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 rounded-full text-nex-dark font-medium hover:bg-gray-100 transition-colors">
                  {category.name}
                  <ChevronDown size={14} className="opacity-60" />
                </button>
              </div>
            ))}

            {/* More dropdown for remaining categories */}
            <div className="relative">
              <button className="flex items-center gap-1 px-4 py-2 rounded-full text-nex-dark font-medium hover:bg-gray-100 transition-colors">
                More
                <ChevronDown size={14} className="opacity-60" />
              </button>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${
                searchOpen ? "bg-gray-100" : "bg-white"
              } border border-gray-200 hover:bg-gray-50 transition-colors`}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} className="text-nex-secondary" />
              <span className="hidden xl:inline text-nex-dark">Search</span>
            </button>

            {/* Mobile search */}
            <button className="md:hidden p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              <Search size={20} className="text-nex-dark" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <User size={18} className="text-nex-secondary" />
              <span className="hidden xl:inline text-nex-dark">Account</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Heart size={18} className="text-nex-secondary" />
              <span className="hidden xl:inline text-nex-dark">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-nex-accent text-white hover:bg-nex-light transition-colors"
            >
              <ShoppingCart size={18} />
              <span className="hidden xl:inline font-medium">Cart</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-nex-dark text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50"
              onClick={onMenuClick}
            >
              <Menu size={22} className="text-nex-dark" />
            </button>
          </div>
        </div>

        {/* Search Bar (Desktop) */}
        {searchOpen && (
          <div className="hidden md:block mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full py-3 px-4 pr-12 rounded-full bg-gray-50 border border-gray-200 text-nex-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nex-accent focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-nex-accent hover:bg-nex-light transition-colors">
                <Search size={18} className="text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Mega Menu */}
        {showMegaMenu && <MegaMenu />}
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* Main Header */}
      <MainHeader onMenuClick={() => setMobileMenuOpen(true)} />

      {/* Mobile Mega Menu */}
      {mobileMenuOpen && <MobileMegaMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
}