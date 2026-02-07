import { useState, useCallback } from "react";
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { PropertyFilters } from "@/hooks/useProperties";

const Index = () => {
  const [filters, setFilters] = useState<PropertyFilters | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((newFilters: PropertyFilters) => {
    const hasFilters = newFilters.location || 
      (newFilters.propertyType && newFilters.propertyType !== "all") || 
      (newFilters.priceRange && newFilters.priceRange !== "all");
    
    setFilters(hasFilters ? newFilters : undefined);
    setIsSearching(!!hasFilters);

    // Scroll to properties section
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <div id="search-section">
        <SearchSection onSearch={handleSearch} />
      </div>
      {/* Yahan ID "properties" add kar di hai */}
      <section id="properties" className="scroll-mt-20">
        <FeaturedProperties filters={filters} showFiltered={isSearching} />
      </section>
      <Services />
      <Testimonials />
      {/* Contact section ke liye id */}
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
};

export default Index;