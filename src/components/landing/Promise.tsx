// src/components/landing/Promise.tsx
import { motion } from "framer-motion";
import { Heart, Calendar, Sparkles } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const pillars = [
  {
    icon: Heart,
    title: "Real Matches",
    description:
      "Our algorithm focuses on deep compatibility, not just swipes. We find people who truly connect.",
  },
  {
    icon: Calendar,
    title: "Reserved Tables",
    description:
      "We book your first date at a carefully selected restaurant. Show up, enjoy, connect.",
  },
  {
    icon: Sparkles,
    title: "Zero Pressure",
    description:
      "No endless messaging or ghosting. Just genuine face-to-face moments where chemistry happens.",
  },
];

export function Promise() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading area – keep whatever you already have here if you like */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
            The TwoTable Promise
          </span>
          <h2 className="mt-4 text-6xl md:text-5xl font-bold tracking-tight text-foreground">
            Dating, reimagined.
          </h2>
          <p className="mt-3 text-[15px] md:text-[17px] leading-[1.7] text-neutral-600 max-w-2xl mx-auto">
            We believe the best connections happen over dinner, not through screens.
            So we take you from match, to venue, to that first &quot;shall we do this again?&quot;.
          </p>
        </AnimatedSection>

        {/* Tiles */}
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-6 md:p-7"
              >
                <div className="mb-5 h-10 w-10 rounded-2xl bg-[#B80B0B]/10 flex items-center justify-center">
                  <pillar.icon className="w-5 h-5 text-[#B80B0B]" />
                </div>
                <h3 className="text-[1.05rem] md:text-lg font-semibold text-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.7] text-muted-foreground">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
