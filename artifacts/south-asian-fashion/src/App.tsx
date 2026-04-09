import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { ProductDetail } from "@/pages/product-detail";
import { Collection } from "@/pages/collection";
import { Contact } from "@/pages/contact";
import { InfoPage } from "@/pages/policy";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/collections/:slug" component={Collection} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/pages/contact-us" component={Contact} />
        <Route path="/pages/about-us">
          {() => <InfoPage title="About Us" />}
        </Route>
        <Route path="/pages/size-chart">
          {() => <InfoPage title="Size Chart" />}
        </Route>
        <Route path="/pages/shipping-policy">
          {() => <InfoPage title="Shipping Policy" />}
        </Route>
        <Route path="/pages/return-policy">
          {() => <InfoPage title="Return Policy" />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
