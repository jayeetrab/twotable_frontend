import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "./AnimatedSection";
import { ArrowRight, Heart } from "lucide-react";
import { RedDot } from "./Logo";

export function FinalCTA() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background via-rose/5 to-rose/15">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto">
            {/* Glow background */}
            <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-gradient-to-r from-[#B80B0B]/20 via-transparent to-rose-400/25 blur-3xl opacity-70" />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2rem] bg-white/80 border border-white/60 shadow-[0_26px_70px_rgba(15,23,42,0.22)] backdrop-blur-xl px-6 py-10 md:px-10 md:py-12 text-center"
            >
              {/* Subtle top gradient accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#B80B0B] via-rose-300 to-amber-200" />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 230, damping: 18 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#B80B0B]/10 flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(184,11,11,0.35)]"
              >
                <Heart className="w-9 h-9 md:w-10 md:h-10 text-[#B80B0B]" />
              </motion.div>

              {/* Heading */}
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900 mb-4 leading-tight">
                Ready for dates that already have a table
                <RedDot />
              </h2>

              {/* Copy */}
              <p className="text-sm md:text-base lg:text-lg text-neutral-600 mb-8 max-w-xl mx-auto">
                Join the waitlist and be among the first to try TwoTable in your city.
                Fewer, better dates – with a table waiting when you walk in.
              </p>

              {/* CTA button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className="inline-flex"
              >
                <Button
                  variant="hero"
                  onClick={scrollToWaitlist}
                  className="rounded-full bg-[#B80B0B] hover:bg-[#9e0909] px-9 md:px-11 py-4 md:py-5 text-sm md:text-base font-medium text-white shadow-lg shadow-[#B80B0B]/40 border border-white/40 flex items-center gap-2"
                >
                  Join the waitlist
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Small reassurance */}
              <p className="mt-4 text-xs md:text-sm text-neutral-500">
                Early access only. No spam – just launch updates and the occasional date night idea.
              </p>

              {/* Pill benefits */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-[11px] md:text-xs text-neutral-600">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 border border-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
                  No endless swiping
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 border border-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
                  Tables held for TwoTable dates
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 border border-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
                  Designed for first dates, not feeds
                </span>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
