import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import founder from '@/assets/founder.jpg';
import { Quote } from 'lucide-react';
import { RedDot } from './Logo';

export function FounderNote() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-10 md:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-2"
            >
              <div className="relative">
                <img
                  src={founder}
                  alt="TwoTable Founder"
                  className="w-48 h-48 md:w-full md:h-auto rounded-3xl object-cover mx-auto shadow-[0_28px_80px_rgba(15,23,42,0.35)]"
                />
                <div className="absolute -bottom-5 -right-5 h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-[#B80B0B] to-[#9a0909] flex items-center justify-center shadow-xl shadow-[#B80B0B]/40 ring-4 ring-background">
                  <Quote className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700 mb-4">
                <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
                From our founder
              </span>
              <blockquote className="font-display text-2xl md:text-3xl font-medium text-neutral-900 leading-relaxed mb-6">
                &quot;I spent years swiping, matching and messaging – only to end up on dates that felt
                like job interviews. I knew there had to be a better way. TwoTable is about bringing
                back the magic of walking into a real date, with a real table waiting for you.&quot;
                <RedDot />
              </blockquote>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-neutral-900">Alex Chen</p>
                  <p className="text-sm text-neutral-500">Founder &amp; CEO, TwoTable</p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
