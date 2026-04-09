import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Heart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col gap-4 w-full">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-muted">
        {product.images[0] && (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0" 
          />
        )}
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 scale-105 group-hover:scale-100" 
          />
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-background text-foreground text-[10px] md:text-xs uppercase tracking-wider px-2 py-1 shadow-sm">New</span>}
          {product.availability === "made_to_order" && <span className="bg-nazakat-gold text-white text-[10px] md:text-xs uppercase tracking-wider px-2 py-1 shadow-sm">Made to Order</span>}
          {product.availability === "express" && <span className="bg-nazakat-teal text-white text-[10px] md:text-xs uppercase tracking-wider px-2 py-1 shadow-sm">Express</span>}
        </div>

        <button className="absolute top-3 right-3 p-2 bg-background/50 hover:bg-background rounded-full transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 shadow-sm">
          <Heart className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </Link>

      <div className="text-center space-y-1 px-2">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground truncate">{product.brand}</p>
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-serif text-base md:text-lg hover:text-nazakat-gold transition-colors truncate">{product.name}</h3>
        </Link>
        <p className="text-xs md:text-sm font-medium tracking-wide">
          {product.priceOnRequest ? "Price upon request" : `$${product.priceUsd} USD`}
        </p>
      </div>
    </div>
  );
}
