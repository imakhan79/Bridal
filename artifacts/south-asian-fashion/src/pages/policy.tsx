import { Link } from "wouter";

function PolicyLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 border-b border-border/40 py-14 text-center px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Nazakat</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-5">{title}</h1>
        <div className="w-12 h-0.5 bg-nazakat-gold mx-auto" />
        {subtitle && <p className="text-sm text-muted-foreground mt-5 max-w-lg mx-auto">{subtitle}</p>}
      </div>
      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <PolicyLayout
      title="About Nazakat"
      subtitle="Crafting luxury South Asian fashion for discerning clientele worldwide since 2014."
    >
      <h2>Our Story</h2>
      <p>
        Nazakat was founded in Lahore with a single vision: to make the finest South Asian couture accessible to diaspora communities across the United States, United Kingdom, Canada, Australia, and beyond. The word "Nazakat" — meaning grace and elegance in Urdu — encapsulates everything we stand for.
      </p>
      <p>
        Over the past decade, we have grown from a boutique in Gulberg to a globally recognized luxury fashion house, shipping handcrafted designer wear to over 50 countries. Every piece we sell is sourced directly from Pakistan's most celebrated designers, including HSY, Azeera, Haseens Official, and Nameera by Farooq.
      </p>

      <h2>Our Designers</h2>
      <p>We partner exclusively with designers who share our commitment to craftsmanship, exclusivity, and cultural authenticity:</p>
      <ul>
        <li><strong>HSY (Hassan Sheheryar Yasin)</strong> — Pakistan's most celebrated couturier, known for opulent bridal collections and show-stopping red carpet pieces.</li>
        <li><strong>Azeera</strong> — Renowned for delicate thread-work, minimal silhouettes, and timeless sophistication.</li>
        <li><strong>Haseens Official</strong> — Masters of traditional Pakistani embroidery with a contemporary twist, beloved for Eid and festive collections.</li>
        <li><strong>Nameera by Farooq</strong> — The go-to for statement formal wear, elaborate sequin work, and luxury pret.</li>
      </ul>

      <h2>Our Promise</h2>
      <p>
        Every outfit you purchase from Nazakat is authenticated directly by the designer house, crafted by master artisans, and shipped in premium packaging with a certificate of authenticity. We do not sell replicas, copies, or grey-market pieces. What you receive is exactly what you see — or better.
      </p>

      <h2>Custom Tailoring</h2>
      <p>
        We understand that finding the perfect fit for South Asian silhouettes can be a challenge, especially internationally. That is why every order includes a complimentary custom tailoring service — send us your measurements, and our team in Lahore will tailor the piece to your exact body measurements before shipping.
      </p>

      <h2>Global Boutiques</h2>
      <p>We have physical boutique showrooms in Lahore, Dubai, and hold private trunk shows in London and Toronto. Contact us to schedule an appointment.</p>

      <div className="mt-10 flex flex-wrap gap-4 not-prose">
        <Link href="/pages/contact-us" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors">
          Contact Our Team
        </Link>
        <Link href="/collections/bridal" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-border px-5 py-3 hover:border-nazakat-gold hover:text-nazakat-gold transition-colors">
          Shop Bridal
        </Link>
      </div>
    </PolicyLayout>
  );
}

