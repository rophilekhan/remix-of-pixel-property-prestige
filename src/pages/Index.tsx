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
      <SearchSection onSearch={handleSearch} />
      <FeaturedProperties filters={filters} showFiltered={isSearching} />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
