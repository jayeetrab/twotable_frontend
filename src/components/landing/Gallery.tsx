import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import couple1 from '@/assets/couple-1.jpg';
import couple2 from '@/assets/couple-2.jpg';
import couple3 from '@/assets/couple-3.jpg';
import restaurant1 from '@/assets/restaurant-1.jpg';
import { RedDot } from './Logo';

const images = [
  { src: couple1, alt: "Happy couple at restaurant", span: "col-span-2 row-span-2" },
  { src: restaurant1, alt: "Elegant restaurant interior", span: "col-span-1 row-span-1" },
  { src: couple2, alt: "Couple holding hands", span: "col-span-1 row-span-1" },
  { src: couple3, alt: "Couple arriving at restaurant", span: "col-span-2 row-span-1" },
];

export function Gallery() {
  return (
    <section className="py-16 md:py-20 bg-romantic-gradient overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
            Real moments
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
            Where love begins<RedDot />
          </h2>
          <p className="mt-3 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            The first spark, the first laugh, the first &quot;I&apos;d love to see you again.&quot;
            These are the moments we make possible.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`${image.span} relative rounded-3xl overflow-hidden border border-white/60 bg-white/80 shadow-[0_20px_70px_rgba(15,23,42,0.2)] backdrop-blur-xl`}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
