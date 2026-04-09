import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInquiry } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  dressInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const DRESS_OPTIONS = [
  "Bridal Lehenga",
  "Formal Suit",
  "Eid Collection",
  "Couture / Made to Order",
  "Menswear / Sherwani",
  "Wedding Guest",
  "Other",
];

const PHONE_NUMBERS = [
  { country: "USA", number: "+1 (888) 123-4567" },
  { country: "UK", number: "+44 20 1234 5678" },
  { country: "Canada", number: "+1 (888) 987-6543" },
  { country: "Australia", number: "+61 2 1234 5678" },
  { country: "Pakistan", number: "+92 300 1234567" },
];

export function Contact() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", dressInterest: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createInquiry.mutate(
      { data: { name: values.name, email: values.email, phone: values.phone, dressInterest: values.dressInterest, message: values.message } },
      {
        onSuccess: () => {
          toast({ title: "Inquiry Sent", description: "Our team will be in touch within 24 hours." });
          form.reset();
        },
        onError: () => {
          toast({ title: "Something went wrong", description: "Please try again or contact us via WhatsApp.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-muted/30 border-b border-border/40 py-14 text-center px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Get in Touch</p>
        <h1 className="text-4xl md:text-5xl font-serif mb-5">Contact Our Atelier</h1>
        <div className="w-12 h-0.5 bg-nazakat-gold mx-auto" />
      </div>

      <div className="container mx-auto px-4 py-14 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Inquiry Form */}
          <div>
            <h2 className="font-serif text-2xl mb-2">Send an Inquiry</h2>
            <p className="text-sm text-muted-foreground mb-8">Fill out the form below and one of our stylists will respond within 24 hours.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider">Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Fatima Khan" className="rounded-none border-border/60 bg-transparent focus:border-nazakat-gold h-11" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider">Email Address *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="fatima@example.com" className="rounded-none border-border/60 bg-transparent focus:border-nazakat-gold h-11" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider">Phone / WhatsApp</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1 (888) 123-4567" className="rounded-none border-border/60 bg-transparent focus:border-nazakat-gold h-11" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="dressInterest" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider">I'm Interested In</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full h-11 px-3 border border-border/60 bg-transparent text-sm text-foreground focus:border-nazakat-gold focus:outline-none transition-colors"
                      >
                        <option value="">Select an option...</option>
                        {DRESS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider">Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your event, preferred colors, budget range, and any customization requests..."
                        className="rounded-none border-border/60 bg-transparent focus:border-nazakat-gold min-h-[140px] resize-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />

                <Button
                  type="submit"
                  disabled={createInquiry.isPending}
                  className="w-full h-12 rounded-none bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-xs"
                >
                  {createInquiry.isPending ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            {/* WhatsApp */}
            <div>
              <h2 className="font-serif text-2xl mb-4">WhatsApp Us Directly</h2>
              <p className="text-sm text-muted-foreground mb-5">For the fastest response, reach us on WhatsApp. Our stylists are available 24/7.</p>
              <a
                href="https://wa.me/12345678901?text=Hello, I'd like to inquire about a piece from Nazakat."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 text-sm font-medium hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Regional Numbers */}
            <div>
              <h2 className="font-serif text-2xl mb-5">Global Contact Numbers</h2>
              <ul className="space-y-4">
                {PHONE_NUMBERS.map(({ country, number }) => (
                  <li key={country} className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-nazakat-gold shrink-0" strokeWidth={1.5} />
                    <span className="text-muted-foreground min-w-[70px]">{country}:</span>
                    <a href={`tel:${number.replace(/\s/g, "")}`} className="font-medium hover:text-nazakat-gold transition-colors">{number}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Email</h2>
              <a href="mailto:support@nazakat.com" className="flex items-center gap-3 text-sm hover:text-nazakat-gold transition-colors group">
                <Mail className="w-4 h-4 text-nazakat-gold" strokeWidth={1.5} />
                <span className="group-hover:underline underline-offset-4">support@nazakat.com</span>
              </a>
            </div>

            {/* Boutique Locations */}
            <div>
              <h2 className="font-serif text-2xl mb-5">Visit Our Atelier</h2>
              <ul className="space-y-4">
                {[
                  { city: "Lahore", address: "MM Alam Road, Gulberg III, Lahore, Pakistan" },
                  { city: "Dubai", address: "Fashion Avenue, Dubai Mall, UAE" },
                  { city: "London", address: "By appointment — contact for details" },
                ].map(({ city, address }) => (
                  <li key={city} className="flex gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-nazakat-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <p className="font-medium">{city}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{address}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
