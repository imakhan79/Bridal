import { useState } from "react";
import { useGetProduct, useGetRelatedProducts } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/components/product-card";
import { Heart, ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useStore } from "@/App";
import { useToast } from "@/hooks/use-toast";

export function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const { data: product, isLoading } = useGetProduct(params.slug, { query: { enabled: !!params.slug } });
  const { data: relatedData } = useGetRelatedProducts(params.slug, { query: { enabled: !!params.slug } });

  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { currency, addToCart, wishlist, toggleWishlist } = useStore();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-muted w-full" />
            <div className="grid grid-cols-4 gap-3">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-muted" />)}
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-8">
            <div className="w-1/4 h-4 bg-muted" />
            <div className="w-3/4 h-10 bg-muted" />
            <div className="w-1/3 h-8 bg-muted" />
            <div className="w-full h-28 bg-muted mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-24">
        <h2 className="text-2xl font-serif">Product not found</h2>
        <Link href="/collections/bridal" className="text-sm uppercase tracking-widest underline hover:text-nazakat-gold">Browse Collections</Link>
      </div>
    );
  }

  const images = product.images ?? [];
  const currentImage = images[mainImageIdx] ?? images[0];
  const isWishlisted = wishlist.includes(product.slug);
  const priceDisplay = product.priceOnRequest
    ? "Price upon request"
    : formatPrice(product.priceUsd, currency);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", description: "Choose a size before adding to cart.", variant: "destructive" });
      return;
    }
    addToCart({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: images[0] ?? "",
      size: selectedSize,
      priceUsd: product.priceUsd ?? null,
      quantity: 1,
    });
    toast({ title: "Added to cart", description: `${product.name} — Size ${selectedSize}` });
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        {product.collection && (
          <>
            <Link href={`/collections/${product.collection}`} className="hover:text-foreground transition-colors capitalize">{product.collection.replace(/-/g, ' ')}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">

          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-muted w-full relative overflow-hidden group">
              {currentImage && (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              )}
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setMainImageIdx(i => Math.max(0, i - 1))}
                    disabled={mainImageIdx === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMainImageIdx(i => Math.min(images.length - 1, i + 1))}
                    disabled={mainImageIdx === images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              {/* Availability Badge */}
              <div className="absolute top-4 left-4">
                {product.availability === "express" && (
                  <span className="bg-nazakat-teal text-white text-[10px] uppercase tracking-wider px-2.5 py-1">Express Dispatch</span>
                )}
                {product.availability === "in_stock" && (
                  <span className="bg-green-700 text-white text-[10px] uppercase tracking-wider px-2.5 py-1">In Stock</span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImageIdx(i)}
                    className={`aspect-[3/4] bg-muted overflow-hidden border-b-2 transition-all ${mainImageIdx === i ? "border-nazakat-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col lg:pt-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-serif mb-1 leading-tight">{product.name}</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">SKU: {product.sku}</p>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-border">
              {product.priceOnRequest ? (
                <p className="text-xl font-serif text-muted-foreground italic">Price upon request</p>
              ) : (
                <div>
                  <p className="text-2xl font-serif font-medium">{formatPrice(product.priceUsd, currency)}</p>
                  {currency !== "PKR" && product.pricePkr && (
                    <p className="text-sm text-muted-foreground mt-1">PKR {Number(product.pricePkr).toLocaleString()}</p>
                  )}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-light">{product.description}</p>

            {/* Color Options */}
            {(product.colors as string[])?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-3 font-medium">Available Colors</p>
                <div className="flex flex-wrap gap-2">
                  {(product.colors as string[]).map((color) => (
                    <span key={color} className="text-xs border border-border px-3 py-1 text-muted-foreground">{color}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs uppercase tracking-widest font-medium">Select Size</p>
                <Link href="/pages/size-chart" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-nazakat-gold underline underline-offset-4 transition-colors">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {((product.sizes as string[]) ?? ["S", "M", "L", "XL", "Custom"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[52px] h-11 px-3 border text-sm uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-[11px] text-muted-foreground mt-2">Please select a size</p>}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              {product.priceOnRequest ? (
                <a
                  href={`https://wa.me/12345678901?text=Hello, I am interested in ${encodeURIComponent(product.name)} (${product.sku}). Could you please share the price and availability?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-13 px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Request Quote via WhatsApp
                </a>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  className="w-full h-13 py-4 text-sm uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 rounded-none"
                >
                  Add to Bag {selectedSize ? `— Size ${selectedSize}` : ""}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => { toggleWishlist(product.slug); toast({ title: isWishlisted ? "Removed from wishlist" : "Added to wishlist", description: product.name }); }}
                className={`w-full h-13 py-4 text-sm uppercase tracking-widest rounded-none flex items-center justify-center gap-2 transition-colors ${isWishlisted ? "border-nazakat-gold text-nazakat-gold" : "border-border"}`}
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-border">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck className="w-5 h-5 text-nazakat-gold" strokeWidth={1.5} />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Free Worldwide Shipping</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="w-5 h-5 text-nazakat-gold" strokeWidth={1.5} />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Secure Payment</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <RefreshCw className="w-5 h-5 text-nazakat-gold" strokeWidth={1.5} />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Custom Fitting</p>
              </div>
            </div>

            {/* Accordions */}
            <Accordion type="multiple" className="w-full border-t border-border">
              <AccordionItem value="details">
                <AccordionTrigger className="font-serif text-base hover:no-underline py-5">Product Details</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2.5 pb-5">
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Fabric:</strong> {product.fabric}</p>
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Pieces:</strong> {product.pieces} piece{Number(product.pieces) > 1 ? "s" : ""}</p>
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Embroidery:</strong> {product.embroidery}</p>
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Occasion:</strong> {product.occasion}</p>
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Season:</strong> {product.season}</p>
                  <p><strong className="text-foreground font-medium text-xs uppercase tracking-wider">Delivery Time:</strong> {product.deliveryTime}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="process">
                <AccordionTrigger className="font-serif text-base hover:no-underline py-5">How We Make Your Order</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5">
                  <ol className="space-y-4">
                    {[
                      ["Inquiry", "Contact us via WhatsApp, email, or the inquiry form to discuss your requirements."],
                      ["Design Consultation", "Our stylist contacts you within 24 hours to walk through customizations, colors, and fabric swatches."],
                      ["Measurements", "We send you a detailed measurement guide. You submit your measurements or choose a standard size."],
                      ["Tailoring", "Our master artisans in Lahore hand-craft your outfit with meticulous attention to every stitch and embellishment."],
                      ["Delivery", "Your order is carefully packaged and shipped worldwide via DHL Express with full tracking."],
                    ].map(([title, desc], i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-nazakat-gold/20 text-nazakat-gold text-xs flex items-center justify-center shrink-0 font-medium">{i + 1}</span>
                        <div>
                          <strong className="text-foreground font-medium">{title}:</strong>{" "}
                          <span>{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="font-serif text-base hover:no-underline py-5">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-3 pb-5">
                  <p><strong className="text-foreground">International Shipping:</strong> Free worldwide shipping via DHL Express on all orders. Tracking provided.</p>
                  <p><strong className="text-foreground">Local Pakistan:</strong> PKR 15,000 flat rate via TCS/Leopards.</p>
                  <p><strong className="text-foreground">Returns:</strong> Custom-made items cannot be returned. We offer complimentary alterations if the piece doesn't fit perfectly.</p>
                  <p><strong className="text-foreground">Ready-to-Wear:</strong> May be returned within 14 days in original condition.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="inquire">
                <AccordionTrigger className="font-serif text-base hover:no-underline py-5">Custom Orders & Questions</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5">
                  <p className="mb-4">Want a different color, fabric, or customization? We specialize in bespoke orders. Contact us via WhatsApp for a private consultation.</p>
                  <a
                    href="https://wa.me/12345678901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-border px-5 py-3 hover:border-nazakat-gold hover:text-nazakat-gold transition-colors"
                  >
                    WhatsApp Consultation
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedData?.products && relatedData.products.length > 0 && (
          <section className="pt-16 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-serif mb-3">You May Also Like</h2>
              <div className="w-10 h-0.5 bg-nazakat-gold mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {relatedData.products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
