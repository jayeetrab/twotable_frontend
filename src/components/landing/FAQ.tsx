import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { RedDot } from "./Logo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id ="FAQ"className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-10"
            >
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Questions, answered
              </p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl md:text-4xl font-display font-bold text-neutral-900"
              >
                FAQ
                <RedDot />
              </motion.h2>
            </motion.div>

            {/* Card container */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="rounded-2xl bg-white/80 border border-white/60 shadow-[0_26px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl p-4 md:p-6"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0 px-2 md:px-3">
                  <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-sm md:text-base font-medium py-4 hover:text-[#B80B0B] transition-colors">
                    <span>How do deposits work?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4">
                    You pay a small deposit when booking – typically £5–15 per person.
                    This goes towards your bill on the night. If you cancel within the
                    policy window, you get a full refund. If you no‑show, the venue keeps
                    the deposit.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border-b-0 px-2 md:px-3 border-t border-border/50"
                >
                  <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-sm md:text-base font-medium py-4 hover:text-[#B80B0B] transition-colors">
                    <span>What if we need to cancel?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4">
                    Cancel at least 24 hours before your reservation for a full refund.
                    Within 24 hours, the deposit goes to the venue to cover the held
                    table – it&apos;s only fair.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="border-b-0 px-2 md:px-3 border-t border-border/50"
                >
                  <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-sm md:text-base font-medium py-4 hover:text-[#B80B0B] transition-colors">
                    <span>Do both people need the app?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4">
                    TwoTable matches couples based on shared preferences. Both parties
                    confirm interest before a booking is made, so yes – you&apos;ll both
                    use the app.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border-b-0 px-2 md:px-3 border-t border-border/50"
                >
                  <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-sm md:text-base font-medium py-4 hover:text-[#B80B0B] transition-colors">
                    <span>Which cities are you in?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground pb-2">
                    We&apos;re starting in Bristol &amp; London, with plans to expand
                    based on demand. Join the waitlist to help us prioritise your city.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
