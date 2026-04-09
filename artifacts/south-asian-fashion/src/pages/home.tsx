import { useGetFeaturedProducts, useGetNewArrivals, useListDesigners, useListReviews } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { ShieldCheck, Palette, Scissors, Globe } from "lucide-react";

export function Home() {
  const { data: featuredData, isLoading: featuredLoading } = useGetFeaturedProducts();
  const { data: newArrivalsData, isLoading: newArrivalsLoading } = useGetNewArrivals({ limit: 4 });
  const { data: designersData } = useListDesigners();
  const { data: reviewsData } = useListReviews();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="/images/hero-bg.png" 
          alt="Luxury South Asian Fashion" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center max-w-4xl mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-tight drop-shadow-lg">
            Luxury South Asian Fashion
          </h1>
          <p className="text-lg md:text-2xl mb-12 font-light tracking-widest text-gray-200 drop-shadow-md">
            BRIDAL • FORMAL • FESTIVE
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="/collections/bridal" className="bg-nazakat-gold hover:bg-nazakat-gold/90 text-white px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto text-center">
              Shop Bridal
            </Link>
            <Link href="/collections/new-arrivals" className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium transition-all w-full sm:w-auto text-center backdrop-blur-sm">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="py-24 container mx-auto px-4 overflow-hidden">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-4">New Arrivals</h2>
            <div className="w-12 h-0.5 bg-nazakat-gold" />
          </div>
          <Link href="/collections/new-arrivals" className="text-sm uppercase tracking-widest hover:text-nazakat-gold transition-colors pb-1 border-b border-transparent hover:border-nazakat-gold">
            View All
          </Link>
        </div>

        {newArrivalsLoading ? (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[280px] w-[280px] md:w-[320px] aspect-[3/4] bg-muted animate-pulse snap-center shrink-0" />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar">
            {newArrivalsData?.products?.map(product => (
              <div key={product.id} className="min-w-[280px] w-[280px] md:w-[320px] snap-center shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Shop by Occasion Tiles */}
      <section className="py-16 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Shop by Occasion</h2>
            <div className="w-16 h-0.5 bg-nazakat-gold mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
            {[
              { name: "Bridal", img: "/images/occasion-bridal.png" },
              { name: "Eid 2026", img: "/images/occasion-eid.png" },
              { name: "Wedding Guest", img: "/images/occasion-guest.png" },
              { name: "Mehendi", img: "/images/occasion-mehendi.png" },
              { name: "Walima", img: "/images/occasion-walima.png" },
              { name: "Party Wear", img: "/images/occasion-party.png" }
            ].map(occ => (
              <Link key={occ.name} href={`/collections/${occ.name.toLowerCase().replace(' ', '-')}`} className="group relative aspect-[3/4] overflow-hidden bg-muted">
                <img src={occ.img} alt={occ.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <h3 className="text-white text-xl md:text-3xl font-serif tracking-wide">{occ.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Couture Edit</h2>
          <div className="w-16 h-0.5 bg-nazakat-gold mx-auto" />
        </div>

        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredData?.products?.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <Scissors className="w-8 h-8 text-nazakat-gold" strokeWidth={1.5} />
              <h4 className="font-serif text-lg">Custom Made</h4>
              <p className="text-sm text-gray-400">Tailored perfectly to your measurements</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Palette className="w-8 h-8 text-nazakat-gold" strokeWidth={1.5} />
              <h4 className="font-serif text-lg">Color Choices</h4>
              <p className="text-sm text-gray-400">Customize fabrics and colors</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Globe className="w-8 h-8 text-nazakat-gold" strokeWidth={1.5} />
              <h4 className="font-serif text-lg">Free Worldwide Shipping</h4>
              <p className="text-sm text-gray-400">On all couture orders</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-nazakat-gold" strokeWidth={1.5} />
              <h4 className="font-serif text-lg">WhatsApp Support</h4>
              <p className="text-sm text-gray-400">24/7 dedicated styling assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Designers</h2>
          <div className="w-16 h-0.5 bg-nazakat-gold mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {designersData?.designers?.slice(0, 4).map(designer => (
            <Link key={designer.id} href={`/collections/${designer.slug}`} className="group relative aspect-[4/5] overflow-hidden bg-muted">
              {designer.coverImage && <img src={designer.coverImage} alt={designer.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-2xl font-serif tracking-wider text-center">{designer.name}</h3>
                <span className="text-nazakat-gold mt-4 uppercase tracking-widest text-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">View Collection</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lookbook Banner */}
      <section className="relative py-40 my-12">
        <img src="/images/lookbook-banner.png" alt="Editorial Lookbook" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-nazakat-gold uppercase tracking-[0.3em] text-sm mb-4">Editorial</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">The Royal Edit</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Discover our curated selection of heritage pieces, bringing the timeless elegance of the Mughal era to the modern bride.
          </p>
          <Link href="/collections/royal-edit" className="bg-white text-black px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-nazakat-gold hover:text-white transition-colors inline-block">
            Shop the Look
          </Link>
        </div>
      </section>
      
      {/* Reviews */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-16">Loved by Brides Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {reviewsData?.reviews?.slice(0, 3).map(review => (
              <div key={review.id} className="p-8 bg-muted/30 border border-border/50">
                <div className="flex text-nazakat-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="text-xs uppercase tracking-wider">
                  <p className="font-semibold">{review.customerName}</p>
                  <p className="text-muted-foreground">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
