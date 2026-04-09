import { useState } from "react";
import { useGetProduct, useGetRelatedProducts } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";
import { Heart } from "lucide-react";

export function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const { data: product, isLoading } = useGetProduct(params.slug, { query: { enabled: !!params.slug } });
  const { data: relatedData } = useGetRelatedProducts(params.slug, { query: { enabled: !!params.slug } });

  const [mainImage, setMainImage] = useState<string | null>(null);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex animate-pulse gap-12">
      <div className="w-1/2 bg-muted aspect-[3/4]" />
      <div className="w-1/2 flex flex-col gap-4 pt-12">
        <div className="w-1/4 h-4 bg-muted" />
        <div className="w-3/4 h-10 bg-muted" />
        <div className="w-1/4 h-8 bg-muted mb-8" />
        <div className="w-full h-32 bg-muted" />
      </div>
    </div>
  );

  if (!product) return <div className="min-h-screen py-24 text-center font-serif text-2xl">Product not found</div>;

  const currentImage = mainImage || product.images[0];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-muted w-full relative overflow-hidden">
            <img src={currentImage} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setMainImage(img)}
                className={`aspect-[3/4] bg-muted cursor-pointer hover:opacity-100 transition-opacity border-b-2 ${currentImage === img ? 'border-nazakat-gold opacity-100' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col pt-4 lg:pt-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">{product.brand}</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
          <p className="text-2xl font-medium mb-8 font-serif">
            {product.priceOnRequest ? "Price upon request" : `$${product.priceUsd} USD`}
            {product.pricePkr && !product.priceOnRequest && <span className="text-sm text-muted-foreground block font-sans mt-1">PKR {product.pricePkr.toLocaleString()}</span>}
          </p>

          <p className="text-muted-foreground mb-8 leading-relaxed font-light">
            {product.description}
          </p>

          <div className="space-y-6 mb-10">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-serif text-lg">Select Size</h3>
                <Link href="/pages/size-chart" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground underline underline-offset-4">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'Custom'].map(size => (
                  <button key={size} className="w-14 h-12 border border-border flex items-center justify-center hover:border-foreground transition-colors uppercase text-sm tracking-wider">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            {product.priceOnRequest ? (
              <a href={`https://wa.me/1234567890?text=I am interested in ${product.name} (${product.sku})`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-14 text-sm uppercase tracking-widest bg-[#25D366] hover:bg-[#128C7E] text-white rounded-none">
                  Request Quote via WhatsApp
                </Button>
              </a>
            ) : (
              <Button className="w-full h-14 text-sm uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 rounded-none">
                Add to Bag
              </Button>
            )}
            <Button variant="outline" className="w-full h-14 text-sm uppercase tracking-widest rounded-none border-border flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" /> Add to Wishlist
            </Button>
          </div>

          <Accordion type="multiple" className="w-full border-t border-border">
            <AccordionItem value="details">
              <AccordionTrigger className="font-serif text-lg hover:no-underline py-6">Product Details</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pb-6">
                <p><strong className="text-foreground font-medium">SKU:</strong> {product.sku}</p>
                <p><strong className="text-foreground font-medium">Fabric:</strong> {product.fabric}</p>
                <p><strong className="text-foreground font-medium">Pieces:</strong> {product.pieces}</p>
                <p><strong className="text-foreground font-medium">Embroidery:</strong> {product.embroidery}</p>
                <p><strong className="text-foreground font-medium">Occasion:</strong> {product.occasion}</p>
                <p><strong className="text-foreground font-medium">Delivery Time:</strong> {product.deliveryTime}</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="process">
              <AccordionTrigger className="font-serif text-lg hover:no-underline py-6">How We Make Your Order</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <ol className="space-y-4 list-decimal pl-4">
                  <li><strong className="text-foreground font-medium">Inquiry:</strong> You request a quote or place an order.</li>
                  <li><strong className="text-foreground font-medium">Design Consultation:</strong> Our stylist contacts you via WhatsApp to discuss customizations.</li>
                  <li><strong className="text-foreground font-medium">Measurements:</strong> We guide you through taking perfect measurements or you can provide standard sizes.</li>
                  <li><strong className="text-foreground font-medium">Tailoring:</strong> Our artisans in Lahore hand-craft your outfit.</li>
                  <li><strong className="text-foreground font-medium">Delivery:</strong> Shipped globally via express courier, perfectly packaged.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping">
              <AccordionTrigger className="font-serif text-lg hover:no-underline py-6">Shipping & Returns</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-3 pb-6">
                <p><strong>International Shipping:</strong> Free worldwide shipping via DHL Express on all formal and bridal orders.</p>
                <p><strong>Local Delivery:</strong> PKR 15,000 flat rate within Pakistan.</p>
                <p><strong>Returns:</strong> Due to the custom nature of our products, we do not accept returns. We offer alterations if required.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Related Products */}
      {relatedData?.products && relatedData.products.length > 0 && (
        <section className="pt-20 border-t border-border">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">You May Also Like</h2>
            <div className="w-12 h-0.5 bg-nazakat-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {relatedData.products.slice(0, 4).map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
