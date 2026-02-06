import { PropertyCard } from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "Sky High Penthouse",
    location: "Manhattan, New York",
    price: "$8.5M",
    beds: 4,
    baths: 5,
    sqft: "4,500 sq ft",
  },
  {
    id: 2,
    image: property2,
    title: "Ocean View Villa",
    location: "Malibu, California",
    price: "$12.3M",
    beds: 5,
    baths: 6,
    sqft: "6,200 sq ft",
  },
  {
    id: 3,
    image: property3,
    title: "Alpine Mountain Chalet",
    location: "Aspen, Colorado",
    price: "$9.8M",
    beds: 6,
    baths: 7,
    sqft: "7,800 sq ft",
  },
  {
    id: 4,
    image: property4,
    title: "Urban Industrial Loft",
    location: "Brooklyn, New York",
    price: "$3.2M",
    beds: 3,
    baths: 3,
    sqft: "3,200 sq ft",
  },
];

export const FeaturedProperties = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Featured <span className="text-accent">Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of the most exquisite properties available
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
