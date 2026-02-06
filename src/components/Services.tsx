import { Building2, Key, TrendingUp, Shield } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Property Sales",
    description: "Expert guidance through every step of buying your dream luxury property",
  },
  {
    icon: Key,
    title: "Property Management",
    description: "Comprehensive management services to maintain your investment's value",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Strategic insights to maximize returns on your property portfolio",
  },
  {
    icon: Shield,
    title: "Legal Support",
    description: "Complete legal assistance ensuring smooth and secure transactions",
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-accent">Services</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Comprehensive solutions for all your luxury property needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-accent hover:text-primary transition-all duration-500 animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <service.icon className="w-12 h-12 mb-6 text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-primary-foreground/70 group-hover:text-primary/80">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
