import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInquiry } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
});

export function Contact() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createInquiry.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "Inquiry Sent", description: "We will get back to you shortly." });
        form.reset();
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
      <h1 className="text-4xl font-serif text-center mb-16">Contact Our Atelier</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-2xl mb-6">Send an Inquiry</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} className="rounded-none border-border bg-transparent" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} type="email" className="rounded-none border-border bg-transparent" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} className="rounded-none border-border bg-transparent" /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea {...field} className="rounded-none border-border bg-transparent min-h-[150px]" /></FormControl></FormItem>
              )} />
              <Button type="submit" disabled={createInquiry.isPending} className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest">
                Submit Inquiry
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="space-y-12">
          <div>
            <h2 className="font-serif text-2xl mb-6">Boutique Locations</h2>
            <div className="space-y-4 text-muted-foreground">
              <p><strong>Lahore:</strong> MM Alam Road, Gulberg III</p>
              <p><strong>Dubai:</strong> Knightsbridge, London</p>
              <p><strong>New York:</strong> 5th Avenue</p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-6">Global Contact Numbers</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>USA: +1 (888) 123-4567</p>
              <p>UK: +44 20 1234 5678</p>
              <p>Canada: +1 (888) 987-6543</p>
              <p>Australia: +61 2 1234 5678</p>
              <p>Pakistan: +92 300 1234567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
