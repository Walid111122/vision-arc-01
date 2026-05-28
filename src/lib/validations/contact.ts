import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  service: z.enum(["branding", "social", "web", "other"], {
    required_error: "Please select a service.",
  }),
  budget: z.enum(["small", "medium", "large"], {
    required_error: "Please select a budget range.",
  }),
  details: z.string().min(10, "Please provide a bit more detail (at least 10 characters)."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
