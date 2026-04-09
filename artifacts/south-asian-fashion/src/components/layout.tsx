import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Heart, ShoppingBag, User, Phone, Menu, X } from "lucide-react";
import { useListCollections, useHealthCheck } from "@workspace/api-client-react";

type Currency = "USD" | "PKR" | "GBP" | "AED" | "AUD";

const currencies: Currency[] = ["USD", "PKR", "GBP", "AED", "AUD"];

interface LayoutProps {
  children: ReactNode;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  wishlistCount: number;
}

export function Layout({ children, currency, onCurrencyChange, cartCount, wishlistCount }: LayoutProps) {
  const { isError: isApiDown } = useHealthCheck();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Bridal", href: "/collections/bridal" },
    { label: "Eid 2026", href: "/collections/eid-2026" },
    { label: "Formal", href: "/collections/formal" },
    { label: "Lehengas", href: "/collections/lehengas" },
    { label: "Menswear", href: "/collections/menswear" },
    { label: "Sale", href: "/collections/sale" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-nazakat-gold selection:text-white">
      {isApiDown && (
        <div className="bg-destructive text-destructive-foreground py-2 text-center text-xs tracking-wider uppercase flex justify-center items-center px-4 gap-2">
          System maintenance in progress. Some features may be unavailable.
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-foreground text-background py-2 text-center text-xs tracking-wider uppercase px-4">
        Free Worldwide Shipping on All Orders | Get 15% Off Bridal Orders — Call Today
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Left Nav — desktop */}
          <nav className="hidden lg:flex items-center gap-5 flex-1">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium uppercase tracking-wider transition-colors whitespace-nowrap ${location === link.href ? "text-nazakat-gold" : "hover:text-nazakat-gold"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-wide flex-none lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            NAZAKAT
          </Link>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-1 md:gap-2 flex-1">
            {/* Currency Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                className="text-xs uppercase tracking-wider border-r border-border pr-3 mr-1 hover:text-nazakat-gold transition-colors"
              >
                {currency}
              </button>
              {showCurrencyMenu && (
                <div className="absolute top-full right-0 mt-2 bg-background border border-border shadow-lg z-50 min-w-[80px]">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => { onCurrencyChange(c); setShowCurrencyMenu(false); }}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wider hover:bg-muted transition-colors ${currency === c ? "text-nazakat-gold font-medium" : ""}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="p-2 hover:text-nazakat-gold transition-colors" aria-label="Search">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 hover:text-nazakat-gold transition-colors relative hidden sm:block" aria-label="Wishlist">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-nazakat-gold text-white rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>
              )}
            </button>
            <button className="p-2 hover:text-nazakat-gold transition-colors hidden sm:block" aria-label="Account">
              <User className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 hover:text-nazakat-gold transition-colors relative" aria-label="Cart">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute -top-0.5 -right-0.5 text-[9px] bg-nazakat-gold text-white rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="p-2 hover:text-nazakat-gold transition-colors lg:hidden ml-1"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Second Nav Row for extra links */}
        <div className="hidden lg:flex border-t border-border/30 container mx-auto px-4 md:px-6 h-10 items-center gap-6">
          {navLinks.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-medium uppercase tracking-wider transition-colors ${location === link.href ? "text-nazakat-gold" : "hover:text-nazakat-gold"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-background shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <span className="font-serif text-2xl">NAZAKAT</span>
              <button onClick={() => setMobileNavOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {/* Currency picker in mobile */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-3 flex-wrap">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`text-xs uppercase tracking-wider px-3 py-1 border transition-colors ${currency === c ? "border-nazakat-gold text-nazakat-gold" : "border-border hover:border-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`block px-6 py-4 text-sm uppercase tracking-wider border-b border-border/40 transition-colors ${location === link.href ? "text-nazakat-gold" : "hover:text-nazakat-gold"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/pages/about-us" onClick={() => setMobileNavOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-wider border-b border-border/40 hover:text-nazakat-gold">About Us</Link>
              <Link href="/pages/contact-us" onClick={() => setMobileNavOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-wider border-b border-border/40 hover:text-nazakat-gold">Contact</Link>
              <Link href="/pages/size-chart" onClick={() => setMobileNavOpen(false)} className="block px-6 py-4 text-sm uppercase tracking-wider border-b border-border/40 hover:text-nazakat-gold">Size Guide</Link>
            </nav>

            <div className="px-6 py-6 border-t border-border space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> USA: +1 (888) 123-4567</div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> UK: +44 20 1234 5678</div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> PK: +92 300 1234567</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-serif text-2xl mb-5 tracking-wide">NAZAKAT</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Luxury South Asian Fashion — Delivered Worldwide. Crafted to perfection by master artisans in Lahore.
              </p>
              <div className="flex gap-3 mb-6">
                {[
                  { label: "IG", href: "https://instagram.com" },
                  { label: "FB", href: "https://facebook.com" },
                  { label: "TK", href: "https://tiktok.com" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-[10px] hover:border-nazakat-gold hover:text-nazakat-gold transition-colors">
                    {s.label}
                  </a>
                ))}
              </div>
              <div className="flex gap-1.5">
                {["VISA", "MC", "AMEX", "PYPL"].map(p => (
                  <div key={p} className="h-5 px-1.5 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] font-bold tracking-wide">{p}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm mb-5 text-nazakat-gold uppercase tracking-widest">Shop</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                {[
                  ["New Arrivals", "/collections/new-arrivals"],
                  ["Bridal", "/collections/bridal"],
                  ["Eid 2026", "/collections/eid-2026"],
                  ["Formal", "/collections/formal"],
                  ["Menswear", "/collections/menswear"],
                  ["Sale", "/collections/sale"],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm mb-5 text-nazakat-gold uppercase tracking-widest">Help</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                {[
                  ["Contact Us", "/pages/contact-us"],
                  ["About Nazakat", "/pages/about-us"],
                  ["Size Guide", "/pages/size-chart"],
                  ["Shipping", "/pages/shipping-policy"],
                  ["Returns", "/pages/return-policy"],
                ].map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm mb-5 text-nazakat-gold uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3 text-xs text-gray-400">
                {[
                  ["USA", "+1 (888) 123-4567"],
                  ["UK", "+44 20 1234 5678"],
                  ["Canada", "+1 (888) 987-6543"],
                  ["Australia", "+61 2 1234 5678"],
                  ["Pakistan", "+92 300 1234567"],
                ].map(([country, number]) => (
                  <li key={country} className="flex items-start gap-2">
                    <Phone className="w-3 h-3 mt-0.5 text-nazakat-gold shrink-0" />
                    <span><strong className="text-gray-300">{country}:</strong> {number}</span>
                  </li>
                ))}
                <li className="pt-2 text-gray-300">support@nazakat.com</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-gray-500">
            <span>© 2026 Nazakat. All rights reserved. US Based Business · Worldwide Delivery</span>
            <div className="flex gap-4">
              <Link href="/pages/shipping-policy" className="hover:text-gray-300 transition-colors">Shipping Policy</Link>
              <Link href="/pages/return-policy" className="hover:text-gray-300 transition-colors">Returns</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/12345678901?text=Hello, I'm interested in your collection."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">Inquire on WhatsApp</span>
      </a>
    </div>
  );
}
