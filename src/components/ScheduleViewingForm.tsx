import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateViewingRequest } from "@/hooks/useViewingRequests";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Schema stays the same but added a small check for phone
const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().optional(),
  preferred_date: z.date({ required_error: "Please select a date" }),
  preferred_time: z.string().min(1, "Please select a time"),
  message: z.string().trim().max(500, "Message is too long").optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ScheduleViewingFormProps {
  propertyId: string;
  propertyTitle: string;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export const ScheduleViewingForm = ({ propertyId, propertyTitle }: ScheduleViewingFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createRequest = useCreateViewingRequest();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Data ko Supabase ke format mein mutate karna
      await createRequest.mutateAsync({
        property_id: propertyId,
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        // SQL DATE format (yyyy-MM-dd)
        preferred_date: format(values.preferred_date, "yyyy-MM-dd"),
        preferred_time: values.preferred_time,
        message: values.message || null,
      });

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: `Request sent for ${propertyTitle}.`,
      });
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Submission Failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CalendarIcon className="w-8 h-8 text-accent" />
        </div>
        <h4 className="text-xl font-bold mb-2">Request Sent!</h4>
        <p className="text-muted-foreground text-sm">
          Our team will contact you shortly to confirm your viewing of {propertyTitle}.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} className="bg-background" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preferred_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-background",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferred_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-background border shadow-md">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your requirements..." 
                  className="resize-none bg-background" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="premium"
          className="w-full py-6 text-lg"
          disabled={createRequest.isPending}
        >
          {createRequest.isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm Schedule"
          )}
        </Button>
      </form>
    </Form>
  );
};