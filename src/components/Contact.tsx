import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
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
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@luxuryproperties.com</p>
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
            
            {/* Contact Form */}
            <div className="bg-card rounded-2xl shadow-2xl p-8 animate-fade-in-scale">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    placeholder="First Name" 
                    className="h-12 border-border"
                  />
                  <Input 
                    placeholder="Last Name" 
                    className="h-12 border-border"
                  />
                </div>
                
                <Input 
                  type="email"
                  placeholder="Email Address" 
                  className="h-12 border-border"
                />
                
                <Input 
                  type="tel"
                  placeholder="Phone Number" 
                  className="h-12 border-border"
                />
                
                <Textarea 
                  placeholder="Tell us about your property requirements..."
                  className="min-h-32 border-border"
                />
                
                <Button variant="premium" size="lg" className="w-full h-12">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
