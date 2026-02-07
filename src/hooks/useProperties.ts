import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  price: number;
  price_display: string;
  beds: number;
  baths: number;
  sqft: string;
  property_type: string;
  image_url: string | null;
  images: string[];
  amenities: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  location?: string;
  propertyType?: string;
  priceRange?: string;
}

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      let query = supabase.from("properties").select("*");

      if (filters?.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters?.propertyType && filters.propertyType !== "all") {
        query = query.eq("property_type", filters.propertyType);
      }

      if (filters?.priceRange) {
        const [min, max] = getPriceRange(filters.priceRange);
        if (min !== null) query = query.gte("price", min);
        if (max !== null) query = query.lte("price", max);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Property | null;
    },
    enabled: !!id,
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (property: Omit<Property, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("properties")
        .insert(property)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...property }: Partial<Property> & { id: string }) => {
      const { data, error } = await supabase
        .from("properties")
        .update(property)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("properties").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

function getPriceRange(range: string): [number | null, number | null] {
  switch (range) {
    case "1m-3m":
      return [1000000, 3000000];
    case "3m-5m":
      return [3000000, 5000000];
    case "5m-10m":
      return [5000000, 10000000];
    case "10m+":
      return [10000000, null];
    default:
      return [null, null];
  }
}
