import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createContext, useContext, useState, ReactNode } from "react";

import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { ProductDetail } from "@/pages/product-detail";
import { Collection } from "@/pages/collection";
import { Contact } from "@/pages/contact";
import { AboutPage, SizeChartPage, ShippingPage, ReturnPage } from "@/pages/policy";
import NotFound from "@/pages/not-found";

type Currency = "USD" | "PKR" | "GBP" | "AED" | "AUD";

interface CartItem { slug: string; name: string; brand: string; image: string; size: string; priceUsd: number | null; quantity: number; }
interface StoreCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (slug: string, size: string) => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
}

const StoreContext = createContext<StoreCtx | null>(null);
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}

function StoreProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.slug === item.slug && i.size === item.size);
      if (existing) return prev.map(i => i.slug === item.slug && i.size === item.size ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, item];
    });
  };

  const removeFromCart = (slug: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.slug === slug && i.size === size)));
  };

  const toggleWishlist = (slug: string) => {
    setWishlist(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  };

  return (
    <StoreContext.Provider value={{ currency, setCurrency, cart, addToCart, removeFromCart, wishlist, toggleWishlist }}>
      {children}
    </StoreContext.Provider>
  );
}

const queryClient = new QueryClient();

function Router() {
  const { currency, setCurrency, cart, wishlist } = useStore();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Layout currency={currency} onCurrencyChange={setCurrency} cartCount={cartCount} wishlistCount={wishlist.length}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collections/:slug" component={Collection} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/pages/contact-us" component={Contact} />
        <Route path="/pages/about-us" component={AboutPage} />
        <Route path="/pages/size-chart" component={SizeChartPage} />
        <Route path="/pages/shipping-policy" component={ShippingPage} />
        <Route path="/pages/return-policy" component={ReturnPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </StoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