export function SizeChartPage() {
  return (
    <PolicyLayout
      title="Size Guide"
      subtitle="All our pieces can be custom tailored at no extra charge. Find your perfect fit below."
    >
      <h2>How to Measure</h2>
      <p>For the best results, have someone else take your measurements. Stand straight and wear minimal clothing. All measurements are in inches.</p>
      <ul>
        <li><strong>Bust:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor.</li>
        <li><strong>Waist:</strong> Measure around the narrowest part of your waist, usually 1 inch above your navel.</li>
        <li><strong>Hips:</strong> Measure around the fullest part of your hips, about 8 inches below your waist.</li>
        <li><strong>Length:</strong> From the highest point of your shoulder to where you want the dress to end.</li>
        <li><strong>Sleeve:</strong> From the top of your shoulder to your wrist.</li>
        <li><strong>Shoulder:</strong> From the edge of one shoulder to the other, across your back.</li>
      </ul>

      <h2>Standard Size Chart</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse mb-8">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Size</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Bust (in)</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Waist (in)</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider">Hips (in)</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["XS", "32–33", "26–27", "35–36"],
              ["S", "34–35", "28–29", "37–38"],
              ["M", "36–37", "30–31", "39–40"],
              ["L", "38–40", "32–34", "41–43"],
              ["XL", "41–43", "35–37", "44–46"],
              ["XXL", "44–46", "38–40", "47–49"],
              ["3XL", "47–49", "41–43", "50–52"],
            ].map(([size, bust, waist, hips]) => (
              <tr key={size} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{size}</td>
                <td className="py-3 px-4">{bust}</td>
                <td className="py-3 px-4">{waist}</td>
                <td className="py-3 px-4">{hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lehenga & Pishwas Sizing</h2>
      <p>
        Lehengas are measured by bust and waist for the choli (top) and by waist and hips for the skirt. When in doubt, size up — our tailors can take a piece in, but they cannot let it out beyond seam limits.
      </p>

      <h2>Custom Measurements</h2>
      <p>
        All our made-to-order pieces are custom tailored at no extra charge. When you order, we will send you a detailed measurement form via WhatsApp or email. Our tailors have over 20 years of experience and will work with you directly to ensure a perfect fit.
      </p>
      <p>
        For brides, we strongly recommend a virtual consultation with our stylist team before placing your order to discuss silhouette, embellishments, and any alterations.
      </p>

      <div className="mt-10 not-prose">
        <a
          href="https://wa.me/12345678901?text=Hello, I need help with sizing and measurements for my order."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-[#25D366] text-white px-5 py-3 hover:bg-[#128C7E] transition-colors"
        >
          Get Sizing Help on WhatsApp
        </a>
      </div>
    </PolicyLayout>
  );
}

export function ShippingPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Free worldwide shipping on all orders. We deliver to over 50 countries."
    >
      <h2>International Shipping</h2>
      <p>
        Nazakat offers <strong>complimentary worldwide shipping</strong> on all orders, regardless of order value. We ship via DHL Express to ensure your purchase arrives safely, on time, and fully tracked.
      </p>

      <h2>Delivery Timeframes</h2>
      <ul>
        <li><strong>Ready-to-Wear (in stock):</strong> 5–10 business days to USA, UK, Canada, Australia. 3–7 days within Pakistan.</li>
        <li><strong>Made-to-Order / Custom Tailored:</strong> 8–12 weeks from the date your measurements are confirmed.</li>
        <li><strong>Express Rush Orders:</strong> Contact us — we can expedite certain pieces for an additional fee.</li>
        <li><strong>Bridal:</strong> We recommend ordering at least 16 weeks before your wedding date to allow for production, shipping, and any minor alterations.</li>
      </ul>

      <h2>Order Tracking</h2>
      <p>
        Once your order is dispatched, you will receive an email and WhatsApp message with your DHL tracking number. You can track your shipment in real time at <strong>dhl.com</strong>.
      </p>

      <h2>Customs & Duties</h2>
      <p>
        Most countries do not charge import duties on clothing below a certain threshold. However, for high-value orders, customs duties or import taxes may apply depending on your country of residence. These are the buyer's responsibility and are not included in the shipping price.
      </p>
      <p>
        <strong>UK Customers:</strong> Post-Brexit, orders over £135 may be subject to import VAT. We will include the necessary customs documentation to minimize delays.
      </p>

      <h2>Packaging</h2>
      <p>
        Every Nazakat order is packaged in our signature ivory and gold gift box, with acid-free tissue paper and a care card. Bridal orders include a premium garment bag, fabric swatch, and a handwritten congratulations note.
      </p>

      <h2>Pakistan Domestic Shipping</h2>
      <p>
        Domestic orders within Pakistan ship via TCS or Leopards Courier. Flat rate: PKR 15,000. Lahore same-day delivery available for orders placed before 12 PM (additional charges apply).
      </p>

      <div className="mt-10 not-prose">
        <Link href="/pages/contact-us" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-border px-5 py-3 hover:border-nazakat-gold hover:text-nazakat-gold transition-colors">
          Contact Us About Your Order
        </Link>
      </div>
    </PolicyLayout>
  );
}

export function ReturnPage() {
  return (
    <PolicyLayout
      title="Returns & Exchanges"
      subtitle="We stand behind the quality of every piece. Your satisfaction is our priority."
    >
      <h2>Custom & Made-to-Order Items</h2>
      <p>
        Because every piece is crafted specifically for you — tailored to your measurements, with your chosen colors and fabrics — custom and made-to-order items <strong>cannot be returned or exchanged</strong> once production has begun.
      </p>
      <p>
        However, if your item does not fit as expected, we offer <strong>complimentary alteration assistance</strong>. We will connect you with a trusted tailor in your city, and cover the cost of minor alterations up to $75 USD (or local equivalent) upon submission of a receipt.
      </p>

      <h2>Ready-to-Wear Returns</h2>
      <p>
        In-stock ready-to-wear items may be returned within <strong>14 days</strong> of the delivery date, provided:
      </p>
      <ul>
        <li>The item is unworn, unwashed, and undamaged.</li>
        <li>All original tags and packaging are intact.</li>
        <li>The garment has not been altered or customized.</li>
        <li>You contact us at support@nazakat.com before sending the item back.</li>
      </ul>
      <p>
        Returns are processed within 5–7 business days of receiving the item. Refunds are issued to the original payment method. Please note: return shipping costs are the customer's responsibility unless the return is due to a defect or error on our part.
      </p>

      <h2>Defective or Incorrect Items</h2>
      <p>
        If you receive a defective item or the wrong piece, we will arrange collection at no cost and either replace the item or issue a full refund — whichever you prefer. Please contact us within 48 hours of delivery and share photographs of the issue.
      </p>

      <h2>Bridal Policy</h2>
      <p>
        We understand that bridal pieces are deeply personal. If you have concerns about your bridal order, please contact us before the wedding. We go above and beyond to ensure every bride feels her best on her special day, including organizing same-country emergency alterations where possible.
      </p>

      <h2>How to Initiate a Return</h2>
      <ul>
        <li>Email <strong>support@nazakat.com</strong> with your order number and reason for return.</li>
        <li>Our team will respond within 24 hours with instructions.</li>
        <li>Ship the item back in its original packaging.</li>
        <li>Once received and inspected, your refund or exchange will be processed.</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-4 not-prose">
        <a
          href="mailto:support@nazakat.com"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          Email Returns Team
        </a>
        <a
          href="https://wa.me/12345678901?text=Hello, I need help with a return or exchange."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-border px-5 py-3 hover:border-nazakat-gold hover:text-nazakat-gold transition-colors"
        >
          WhatsApp Support
        </a>
      </div>
    </PolicyLayout>
  );
}
