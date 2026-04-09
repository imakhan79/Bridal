import { useState, useMemo } from "react";
import { useListProducts, useGetCollection } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, X } from "lucide-react";

type Sort = "featured" | "newest" | "price_asc" | "price_desc";

const COLLECTION_SLUGS = ["bridal", "formal", "eid-2026", "lehengas", "menswear", "new-arrivals", "sale"];
const DESIGNERS = ["HSY", "Azeera", "Haseens Official", "Nameera by Farooq"];
const OCCASIONS = ["Bridal", "Eid", "Wedding Formal", "Wedding Guest", "Mehendi", "Walima", "Party"];
const FABRICS = ["Chiffon", "Raw Silk", "Organza", "Jamawar", "Velvet", "Georgette", "Silk"];
const COLORS_LIST = [
  { name: "Red", hex: "#8B0000" }, { name: "Gold", hex: "#C9A44E" }, { name: "Ivory", hex: "#E8E0D0" },
  { name: "Teal", hex: "#2A7B7B" }, { name: "Blush", hex: "#D4878A" }, { name: "Burgundy", hex: "#7B2D3A" },
  { name: "Black", hex: "#1C1C1C" }, { name: "Navy", hex: "#1B2A4A" },
];

export function Collection() {
  const params = useParams<{ slug: string }>();
  const isNamedCollection = COLLECTION_SLUGS.includes(params.slug);

  const [sort, setSort] = useState<Sort>("featured");
  const [filterDesigners, setFilterDesigners] = useState<string[]>([]);
  const [filterOccasions, setFilterOccasions] = useState<string[]>([]);
  const [filterFabrics, setFilterFabrics] = useState<string[]>([]);
  const [filterColors, setFilterColors] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: collectionData, isLoading: collectionLoading } = useGetCollection(params.slug, {
    query: { enabled: isNamedCollection },
  });

  const { data: productsData, isLoading: productsLoading } = useListProducts(
    { collection: isNamedCollection ? params.slug : undefined, sort, limit: 100 },
    { query: { enabled: true } }
  );

  const isLoading = collectionLoading || productsLoading;
  const allProducts = collectionData?.products ?? productsData?.products ?? [];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (filterDesigners.length > 0 && !filterDesigners.includes(p.brand)) return false;
      if (filterOccasions.length > 0 && !filterOccasions.some(o => p.occasion?.toLowerCase().includes(o.toLowerCase()))) return false;
      if (filterFabrics.length > 0 && !filterFabrics.some(f => p.fabric?.toLowerCase().includes(f.toLowerCase()))) return false;
      if (filterColors.length > 0 && !filterColors.some(c => (p.colors as string[])?.some(pc => pc.toLowerCase().includes(c.toLowerCase())))) return false;
      return true;
    });
  }, [allProducts, filterDesigners, filterOccasions, filterFabrics, filterColors]);

  const collectionName = collectionData?.collection?.name ?? params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const description = collectionData?.collection?.description ?? `Discover our ${collectionName.toLowerCase()} collection, featuring luxurious fabrics, intricate hand-embroidery, and timeless silhouettes.`;

  const activeFilterCount = filterDesigners.length + filterOccasions.length + filterFabrics.length + filterColors.length;

  const clearAllFilters = () => {
    setFilterDesigners([]);
    setFilterOccasions([]);
    setFilterFabrics([]);
    setFilterColors([]);
  };

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item]);
  };

  const FilterSidebar = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-nazakat-gold transition-colors flex items-center gap-1">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["designer", "occasion"]} className="w-full">
        <AccordionItem value="designer" className="border-border">
          <AccordionTrigger className="hover:no-underline text-xs uppercase tracking-wider py-4">
            Designer {filterDesigners.length > 0 && <span className="ml-1 text-nazakat-gold">({filterDesigners.length})</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {DESIGNERS.map((d) => (
                <div key={d} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    id={`d-${d}`}
                    checked={filterDesigners.includes(d)}
                    onCheckedChange={() => toggleItem(filterDesigners, setFilterDesigners, d)}
                    className="border-border rounded-none data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <label htmlFor={`d-${d}`} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">{d}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="occasion" className="border-border">
          <AccordionTrigger className="hover:no-underline text-xs uppercase tracking-wider py-4">
            Occasion {filterOccasions.length > 0 && <span className="ml-1 text-nazakat-gold">({filterOccasions.length})</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {OCCASIONS.map((o) => (
                <div key={o} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    id={`o-${o}`}
                    checked={filterOccasions.includes(o)}
                    onCheckedChange={() => toggleItem(filterOccasions, setFilterOccasions, o)}
                    className="border-border rounded-none data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <label htmlFor={`o-${o}`} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">{o}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fabric" className="border-border">
          <AccordionTrigger className="hover:no-underline text-xs uppercase tracking-wider py-4">
            Fabric {filterFabrics.length > 0 && <span className="ml-1 text-nazakat-gold">({filterFabrics.length})</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {FABRICS.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    id={`f-${f}`}
                    checked={filterFabrics.includes(f)}
                    onCheckedChange={() => toggleItem(filterFabrics, setFilterFabrics, f)}
                    className="border-border rounded-none data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <label htmlFor={`f-${f}`} className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">{f}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color" className="border-border">
          <AccordionTrigger className="hover:no-underline text-xs uppercase tracking-wider py-4">
            Color {filterColors.length > 0 && <span className="ml-1 text-nazakat-gold">({filterColors.length})</span>}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {COLORS_LIST.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleItem(filterColors, setFilterColors, color.name)}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${filterColors.includes(color.name) ? "border-foreground scale-110 ring-2 ring-offset-1 ring-foreground" : "border-transparent"}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div>
      {/* Collection Banner */}
      <div className="bg-muted/30 border-b border-border/40 py-12 md:py-16 text-center px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Collection</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-5">{collectionName}</h1>
        <div className="w-12 h-0.5 bg-nazakat-gold mx-auto mb-5" />
        <p className="max-w-xl mx-auto text-sm text-muted-foreground font-light leading-relaxed">{description}</p>
      </div>

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[...filterDesigners, ...filterOccasions, ...filterFabrics, ...filterColors].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setFilterDesigners(prev => prev.filter(x => x !== tag));
                  setFilterOccasions(prev => prev.filter(x => x !== tag));
                  setFilterFabrics(prev => prev.filter(x => x !== tag));
                  setFilterColors(prev => prev.filter(x => x !== tag));
                }}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider px-3 py-1.5 border border-border hover:border-nazakat-gold hover:text-nazakat-gold transition-colors"
              >
                {tag} <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 lg:gap-14">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-56 lg:w-64 shrink-0">
            <div className="sticky top-32">
              <FilterSidebar />
            </div>
          </div>

          {/* Product Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="md:hidden flex items-center gap-2 text-xs uppercase tracking-wider border border-border px-3 py-2 hover:border-foreground transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <p className="text-xs text-muted-foreground">{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent border-none text-xs uppercase tracking-wider font-medium outline-none cursor-pointer text-foreground"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filters Panel */}
            {mobileFiltersOpen && (
              <div className="md:hidden mb-8 p-6 border border-border bg-background">
                <FilterSidebar />
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-[3/4] bg-muted animate-pulse" />
                    <div className="h-3 bg-muted animate-pulse w-2/3 mx-auto" />
                    <div className="h-4 bg-muted animate-pulse w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-muted-foreground">
                <p className="font-serif text-xl mb-3">No products match your filters</p>
                <button onClick={clearAllFilters} className="text-xs uppercase tracking-widest underline hover:text-nazakat-gold transition-colors">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
