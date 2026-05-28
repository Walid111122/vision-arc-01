import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the incoming data against our Zod schema
    const validatedData = contactFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid form data.", details: validatedData.error.issues },
        { status: 400 }
      );
    }

    const { name, email, service, budget, details } = validatedData.data;

    // 2. Fallback for testing: if no API key is set, simulate a successful send
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("placeholder")) {
      console.log("=========================================");
      console.log("📨 SIMULATED EMAIL SEND (No valid Resend Key)");
      console.log(`From: ${name} <${email}>`);
      console.log(`Service: ${service} | Budget: ${budget}`);
      console.log(`Details: ${details}`);
      console.log("=========================================");
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      return NextResponse.json(
        { message: "Simulated success. Add RESEND_API_KEY to send real emails." },
        { status: 200 }
      );
    }

    // 3. Send the actual email using Resend
    // Note: You must verify your sending domain on Resend, or use 'onboarding@resend.dev' for testing
    const data = await resend.emails.send({
      from: "VisionArc Contact <onboarding@resend.dev>", // Replace with your verified domain (e.g., hello@visionarc.com)
      to: ["arc.sainai@gmail.com"], // Replace with your actual receiving email address
      replyTo: email,
      subject: `New Inquiry from ${name} - ${service}`,
      text: `
        Name: ${name}
        Email: ${email}
        Service Required: ${service}
        Estimated Budget: ${budget}
        
        Project Details:
        ${details}
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Inquiry sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
