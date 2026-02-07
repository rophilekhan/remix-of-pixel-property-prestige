import { Link } from "react-router-dom";
import { PropertyCard } from "./PropertyCard";
import { useFeaturedProperties, useProperties, PropertyFilters, Property } from "@/hooks/useProperties";
import { Loader2 } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

// Fallback images for properties without image_url
const fallbackImages = [property1, property2, property3, property4];

interface FeaturedPropertiesProps {
  filters?: PropertyFilters;
  showFiltered?: boolean;
}

export const FeaturedProperties = ({ filters, showFiltered = false }: FeaturedPropertiesProps) => {
  const featuredQuery = useFeaturedProperties();
  const filteredQuery = useProperties(filters);

  const query = showFiltered ? filteredQuery : featuredQuery;
  const { data: properties, isLoading } = query;

  const getImage = (property: Property, index: number) => {
    if (property.image_url && property.image_url !== "/placeholder.svg") {
      return property.image_url;
    }
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <section className="py-24 bg-background" id="properties">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            {showFiltered ? "Search " : "Featured "}<span className="text-accent">Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {showFiltered 
              ? "Properties matching your search criteria"
              : "Handpicked selection of the most exquisite properties available"
            }
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property, index) => (
              <Link 
                key={property.id} 
                to={`/property/${property.id}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard 
                  image={getImage(property, index)}
                  title={property.title}
                  location={property.location}
                  price={property.price_display}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {showFiltered 
                ? "No properties found matching your criteria. Try adjusting your search."
                : "No featured properties available."
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
