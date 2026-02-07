import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ViewingRequest {
  id: string;
  property_id: string;
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: string;
  created_at: string;
}

export interface CreateViewingRequest {
  property_id: string;
  name: string;
  email: string;
  phone?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export const useCreateViewingRequest = () => {
  return useMutation({
    mutationFn: async (request: CreateViewingRequest) => {
      const { data, error } = await supabase
        .from("viewing_requests")
        .insert(request)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
};

export const useViewingRequests = () => {
  return useQuery({
    queryKey: ["viewing_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("viewing_requests")
        .select("*, properties(title, location)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateViewingRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("viewing_requests")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["viewing_requests"] });
    },
  });
};
