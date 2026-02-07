import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useCreateVenueApplication } from "@/hooks/use-venue-application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  useCreateVenueApplication,
  type VenueApplicationPayload,
} from "@/hooks/use-venue-application";

const venueApplicationSchema = z.object({
  venue: z.string().min(2, "Venue name is required"),
  city: z.string().min(2, "City is required"),
  type: z.string().min(1, "Venue type is required"),
  web: z.string().url().optional().or(z.literal("")),
  contact: z.string().min(2, "Contact name is required"),
  role: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  nights: z.string().min(1, "Preferred nights required"),
  capacity: z.string().min(1, "Capacity information required"),
  payout: z.string().min(1, "Payout preference required"),
  notes: z.string().optional(),
});

type VenueApplicationFormData = VenueApplicationPayload;

export function VenueApplicationForm() {
  const { toast } = useToast();
  const mutation = useCreateVenueApplication();

  const form = useForm<VenueApplicationFormData>({
    resolver: zodResolver(venueApplicationSchema),
    defaultValues: {
      venue: "",
      city: "",
      type: "",
      web: "",
      contact: "",
      role: "",
      email: "",
      phone: "",
      nights: "",
      capacity: "",
      payout: "",
      notes: "",
    },
  });

  const onSubmit = (data: VenueApplicationFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Application submitted!",
          description: "We'll review your application and get back to you within 2 business days.",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      },
    });
  };


  return (
    <section id="application-form" className="py-20 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Partner Application
        </h2>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* VENUE BASICS */}
              <div>
                <h3 className="text-lg font-display font-semibold mb-4">
                  Your Venue
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. The Bistro"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Bristol, London"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={mutation.isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cocktail-bar">
                              Cocktail Bar
                            </SelectItem>
                            <SelectItem value="wine-bar">Wine Bar</SelectItem>
                            <SelectItem value="restaurant">
                              Casual Restaurant
                            </SelectItem>
                            <SelectItem value="fine-dining">
                              Fine Dining
                            </SelectItem>
                            <SelectItem value="hotel-bar">
                              Hotel Bar/Lobby
                            </SelectItem>
                            <SelectItem value="cafe">
                              Café/Coffee Bar
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="web"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website or Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://..."
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* CONTACT */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Contact Person
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full name"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Owner, GM, FOH Manager"
                            {...field}
                            disabled={mutation.isPending}
                          />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@venue.com"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+44..."
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* DATES & CAPACITY */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Dates & Capacity
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nights"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Which evenings?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Tue-Thu after 6pm"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tables per night</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 3-4 tables for two"
                            {...field}
                            disabled={mutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="payout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ideal payout per booking</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={mutation.isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="10-20">£10-20</SelectItem>
                            <SelectItem value="20-30">£20-30</SelectItem>
                            <SelectItem value="30-40">£30-40</SelectItem>
                            <SelectItem value="40-60">£40-60</SelectItem>
                            <SelectItem value="60+">£60+</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ADDITIONAL NOTES */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-display font-semibold mb-4">
                  Anything else?
                </h3>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Special constraints, preferred days, house rules, or ideas for how to make this work..."
                          {...field}
                          disabled={mutation.isPending}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* SUBMIT */}
              <div className="border-t pt-8">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  We'll follow up by email within a few days with next steps
                  and a simple pilot outline.
                </p>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
}