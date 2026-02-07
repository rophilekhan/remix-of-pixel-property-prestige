import { useState, useCallback } from "react";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFilters } from "@/hooks/useProperties";

interface SearchSectionProps {
  onSearch?: (filters: PropertyFilters) => void;
}

export const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = useCallback(() => {
    onSearch?.({
      location: location || undefined,
      propertyType: propertyType || undefined,
      priceRange: priceRange || undefined,
    });
  }, [location, propertyType, priceRange, onSearch]);

  const handleQuickSearch = useCallback((tag: string) => {
    setLocation(tag);
    onSearch?.({
      location: tag,
      propertyType: propertyType || undefined,
      priceRange: priceRange || undefined,
    });
  }, [propertyType, priceRange, onSearch]);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Find Your <span className="text-accent">Dream Property</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Search through our extensive collection of luxury properties
            </p>
          </div>
          
          <div className="bg-card rounded-2xl shadow-2xl p-8 animate-fade-in-scale">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent w-5 h-5" />
                <Input 
                  placeholder="Location" 
                  className="pl-10 h-12 border-border"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12 border-border">
                  <Home className="w-5 h-5 text-accent mr-2" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="mansion">Mansion</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12 border-border">
                  <DollarSign className="w-5 h-5 text-accent mr-2" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="1m-3m">$1M - $3M</SelectItem>
                  <SelectItem value="3m-5m">$3M - $5M</SelectItem>
                  <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                  <SelectItem value="10m+">$10M+</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="premium" size="lg" className="h-12" onClick={handleSearch}>
                <Search className="mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="text-muted-foreground">Popular:</span>
              {["Beach Front", "City Center", "Mountain View", "Golf Course"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickSearch(tag)}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-all duration-300 text-sm font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
