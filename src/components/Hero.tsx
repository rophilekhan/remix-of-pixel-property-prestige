import { Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-property.jpg";

export const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in">
          Luxury Living <span className="block text-accent">Redefined</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up">
          Discover extraordinary properties that match your vision of the perfect home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button 
            variant="premium" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => scrollTo("properties")}
          >
            <Search className="mr-2" />
            Explore Properties
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            onClick={() => scrollTo("contact")}
          >
            <Calendar className="mr-2" />
            Schedule Viewing
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 animate-fade-in">
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-accent">500+</div>
            <div className="text-sm">Properties</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-accent">98%</div>
            <div className="text-sm">Happy Clients</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold text-accent">25+</div>
            <div className="text-sm">Awards</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};