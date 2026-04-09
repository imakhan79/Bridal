import { Link } from "wouter";
import { Search, Heart, ShoppingBag, User, Phone, ShieldCheck, Palette, Scissors, Globe, AlertCircle } from "lucide-react";
import { useListCollections, useHealthCheck } from "@workspace/api-client-react";

export function Layout({ children }: { children: ReactNode }) {
  const { data: collectionsData } = useListCollections();
  const { isError: isApiDown } = useHealthCheck();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-nazakat-gold selection:text-white">
      {isApiDown && (
        <div className="bg-destructive text-destructive-foreground py-2 text-center text-xs tracking-wider uppercase flex justify-center items-center px-4 gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>System maintenance in progress. Some features may be unavailable.</span>
        </div>
      )}
      
      {/* Announcement Bar */}
      <div className="bg-foreground text-background py-2 text-center text-xs tracking-wider uppercase flex justify-center items-center px-4">
        <span>Free Worldwide Shipping on All Orders | Get 15% Off Bridal Orders — Call Today</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 transition-all">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6 hidden lg:flex flex-1">
            <Link href="/collections/new-arrivals" className="text-xs font-medium hover:text-nazakat-gold transition-colors uppercase tracking-wider">New Arrivals</Link>
            <Link href="/collections/bridal" className="text-xs font-medium hover:text-nazakat-gold transition-colors uppercase tracking-wider">Bridal</Link>
            <Link href="/collections/eid-2026" className="text-xs font-medium hover:text-nazakat-gold transition-colors uppercase tracking-wider">Eid 2026</Link>
            <Link href="/collections/formal" className="text-xs font-medium hover:text-nazakat-gold transition-colors uppercase tracking-wider">Formal</Link>
            {collectionsData?.collections?.slice(0, 2).map((col) => (
              <Link key={col.id} href={`/collections/${col.slug}`} className="text-xs font-medium hover:text-nazakat-gold transition-colors uppercase tracking-wider">{col.name}</Link>
            ))}
          </div>

          <Link href="/" className="text-3xl md:text-4xl font-serif font-bold text-center tracking-wide flex-1 lg:flex-none">
            NAZAKAT
          </Link>

          <div className="flex items-center justify-end gap-4 flex-1">
            <div className="hidden sm:flex items-center gap-2 mr-2 text-xs uppercase tracking-wider border-r border-border pr-4">
              <span className="cursor-pointer hover:text-nazakat-gold">USD</span>
              <span className="text-muted-foreground">|</span>
              <span className="cursor-pointer text-muted-foreground hover:text-nazakat-gold">PKR</span>
            </div>
            <button className="p-2 hover:text-nazakat-gold transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 hover:text-nazakat-gold transition-colors hidden sm:block"><Heart className="w-5 h-5" /></button>
            <button className="p-2 hover:text-nazakat-gold transition-colors hidden sm:block"><User className="w-5 h-5" /></button>
            <button className="p-2 hover:text-nazakat-gold transition-colors flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] bg-nazakat-gold text-white rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-3xl mb-6 tracking-wide">NAZAKAT</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">Luxury South Asian Fashion — Delivered Worldwide. Crafted to perfection in our Lahore atelier.</p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-nazakat-gold hover:text-nazakat-gold cursor-pointer transition-colors">in</div>
                <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-nazakat-gold hover:text-nazakat-gold cursor-pointer transition-colors">fb</div>
                <div className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-nazakat-gold hover:text-nazakat-gold cursor-pointer transition-colors">pi</div>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6 text-nazakat-gold">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/collections/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="/collections/bridal" className="hover:text-white transition-colors">Bridal</Link></li>
                <li><Link href="/collections/formal" className="hover:text-white transition-colors">Formal</Link></li>
                <li><Link href="/collections/eid-2026" className="hover:text-white transition-colors">Eid 2026</Link></li>
                <li><Link href="/collections/menswear" className="hover:text-white transition-colors">Menswear</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6 text-nazakat-gold">Customer Care</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/pages/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/pages/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/pages/size-chart" className="hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link href="/pages/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
                <li><Link href="/pages/return-policy" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6 text-nazakat-gold">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-nazakat-gold"/> USA: +1 (888) 123-4567</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-nazakat-gold"/> UK: +44 20 1234 5678</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-nazakat-gold"/> PK: +92 300 1234567</li>
                <li className="mt-4 text-white">support@nazakat.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2026 Nazakat. All rights reserved. US Based Business.</p>
            <div className="flex gap-2 opacity-50 grayscale">
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center text-[8px] text-black font-bold">VISA</div>
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center text-[8px] text-black font-bold">MC</div>
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center text-[8px] text-black font-bold">AMEX</div>
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center text-[8px] text-black font-bold">PAYPAL</div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="font-semibold hidden md:inline">Inquire on WhatsApp</span>
      </a>
    </div>
  );
}

// Ensure ReactNode is available
import { ReactNode } from "react";