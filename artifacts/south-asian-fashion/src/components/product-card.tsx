import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useStore } from "@/App";

type Product = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  images: string[];
  priceUsd: number | null;
  pricePkr: number | null;
  priceOnRequest: boolean;
  fabric: string;
  season: string;
  isNew: boolean;
  availability: string;
};

const currencyRates: Record<string, { rate: number; symbol: string; label: string }> = {
  USD: { rate: 1, symbol: "$", label: "USD" },
  PKR: { rate: 278, symbol: "PKR ", label: "PKR" },
  GBP: { rate: 0.79, symbol: "£", label: "GBP" },
  AED: { rate: 3.67, symbol: "AED ", label: "AED" },
  AUD: { rate: 1.53, symbol: "A$", label: "AUD" },
};

export function formatPrice(priceUsd: number | null, currency: string): string {
  if (priceUsd === null) return "Price upon request";
  const { rate, symbol } = currencyRates[currency] || currencyRates.USD;
  const amount = Math.round(priceUsd * rate);
  return `${symbol}${amount.toLocaleString()} ${currency}`;
}

export function ProductCard({ product }: { product: Product }) {
  const { currency, wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.slug);

  return (
    <div className="group relative flex flex-col gap-3 w-full">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
        {product.images[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 scale-105 group-hover:scale-100"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-background text-foreground text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-sm">New</span>
          )}
          {product.availability === "made_to_order" && (
            <span className="bg-nazakat-gold text-white text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5">Made to Order</span>
          )}
          {product.availability === "express" && (
            <span className="bg-nazakat-teal text-white text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5">Express</span>
          )}
          {product.availability === "in_stock" && (
            <span className="bg-green-700 text-white text-[9px] md:text-[10px] uppercase tracking-wider px-2 py-0.5">In Stock</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 p-1.5 bg-background/80 hover:bg-background rounded-full transition-all backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.slug); }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className="w-4 h-4 transition-colors"
            strokeWidth={1.5}
            fill={isWishlisted ? "currentColor" : "none"}
            color={isWishlisted ? "#B8973A" : "currentColor"}
          />
        </button>
      </Link>

      <div className="text-center space-y-1 px-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground truncate">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-sm md:text-base hover:text-nazakat-gold transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs md:text-sm font-medium tracking-wide text-foreground/90">
          {product.priceOnRequest
            ? "Price upon request"
            : formatPrice(product.priceUsd, currency)}
        </p>
        {!product.priceOnRequest && product.priceUsd && currency !== "PKR" && product.pricePkr && (
          <p className="text-[10px] text-muted-foreground">
            PKR {Number(product.pricePkr).toLocaleString()}
          </p>
        )}
        <p className="text-[10px] text-muted-foreground">{product.fabric} · {product.season}</p>
      </div>
    </div>
  );
}
