import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
}

export const PropertyCard = ({
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
}: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-scale">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-accent text-primary px-4 py-2 rounded-lg font-bold shadow-lg">
          {price}
        </div>
      </div>
      <CardContent className="p-6 bg-card">
        <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-6 mb-4 text-foreground">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-accent" />
            <span className="font-semibold">{beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-accent" />
            <span className="font-semibold">{baths} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-accent" />
            <span className="font-semibold">{sqft}</span>
          </div>
        </div>
        <Button variant="hero" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
