"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";

/* ─── Spring config ─────────────────────────────────────────────────────── */
const spring = { type: "spring", stiffness: 200, damping: 24, mass: 1 } as const;

export function ContactForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 4 = Success, 5 = Error
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
  });

  const selectedService = watch("service");
  const selectedBudget = watch("budget");

  // Prefill form values based on URL search query parameters (from Pricing cards & builder calculator)
  useEffect(() => {
    const plan = searchParams.get("plan");
    const pkg = searchParams.get("package");
    const message = searchParams.get("message");

    if (plan) {
      setValue("service", "web");
      if (plan === "startup") {
        setValue("budget", "medium");
        setValue("details", "I am interested in the Startup web & branding package (EGP 15,000).");
      } else if (plan === "growth") {
        setValue("budget", "large");
        setValue("details", "I am interested in the Growth web & branding package (EGP 30,000).");
      }
    } else if (pkg) {
      setValue("service", "social");
      if (pkg === "starter-growth") {
        setValue("budget", "medium");
        setValue("details", "I am interested in the Starter Growth Social Media & Ads plan (EGP 20,000/mo).");
      } else if (pkg === "brand-scaler") {
        setValue("budget", "large");
        setValue("details", "I am interested in the Brand Scaler Social Media & Ads plan (EGP 45,000/mo).");
      } else if (pkg === "corporate-e-com-elite") {
        setValue("budget", "large");
        setValue("details", "I am interested in the Corporate / E-Com Elite Social Media & Ads plan (EGP 85,000/mo).");
      }
    } else if (message) {
      setValue("details", message);
      if (message.includes("logo_branding") || message.includes("full_identity")) {
        setValue("service", "branding");
      } else {
        setValue("service", "web");
      }
      setValue("budget", "large");
    }
  }, [searchParams, setValue]);

  /* ─── Navigation Handlers ──────────────────────────────────────────────── */
  const nextStep = async (fieldsToValidate: (keyof ContactFormData)[]) => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setDirection(1);
      setStep((prev) => (prev + 1) as any);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => (prev - 1) as any);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry.");
      }

      setDirection(1);
      setStep(4); // Success step
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
      setDirection(1);
      setStep(5); // Error step
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── Animation Variants ───────────────────────────────────────────────── */
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: spring,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
      transition: spring,
    }),
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start"
      aria-label="Contact us"
    >
      {/* ── Left Column: Sticky Context ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 120 }}
        transition={spring}
        className="lg:sticky lg:top-32 max-w-md w-full"
      >
        <p
          className="text-xs tracking-[0.35em] uppercase font-sans mb-4"
          style={{ color: "var(--va-accent)" }}
        >
          Start a project
        </p>
        <h2
          className="text-4xl md:text-5xl mb-6 leading-[1.1]"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            color: "var(--va-ink)",
            letterSpacing: "-0.01em",
          }}
        >
          Let's talk about <br />
          <em className="text-editorial text-gradient-neon" style={{ fontStyle: "italic" }}>
            what's next.
          </em>
        </h2>
        <p className="font-sans text-base leading-relaxed mb-8" style={{ color: "var(--va-ink-muted)" }}>
          Fill out the form below to give us a sense of your project.
          We review every inquiry and aim to respond within 48 hours.
        </p>

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="flex gap-2 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: step === i ? "32px" : "12px",
                  background: step >= i ? "var(--va-accent)" : "var(--va-rule)",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Right Column: Interactive Form ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 120, scale: 0.96 }}
        transition={{ ...spring, delay: 0.2 }}
        className="w-full max-w-2xl surface-card shadow-paper p-8 md:p-12 relative overflow-hidden"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="relative min-h-[400px] flex flex-col">
          <AnimatePresence custom={direction} mode="wait">

            {/* ── STEP 1: Identity ────────────────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex flex-col gap-6"
              >
                <div className="mb-2">
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--va-ink)" }}>
                    First, who are we speaking with?
                  </h3>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b pb-2 pt-1 font-sans text-lg focus:outline-none transition-colors"
                    style={{
                      borderColor: errors.name ? "var(--color-destructive)" : "var(--va-rule)",
                      color: "var(--va-ink)",
                    }}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b pb-2 pt-1 font-sans text-lg focus:outline-none transition-colors"
                    style={{
                      borderColor: errors.email ? "var(--color-destructive)" : "var(--va-rule)",
                      color: "var(--va-ink)",
                    }}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                <div className="mt-auto pt-8 flex justify-end">
                  <motion.button
                    type="button"
                    onClick={() => nextStep(["name", "email"])}
                    suppressHydrationWarning
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-sm flex items-center gap-2 text-sm font-medium"
                    style={{ background: "var(--va-ink)", color: "var(--va-paper)" }}
                  >
                    Next Step <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Objective ───────────────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex flex-col gap-8"
              >
                <div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--va-ink)" }}>
                    What are you looking for?
                  </h3>
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
                    Primary Service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "branding", label: "Branding" },
                      { id: "social", label: "Social Media" },
                      { id: "web", label: "Web Development" },
                      { id: "other", label: "Other" },
                    ].map((svc) => (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setValue("service", svc.id as any, { shouldValidate: true })}
                        suppressHydrationWarning
                        className="px-4 py-3 text-sm text-left border rounded-sm transition-all"
                        style={{
                          borderColor: selectedService === svc.id ? "var(--va-accent)" : "var(--va-rule)",
                          background: selectedService === svc.id ? "color-mix(in srgb, var(--va-accent) 10%, transparent)" : "transparent",
                          color: selectedService === svc.id ? "var(--va-ink)" : "var(--va-ink-muted)",
                        }}
                      >
                        {svc.label}
                      </button>
                    ))}
                  </div>
                  {errors.service && <span className="text-xs text-red-500">{errors.service.message}</span>}
                </div>

                {/* Budget Selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
                    Estimated Budget
                  </label>
                  <div className="flex gap-3">
                    {[
                      { id: "small", label: "< $5k" },
                      { id: "medium", label: "$5k - $15k" },
                      { id: "large", label: "$15k+" },
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setValue("budget", bg.id as any, { shouldValidate: true })}
                        suppressHydrationWarning
                        className="flex-1 px-2 py-3 text-sm text-center border rounded-sm transition-all"
                        style={{
                          borderColor: selectedBudget === bg.id ? "var(--va-accent)" : "var(--va-rule)",
                          background: selectedBudget === bg.id ? "color-mix(in srgb, var(--va-accent) 10%, transparent)" : "transparent",
                          color: selectedBudget === bg.id ? "var(--va-ink)" : "var(--va-ink-muted)",
                        }}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                  {errors.budget && <span className="text-xs text-red-500">{errors.budget.message}</span>}
                </div>

                <div className="mt-auto pt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    suppressHydrationWarning
                    className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    <ChevronRight size={16} className="rotate-180" /> Back
                  </button>
                  <motion.button
                    type="button"
                    onClick={() => nextStep(["service", "budget"])}
                    suppressHydrationWarning
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-sm flex items-center gap-2 text-sm font-medium"
                    style={{ background: "var(--va-ink)", color: "var(--va-paper)" }}
                  >
                    Next Step <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Details ─────────────────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--va-ink)" }}>
                    Tell us about the project.
                  </h3>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="details" className="text-sm font-sans" style={{ color: "var(--va-ink-muted)" }}>
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    {...register("details")}
                    suppressHydrationWarning
                    className="w-full flex-1 min-h-[150px] bg-transparent border rounded-sm p-4 font-sans text-base focus:outline-none transition-colors resize-none"
                    style={{
                      borderColor: errors.details ? "var(--color-destructive)" : "var(--va-rule)",
                      color: "var(--va-ink)",
                    }}
                    placeholder="Describe your goals, current challenges, and any deadlines..."
                  />
                  {errors.details && <span className="text-xs text-red-500">{errors.details.message}</span>}
                </div>

                <div className="mt-auto pt-6 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    suppressHydrationWarning
                    className="text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--va-ink-muted)" }}
                  >
                    <ChevronRight size={16} className="rotate-180" /> Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="px-8 py-3 rounded-sm flex items-center justify-center gap-2 text-sm font-medium relative overflow-hidden"
                    style={{
                      background: "var(--va-accent)",
                      color: "var(--va-paper)",
                      opacity: isSubmitting ? 0.8 : 1,
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Success ─────────────────────────────────────────── */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                >
                  <CheckCircle2 size={64} strokeWidth={1} style={{ color: "var(--va-accent)" }} />
                </motion.div>
                <h3 className="text-3xl mt-4" style={{ fontFamily: "var(--font-serif)", color: "var(--va-ink)" }}>
                  Inquiry received.
                </h3>
                <p className="font-sans text-base max-w-sm" style={{ color: "var(--va-ink-muted)" }}>
                  Thank you for reaching out. We will review your details and be in touch within 48 hours.
                </p>
              </motion.div>
            )}

            {/* ── STEP 5: Error ───────────────────────────────────────────── */}
            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                >
                  <XCircle size={64} strokeWidth={1} style={{ color: "var(--color-destructive)" }} />
                </motion.div>
                <h3 className="text-3xl mt-4" style={{ fontFamily: "var(--font-serif)", color: "var(--va-ink)" }}>
                  Something went wrong.
                </h3>
                <p className="font-sans text-base max-w-sm" style={{ color: "var(--va-ink-muted)" }}>
                  {errorMessage || "Please try again later."}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(3)} // go back to last step to try again
                  suppressHydrationWarning
                  className="mt-6 px-6 py-2 rounded-sm text-sm font-medium transition-colors border"
                  style={{ borderColor: "var(--va-rule)", color: "var(--va-ink)" }}
                >
                  Try Again
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </form>
      </motion.div>
    </section>
  );
}
