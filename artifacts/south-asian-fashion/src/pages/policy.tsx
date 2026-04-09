export function InfoPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif">
        <p className="lead">
          Welcome to Nazakat. We pride ourselves on providing the highest quality luxury South Asian fashion to clients worldwide.
        </p>
        <h2>Our Process</h2>
        <p>
          Every piece is crafted with meticulous attention to detail by our master artisans in Lahore. From the initial design consultation to the final fitting, we ensure a seamless experience.
        </p>
        <h2>Shipping & Delivery</h2>
        <p>
          We offer complimentary worldwide shipping on all orders. Made-to-order pieces typically require 8-12 weeks for production and delivery.
        </p>
        <h2>Returns</h2>
        <p>
          Due to the custom nature of our couture pieces, we do not accept returns on made-to-order items. Ready-to-wear items may be returned within 14 days of receipt.
        </p>
      </div>
    </div>
  );
}
