import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const categories = [
  { name: "Fashion", slug: "fashion" },
  { name: "Bags & Accessories", slug: "bags-accessories" },
  { name: "Footwear", slug: "footwear" },
  { name: "Watch & Accessories", slug: "watch-accessories" },
  { name: "Beauty & Wellness", slug: "beauty-wellness" },
  { name: "Gift & Lifestyle", slug: "gift-lifestyle" },
  { name: "Jewellery", slug: "jewellery" },
];

export default function Footer() {
  return (
    <footer className="bg-nex-dark text-white">
      {/* Newsletter */}
      <div className="bg-nex-primary border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-white/60 mt-1">Get latest updates on new arrivals and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 py-3 px-5 rounded-l-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
              <button className="px-8 py-3 bg-nex-gold text-nex-dark font-semibold rounded-r-full hover:bg-nex-gold/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-lg flex items-center justify-center border border-white/20">
                <span className="text-lg font-black">NEX</span>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-wider">THE NEX</h2>
                <p className="text-[9px] tracking-[0.25em] text-white/60 uppercase">Live With Nex</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-4">
              Your premium shopping destination. Discover the finest brands across Fashion, Accessories, Beauty & more.
            </p>
            <div className="flex gap-3">
              {["f", "ig", "t", "yt"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4 text-nex-gold">Shop</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-white/60 hover:text-white text-sm transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More categories */}
          <div>
            <h3 className="font-bold mb-4 text-nex-gold">More</h3>
            <ul className="space-y-2">
              {categories.slice(5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-white/60 hover:text-white text-sm transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-nex-gold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-nex-accent" />
                <span>The Nex Mall, Sector 22, Main Road, City Center</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="shrink-0 text-nex-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="shrink-0 text-nex-accent" />
                <span>info@thenexmall.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© 2025 The Nex Mall. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
