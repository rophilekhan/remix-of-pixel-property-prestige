import { useState } from "react";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      // Data ko Supabase table "contact_messages" mein bhej rahe hain
      const { error } = await supabase
        .from("contact_messages")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully, Thank you!",
      });
      
      // Form ko clear kar dena submit ke baad
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info Section */}
            <div className="animate-slide-in-right">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Get In <span className="text-accent">Touch</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to find your dream property? Our expert team is here to assist you every step of the way.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+92 331 2699111</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">contact.codesphinx@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      123 Luxury Avenue<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form Section */}
            <div className="bg-card rounded-2xl shadow-2xl p-8 animate-fade-in-scale border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    name="firstName" 
                    placeholder="First Name" 
                    required 
                    className="h-12 border-border bg-background" 
                  />
                  <Input 
                    name="lastName" 
                    placeholder="Last Name" 
                    required 
                    className="h-12 border-border bg-background" 
                  />
                </div>
                
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="h-12 border-border bg-background" 
                />
                
                <Input 
                  name="phone" 
                  type="tel" 
                  placeholder="Phone Number (Optional)" 
                  className="h-12 border-border bg-background" 
                />
                
                <Textarea 
                  name="message" 
                  placeholder="Tell us about your property requirements..." 
                  required 
                  className="min-h-32 border-border bg-background resize-none" 
                />
                
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full h-12 text-lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};