import { motion, type Variants } from "framer-motion";
import { X, Check, Calendar, Sparkles, Heart } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RedDot } from "./Logo";

const rows = [
  {
    feature: "Endless swiping",
    otherSub: "Profiles blur into each other.",
    otherNote: "Lots of swipes, very few real dates.",
    ttMain: "Quality matches",
    ttSub: "Fewer people, better fit for real life.",
  },
  {
    feature: "Ghosting & dead chats",
    otherSub: "Chats fizzle out for no reason.",
    otherNote: "You’re always waiting on a reply.",
    ttMain: "Guaranteed dates",
    ttSub: "If you both say yes, there’s a table booked.",
  },
  {
    feature: "Plan dates yourself",
    otherSub: "You hunt for venues and times.",
    otherNote: "More admin than actual dating.",
    ttMain: "We book it all",
    ttSub: "Time, table and place handled for you.",
  },
  {
    feature: "Catfishing risk",
    otherSub: "Photos don’t always match real life.",
    otherNote: "You only find out once you’re there.",
    ttMain: "Verified profiles",
    ttSub: "Real people, checked before we match.",
  },
  {
    feature: "Decision fatigue",
    otherSub: "Too many options, no clear pick.",
    otherNote: "It feels like work, not fun.",
    ttMain: "Curated options",
    ttSub: "A few strong choices, not an endless list.",
  },
];

const container: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.06,
    },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export function Comparison() {
  return (
    <section id="why-different" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
            Why we&apos;re different
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-3 font-display text-3xl md:text-4xl lg:text-[2.6rem] font-semibold tracking-tight text-neutral-900 leading-tight"
          >
            Not another dating app
            <RedDot />
          </motion.h2>

          <p className="mt-3 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            TwoTable skips the endless chat and gets you to an actual table in the real world.
            Here&apos;s how it feels next to a typical dating app.
          </p>
        </AnimatedSection>

        {/* Advanced comparison table */}
        <AnimatedSection>
          <div className="max-w-5xl mx-auto">
            {/* Header strip */}
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B80B0B]/6 via-transparent to-emerald-500/5 pointer-events-none" />
              <div className="relative grid grid-cols-[1.2fr,1fr,1fr] gap-4 px-5 py-3 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500">
                <div className="text-left">What it&apos;s like</div>
                <div className="text-center">Other apps</div>
                <div className="text-center text-[#B80B0B]">TwoTable</div>
              </div>
            </div>

            {/* Rows */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-3"
            >
              {rows.map((row) => (
                <motion.div
                  key={row.feature}
                  variants={rowVariants}
                  className="group relative grid grid-cols-[1.2fr,1fr,1fr] gap-4 items-stretch rounded-3xl border border-neutral-100/80 bg-white/80 px-4 py-4 md:px-5 md:py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] hover:border-[#B80B0B]/18 transition-all duration-300 h-full"
                >
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#B80B0B]/6 via-transparent to-emerald-500/4 blur-xl" />
                  </div>

                  {/* Feature */}
                  <div className="relative flex flex-col justify-center h-full">
                    <p className="text-[13px] md:text-sm font-medium text-neutral-900">
                      {row.feature}
                    </p>
                    <p className="mt-1 text-[11px] md:text-xs text-neutral-500">
                      {row.otherSub}
                    </p>
                  </div>

                  {/* Other apps */}
                  <div className="relative flex items-center justify-start h-full">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-sm shadow-red-100/80">
                        <X className="w-4 h-4 text-[#B80B0B]" />
                      </div>
                      <div className="hidden sm:flex flex-col">
                        <span className="text-[11px] md:text-xs text-neutral-500">
                          {row.otherNote}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TwoTable */}
                  <div className="relative flex items-center justify-start h-full">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm shadow-emerald-100/80">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-semibold text-[#B80B0B]">
                          {row.ttMain}
                        </span>
                        <span className="hidden md:inline text-[11px] md:text-xs text-neutral-500">
                          {row.ttSub}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Key differentiators */}
        <AnimatedSection className="mt-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "Date night, sorted",
                description:
                  "We match you, book the restaurant and hold the table. You just show up.",
              },
              {
                icon: Sparkles,
                title: "Match and mood",
                description:
                  "We think about vibe, venue and values, not just who happened to swipe right.",
              },
              {
                icon: Heart,
                title: "Real first dates",
                description:
                  "Fewer endless chats, more face‑to‑face time where chemistry actually happens.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="relative text-center p-6 rounded-3xl bg-white/80 border border-neutral-100 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#B80B0B]/10 flex items-center justify-center shadow-md shadow-[#B80B0B]/25">
                  <item.icon className="w-6 h-6 text-[#B80B0B]" />
                </div>
                <h3 className="mt-8 font-display text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
