import { useListProducts, useGetCollection } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { ProductCard } from "@/components/product-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export function Collection() {
  const params = useParams<{ slug: string }>();
  // Our API supports specific occasion filtering via params
  const isOccasion = ['bridal', 'formal', 'eid-2026', 'wedding-guest', 'mehendi', 'walima', 'party-wear'].includes(params.slug);
  
  const { data: collectionData } = useGetCollection(params.slug, { query: { enabled: !isOccasion } });
  const { data: productsData, isLoading } = useListProducts(
    { occasion: isOccasion ? params.slug.replace('-', ' ') : undefined, limit: 50 }, 
    { query: { enabled: isOccasion } }
  );

  const title = collectionData?.collection.name || params.slug.replace('-', ' ').toUpperCase();
  const description = collectionData?.collection.description || `Discover our exquisite ${title.toLowerCase()} collection, featuring luxurious fabrics, intricate hand-embroidery, and timeless silhouettes.`;
  const products = collectionData?.products || productsData?.products || [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Collection</p>
        <h1 className="text-4xl md:text-6xl font-serif mb-6">{title}</h1>
        <div className="w-16 h-0.5 bg-nazakat-gold mx-auto mb-8" />
        <p className="max-w-2xl mx-auto text-muted-foreground font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="font-serif text-xl mb-6">Filter By</h3>
            
            <Accordion type="multiple" defaultValue={["category", "designer", "color"]} className="w-full">
              <AccordionItem value="category" className="border-border">
                <AccordionTrigger className="hover:no-underline text-sm uppercase tracking-wider py-4">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    {['Lehengas', 'Maxis', 'Pishwas', 'Sarees', 'Shararas'].map(cat => (
                      <div key={cat} className="flex items-center space-x-2 text-sm">
                        <Checkbox id={`cat-${cat}`} className="border-border rounded-none data-[state=checked]:bg-foreground" />
                        <label htmlFor={`cat-${cat}`} className="text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="designer" className="border-border">
                <AccordionTrigger className="hover:no-underline text-sm uppercase tracking-wider py-4">Designer</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    {['HSY', 'Azeera', 'Haseens Official', 'Nameera by Farooq'].map(designer => (
                      <div key={designer} className="flex items-center space-x-2 text-sm">
                        <Checkbox id={`designer-${designer}`} className="border-border rounded-none data-[state=checked]:bg-foreground" />
                        <label htmlFor={`designer-${designer}`} className="text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {designer}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="color" className="border-border">
                <AccordionTrigger className="hover:no-underline text-sm uppercase tracking-wider py-4">Color</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { name: 'Red', hex: '#8B0000' },
                      { name: 'Gold', hex: '#D4AF37' },
                      { name: 'Ivory', hex: '#FFFFF0' },
                      { name: 'Teal', hex: '#008080' },
                      { name: 'Blush', hex: '#FFB6C1' },
                      { name: 'Black', hex: '#000000' },
                    ].map(color => (
                      <button 
                        key={color.name} 
                        className="w-6 h-6 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
            <p className="text-sm text-muted-foreground">{products.length} Products</p>
            <select className="bg-transparent border-none text-sm uppercase tracking-wider font-medium outline-none cursor-pointer text-foreground">
              <option>Sort: Recommended</option>
              <option>New Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-muted-foreground">
              No products found in this collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
