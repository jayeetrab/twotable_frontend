// components/landing/Hero.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { RedDot } from "@/components/landing/Logo";
import { VaraTagline } from "@/components/VaraTagline";

export function Hero() {
  const scrollToWaitlist = () => {
    document
      .getElementById("waitlist")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDemo = () => {
    document.getElementById("see-how-twotable-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background image with vignette + gradient + slight blur */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover scale-105 filter blur-[1.5px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.45),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/35" />
      </div>

      <div className="container relative z-10 px-4 pt-24 md:pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-black/30 backdrop-blur-sm px-5 md:px-8 py-6 md:py-8">
            {/* Small pill */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
              Dating, but with a table
            </motion.p>

            {/* Accessible H1, hidden visually */}
            <h1 className="sr-only">
              Love, reserved for two
            </h1>

            {/* Vara animated tagline */}
            <VaraTagline />

            {/* <div className="mt-0 flex justify-center">
              <RedDot />
            </div> */}

            {/* Supporting lines - significantly reduced margin-top */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.4 }}
              className="mt-1 text-base md:text-lg text-white/80 max-w-2xl mx-auto"
            >
              TwoTable is a dating app that skips endless chat and plans the whole
              date around the table – we match you with someone compatible, then
              seat you both in a venue that fits the mood.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              className="mt-1.5 text-xs md:text-sm text-white/70 max-w-xl mx-auto"
            >
              Instead of &quot;grab a drink anywhere&quot;, TwoTable finds the person and the
              place together – so you&apos;re walking into a real date, not just another
              swipe.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-5"
            >
              <Button
                variant="hero"
                onClick={scrollToWaitlist}
                className="rounded-full bg-[#B80B0B] hover:bg-[#9e0909] px-8 py-5 text-base font-medium text-white shadow-lg shadow-[#B80B0B]/30 border border-white/30"
              >
                Get early access
              </Button>
              <button
                onClick={scrollToDemo}
                className="text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                See how it works
                <RedDot />
              </button>
            </motion.div>

            {/* Benefit pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.35 }}
              className="mt-4 flex flex-wrap justify-center gap-3 text-[11px] md:text-xs text-white/80"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
                Fewer, better dates – not endless swiping.
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
                Built for couples and the venues that host them.
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToDemo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </div>
    </section>
  );
}
