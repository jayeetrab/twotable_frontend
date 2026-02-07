// src/components/landing/WaitlistForm.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "./AnimatedSection";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import { CheckCircle, Users } from "lucide-react";
import { RedDot } from "./Logo";
import { useCreateWaitlistEntry } from "@/hooks/useCreateWaitlistEntry";



const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { count, increment } = useWaitlistCounter();
const { mutateAsync: createWaitlistEntry, isPending } = useCreateWaitlistEntry();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#B80B0B", "#f97373", "#fecaca", "#fef2f2"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#B80B0B", "#f97373", "#fecaca", "#fef2f2"],
      });
    }, 250);
  };

  const onSubmit = async (data: WaitlistFormData) => {
  try {
    await createWaitlistEntry({ email: data.email });
    increment();
    setIsSubmitted(true);
    triggerConfetti();
  } catch (error) {
    console.error("Failed to join waitlist", error);
  }
};


  return (
    <section id="waitlist" className="py-16 md:py-20 bg-romantic-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
            {/* Left: copy + form */}
            <div className="text-center lg:text-left space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
                Limited early access
              </span>

            
<motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-2 text-3xl md:text-5xl font-bold text-neutral-900 leading-tight"
          >
            Be first in line for a better first date
            <RedDot />
          </motion.h2>


              <p className="text-xs md:text-lg text-neutral-600 max-w-xl ">
                We&apos;re opening TwoTable in Bristol & London this Spring.
                Join the waitlist for early access and a quiet founding‑member
                discount.
              </p>

              {!isSubmitted ? (
                <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-4 max-w-md lg:max-w-none"
>
  <div className="flex flex-col gap-3">
    {/* Outer red outline */}
    <div className="rounded-full border border-[#B80B0B]/70 bg-white/80 px-1 py-1">
      <div className="flex items-stretch">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full px-5 rounded-full sm:rounded-r-none bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-0 border-0 h-12 md:h-14"
        />
        <Button
  type="submit"
  variant="waitlist"
  disabled={isPending}
  className="inline-flex items-center justify-center rounded-full bg-[#B80B0B] hover:bg-[#9a0909] px-6 md:px-7 text-sm font-semibold text-white shadow-lg shadow-[#B80B0B]/30 border border-[#B80B0B] h-12 md:h-14"
>
  {isPending ? "Joining..." : "Join the waitlist"}
</Button>

      </div>
    </div>

    {errors.email && (
      <p className="text-[#B80B0B] text-sm text-left px-2">
        {errors.email.message}
      </p>
    )}
  </div>

  <p className="text-xs md:text-sm text-neutral-500">
    No spam, ever. We&apos;ll only email you about launch and early tables in your area.
  </p>
</form>


              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white/90 rounded-3xl p-6 md:p-8 shadow-[0_20px_70px_rgba(15,23,42,0.18)] max-w-md border border-white/70 backdrop-blur-xl mx-auto lg:mx-0"
                >
                  <CheckCircle className="w-14 h-14 text-[#B80B0B] mx-auto mb-3" />
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-2 text-center">
                    You&apos;re on the list
                  </h3>
                  <p className="text-sm text-neutral-600 text-center">
                    We&apos;ll let you know as soon as we open in your city,
                    with first pick of early tables.
                  </p>
                </motion.div>
              )}

              {/* Waitlist counter */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-4 flex items-center justify-center lg:justify-start gap-3"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white/70 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
                  <Users className="w-5 h-5 text-[#B80B0B]" />
                  <span className="text-sm font-medium text-neutral-800">
                    <span className="text-[#B80B0B] font-bold">
                      {count.toLocaleString()}
                    </span>{" "}
                    people already waiting
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right: social proof panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-white/40 via-white/10 to-transparent rounded-[2.2rem] blur-2xl pointer-events-none" />
              <div className="relative rounded-[1.8rem] bg-white/90 border border-white/80 shadow-[0_24px_70px_rgba(15,23,42,0.18)] p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.22em]">
                    Early members
                  </p>
                  <span className="text-[11px] text-neutral-400">
                    Curated for dates, not crowds
                  </span>
                </div>

                {/* avatars row */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[
                      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80",
                      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80",
                      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80",
                      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80",
                    ].map((src, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-[0_8px_20px_rgba(15,23,42,0.25)]"
                      >
                        <img
                          src={src}
                          alt="Early member"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Couples, solo diners and first dates already saving their
                    spot.
                  </p>
                </div>

                {/* micro-testimonial */}
                <div className="rounded-2xl bg-neutral-50/80 border border-neutral-100 px-3 py-3 text-left space-y-1">
                  <p className="text-[11px] text-neutral-500">
                    What people are saying
                  </p>
                  <p className="text-[12px] text-neutral-800">
                    “Finally a dating app that decides the table as well as the
                    match.”
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    — Early tester, Bristol
                  </p>
                </div>

                {/* subtle reassurance */}
                <p className="text-[11px] text-neutral-500">
                  We&apos;ll open in a few cities at a time so early members
                  get the best tables and the least noise.
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
