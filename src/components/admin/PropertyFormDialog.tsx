import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProperty, useUpdateProperty, Property } from "@/hooks/useProperties";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().trim().min(2, "Title is required").max(200),
  description: z.string().trim().max(2000).optional(),
  location: z.string().trim().min(2, "Location is required").max(200),
  price: z.coerce.number().min(0, "Price must be positive"),
  price_display: z.string().trim().min(1, "Display price is required"),
  beds: z.coerce.number().min(0).max(50),
  baths: z.coerce.number().min(0).max(50),
  sqft: z.string().trim().min(1, "Square footage is required"),
  property_type: z.string().min(1, "Property type is required"),
  image_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  amenities: z.string().optional(),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
}

export const PropertyFormDialog = ({
  open,
  onOpenChange,
  property,
}: PropertyFormDialogProps) => {
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const isEditing = !!property;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: 0,
      price_display: "",
      beds: 0,
      baths: 0,
      sqft: "",
      property_type: "apartment",
      image_url: "",
      amenities: "",
      featured: false,
    },
  });

  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description || "",
        location: property.location,
        price: property.price,
        price_display: property.price_display,
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        property_type: property.property_type,
        image_url: property.image_url || "",
        amenities: property.amenities?.join(", ") || "",
        featured: property.featured,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        location: "",
        price: 0,
        price_display: "",
        beds: 0,
        baths: 0,
        sqft: "",
        property_type: "apartment",
        image_url: "",
        amenities: "",
        featured: false,
      });
    }
  }, [property, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const amenitiesArray = values.amenities
        ? values.amenities.split(",").map((a) => a.trim()).filter(Boolean)
        : [];

      if (isEditing) {
        await updateProperty.mutateAsync({
          id: property.id,
          title: values.title,
          description: values.description || null,
          location: values.location,
          price: values.price,
          price_display: values.price_display,
          beds: values.beds,
          baths: values.baths,
          sqft: values.sqft,
          property_type: values.property_type,
          image_url: values.image_url || null,
          images: [],
          amenities: amenitiesArray,
          featured: values.featured,
          status: "available",
        });
        toast({ title: "Property updated successfully" });
      } else {
        await createProperty.mutateAsync({
          title: values.title,
          description: values.description || null,
          location: values.location,
          price: values.price,
          price_display: values.price_display,
          beds: values.beds,
          baths: values.baths,
          sqft: values.sqft,
          property_type: values.property_type,
          image_url: values.image_url || null,
          images: [],
          amenities: amenitiesArray,
          featured: values.featured,
          status: "available",
        });
        toast({ title: "Property created successfully" });
      }

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} property`,
        variant: "destructive",
      });
    }
  };

  const isSubmitting = createProperty.isPending || updateProperty.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Property" : "Add New Property"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Luxury Penthouse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Manhattan, New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the property..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="8500000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_display"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Price</FormLabel>
                    <FormControl>
                      <Input placeholder="$8.5M" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Footage</FormLabel>
                    <FormControl>
                      <Input placeholder="4,500 sq ft" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="property_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover">
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="mansion">Mansion</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amenities (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Pool, Gym, Parking, Smart Home" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Property</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Display this property on the homepage
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="premium" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Property"
                ) : (
                  "Create Property"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
