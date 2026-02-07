import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProperty } from "@/hooks/useProperties";
import { ScheduleViewingForm } from "@/components/ScheduleViewingForm";
import { PropertyGallery } from "@/components/PropertyGallery";
import { Footer } from "@/components/Footer";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, error } = useProperty(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading property...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
        <Link to="/">
          <Button variant="hero">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-4 px-6">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center text-primary-foreground hover:text-accent transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </header>

      {/* Property Gallery */}
      <PropertyGallery 
        images={property.images.length > 0 ? property.images : [property.image_url || "/placeholder.svg"]} 
        title={property.title}
      />

      {/* Property Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <div className="inline-block bg-accent text-primary px-4 py-2 rounded-lg font-bold text-2xl mb-4">
                {property.price_display}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground text-lg">
                <MapPin className="w-5 h-5" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap gap-6 p-6 bg-secondary/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Bed className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="text-xl font-bold text-foreground">{property.beds}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Bath className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="text-xl font-bold text-foreground">{property.baths}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Square className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Living Area</p>
                  <p className="text-xl font-bold text-foreground">{property.sqft}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {property.description || "No description available."}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Schedule Viewing */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-foreground">Schedule a Viewing</h3>
                </div>
                <ScheduleViewingForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
