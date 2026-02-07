import { useEffect, useState } from "react";
import { Navigation } from "@/components/landing/Navigation";
// import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  Loader2,
  Building2,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useCreateVenueApplication } from "@/hooks/use-venue-application";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateVenueApplication,
  type VenueApplicationPayload,
} from "@/hooks/use-venue-application";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // now properly typed
      stiffness: 80,
      damping: 20,
      mass: 1,
    },
  },
};


// const sectionVariants = {
//   hidden: { opacity: 0, y: 80, scale: 0.96 },
//   show: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 80,
//       damping: 20,
//       mass: 1,
//     },
//   },
// };

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

const stepperItems = [
  {
    number: 1,
    title: "Tell us about your venue",
    desc: "Share your concept, location, and which services you want to test with TwoTable guests.",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
  },
  {
    number: 2,
    title: "We review in 48 hours",
    desc: "Our team evaluates fit, checks availability in your area, and reaches out with next steps.",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=80",
  },
  {
    number: 3,
    title: "Launch a 30-day pilot",
    desc: "Activate selected nights with clear payouts, booking controls, and zero upfront cost.",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80",
  },
  {
    number: 4,
    title: "Scale with confidence",
    desc: "Keep what works, pause what doesn't, and grow incremental revenue on your terms.",
    icon: Award,
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&auto=format&fit=crop&q=80",
  },
];

const whyTiles = [
  {
    title: "Guaranteed payouts",
    desc: "Fixed earnings per booking, automatically released after check‑in, with no invoice chasing or no‑show losses.",
    icon: TrendingUp,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Fewer no‑shows",
    desc: "Fairness scoring and deposits mean guests take bookings seriously, so your tables don't sit empty.",
    icon: Shield,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Quiet slot revenue",
    desc: "Activate Tuesday nights, shoulder times, or new services without discounting your core peak business.",
    icon: Calendar,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "No fixed fees",
    desc: "No monthly subscription or setup costs. You only pay when TwoTable sends real guests to your tables.",
    icon: CheckCircle2,
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "Control stays with you",
    desc: "You set capacity, nights, blackout dates, and can pause or adjust availability at any time.",
    icon: Users,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Aligned partnership",
    desc: "We work with a curated group of venues and optimise for the kind of guests you want more of.",
    icon: Award,
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
];

const noShowItems = [
  {
    title: "Protected tables",
    desc: "Deposits are held in escrow, so last‑minute cancellations and no‑shows are no longer a pure loss for your business.",
    icon: Shield,
  },
  {
    title: "Clear guest expectations",
    desc: "Guests see transparent deposit terms before they book, which reduces speculative reservations and flakiness.",
    icon: CheckCircle2,
  },
  {
    title: "Operational confidence",
    desc: "Your team can plan staffing and prep with confidence, knowing bookings are backed by real financial commitment.",
    icon: Users,
  },
];

// Form schema
const venueApplicationSchema = z.object({
  venue: z.string().min(2, "Venue name is required"),
  city: z.string().min(2, "City is required"),
  type: z.string().min(1, "Venue type is required"),
  web: z.string().url().optional().or(z.literal("")),
  contact: z.string().min(2, "Contact name is required"),
  role: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  nights: z.string().min(1, "Preferred nights required"),
  capacity: z.string().min(1, "Capacity information required"),
  payout: z.string().min(1, "Payout preference required"),
  notes: z.string().optional(),
});

type VenueApplicationFormData = VenueApplicationPayload;

export default function Venues() {
  useEffect(() => {
    document.title = "For Venues & Restaurants | TwoTable";
  }, []);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Form setup
  const { toast } = useToast();
  const mutation = useCreateVenueApplication();
  const form = useForm<VenueApplicationFormData>({
  resolver: zodResolver(venueApplicationSchema),
  defaultValues: {
    venue: "",
    city: "",
    type: "",
    web: "",
    contact: "",
    role: "",
    email: "",
    phone: "",
    nights: "",
    capacity: "",
    payout: "",
    notes: "",
  },
});


  const onSubmit = (data: VenueApplicationFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Application submitted!",
          description: "We'll review your application and get back to you within 2 business days.",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="relative min-h-screen font-body text-foreground bg-background selection:bg-primary/20 overflow-hidden">
      {/* Enhanced animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f4f5fb_0,_#f8fafc_40%,_#ffffff_100%)]" />
        <motion.div
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#B80B0B]/12 blur-3xl"
          animate={{
            x: [-30, 30, -30],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-emerald-500/8 blur-3xl"
          animate={{
            x: [20, -20, 20],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-500/6 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1.05, 1, 1.05],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <Navigation />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-6 container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-primary/90 px-5 py-2.5 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent rounded-full border border-primary/20">
                For Restaurants & Bars
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text"
            >
              Turn quiet evenings into
              <br />
              <span className="text-primary">fully booked tables</span> for two.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              TwoTable sends you couples with confirmed bookings and paid deposits –
              then pays you instantly after check‑in. No monthly fees. No commitments.
              Just tables that stay full.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 25px 70px rgba(184,11,11,0.4)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  const el = document.getElementById("application-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary via-primary to-primary/90 text-white rounded-full font-bold text-base md:text-lg shadow-2xl shadow-primary/40 overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Start your pilot</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const el = document.getElementById("how-venues-work");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-5 border-2 border-primary/40 rounded-full font-semibold text-base md:text-lg hover:bg-primary/5 hover:border-primary/60 transition-all"
              >
                See how it works
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-muted-foreground mt-8"
            >
              Early partners in London & Bristol get priority access and in‑app promotion
            </motion.p>
          </div>
        </AnimatedSection>

        {/* 4-STEP PROCESS - WITH IMAGES */}
        <AnimatedSection
          id="how-venues-work"
          className="py-20 md:py-28 px-4 md:px-6 container mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Simple 4‑step process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              From first conversation to your first TwoTable booking in weeks, not months.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stepperItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.number}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 30px 80px rgba(15,23,42,0.2)",
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.12)]"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Image header */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Step badge */}
                    <motion.div
                      className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-primary shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      Step {item.number}
                    </motion.div>

                    {/* Icon overlay */}
                    <motion.div
                      className="absolute left-4 bottom-4 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl ring-1 ring-black/5"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <h3 className="text-lg font-display font-bold mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Progress indicator */}
                    <motion.div
                      className="mt-4 h-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.8 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        initial={{ x: "-100%" }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 + 0.3, duration: 0.8 }}
                      />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </AnimatedSection>

        {/* WHY VENUES SWITCH */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-6 container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Why venues switch to TwoTable
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Outcomes that show up in your P&L, not just your booking feed.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyTiles.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <motion.article
                  key={tile.title}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 35px 90px rgba(15,23,42,0.25)",
                  }}
                  style={{ transformPerspective: 1000 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.15)]"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative p-6 md:p-7">
                    <motion.div
                      className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-display font-bold mb-3 flex items-center gap-2 text-foreground">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tile.desc}
                    </p>

                    {/* Accent line */}
                    <motion.div
                      className="mt-5 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </AnimatedSection>

        {/* NO-SHOW PROTECTION + CTA */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-6 container mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start max-w-6xl mx-auto">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-xl mb-10"
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                  Built‑in no‑show protection
                </h2>
                <p className="text-lg text-muted-foreground">
                  Deposits are held in escrow so your team can rely on bookings. If a
                  guest cancels too late or doesn't arrive, you are still paid.
                </p>
              </motion.div>

              <div className="space-y-4">
                {noShowItems.map((item, idx) => {
  const Icon = item.icon;
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
      className="group flex items-start gap-4 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-sm px-5 py-4 shadow-md hover:shadow-xl transition-shadow duration-300"
    >

                      <motion.div
                        className="mt-0.5 h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/30 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-base font-display font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Modern CTA card */}
            <motion.aside
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white/90 to-white/80 backdrop-blur-xl p-8 shadow-[0_30px_90px_rgba(184,11,11,0.25)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(184,11,11,0.15),_transparent_60%)]" />

              <div className="relative space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/30"
                >
                  <Calendar className="h-7 w-7 text-primary" />
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Ready to fill your quiet services?
                </h3>

                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  Run a 30‑day pilot with no setup fee, no lock‑in, and full control
                  over when and how we send you guests.
                </p>

                <motion.div
                  className="flex items-start gap-2 text-xs text-foreground/70"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                  <span>
                    We typically reply to new venue applications within 2 business days
                  </span>
                </motion.div>

                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 30px 80px rgba(184,11,11,0.45)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const el = document.getElementById("application-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative w-full mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 px-8 py-5 text-base font-bold text-white shadow-2xl shadow-primary/50 hover:shadow-primary/60 transition-all overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Submit venue application</span>
                  <motion.svg
                    className="relative z-10 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.aside>
          </div>
        </AnimatedSection>

        {/* APPLICATION FORM - IMPROVED */}
        <AnimatedSection 
          id="application-form" 
          className="py-20 md:py-28 px-4 md:px-6 container mx-auto scroll-mt-20"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Venue application
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your venue and we'll be in touch within 2 business days
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_30px_90px_rgba(15,23,42,0.15)]"
            >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* VENUE BASICS */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-display font-bold">Your venue</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Venue name *
                      </label>
                      <input
                        {...form.register("venue")}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="e.g. The Bistro"
                      />
                      {form.formState.errors.venue && (
                        <p className="text-xs text-red-600">{form.formState.errors.venue.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        City *
                      </label>
                      <input
                        {...form.register("city")}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="e.g. Bristol"
                      />
                      {form.formState.errors.city && (
                        <p className="text-xs text-red-600">{form.formState.errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Venue type *
                      </label>
                      <select
                        {...form.register("type")}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select type...</option>
                        <option value="cocktail-bar">Cocktail Bar</option>
                        <option value="wine-bar">Wine Bar</option>
                        <option value="casual-restaurant">Casual Restaurant</option>
                        <option value="fine-dining">Fine Dining</option>
                        <option value="hotel-bar">Hotel Bar/Lobby</option>
                        <option value="cafe">Café/Coffee Bar</option>
                        <option value="other">Other</option>
                      </select>
                      {form.formState.errors.type && (
                        <p className="text-xs text-red-600">{form.formState.errors.type.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Website or Instagram
                      </label>
                      <input
                        {...form.register("web")}
                        type="url"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="https://..."
                      />
                      {form.formState.errors.web && (
                        <p className="text-xs text-red-600">{form.formState.errors.web.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CONTACT PERSON */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-display font-bold">Contact person</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name *
                      </label>
                      <input
                        {...form.register("contact")}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="John Smith"
                      />
                      {form.formState.errors.contact && (
                        <p className="text-xs text-red-600">{form.formState.errors.contact.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Role
                      </label>
                      <input
                        {...form.register("role")}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="e.g. Manager"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          {...form.register("email")}
                          type="email"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="john@venue.com"
                        />
                      </div>
                      {form.formState.errors.email && (
                        <p className="text-xs text-red-600">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                          {...form.register("phone")}
                          type="tel"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="+44 117 123 4567"
                        />
                      </div>
                      {form.formState.errors.phone && (
                        <p className="text-xs text-red-600">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* DATES & CAPACITY */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-display font-bold">Dates & capacity</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Which evenings work best? *
                    </label>
                    <input
                      {...form.register("nights")}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="e.g. Tuesday-Thursday after 6pm"
                    />
                    {form.formState.errors.nights && (
                      <p className="text-xs text-red-600">{form.formState.errors.nights.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      How many tables per night? *
                    </label>
                    <input
                      {...form.register("capacity")}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="e.g. 3-4 tables for two"
                    />
                    {form.formState.errors.capacity && (
                      <p className="text-xs text-red-600">{form.formState.errors.capacity.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Ideal payout per booking *
                    </label>
                    <select
                      {...form.register("payout")}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select range...</option>
                      <option value="10-20">£10-20</option>
                      <option value="20-30">£20-30</option>
                      <option value="30-40">£30-40</option>
                      <option value="40-60">£40-60</option>
                      <option value="60+">£60+</option>
                    </select>
                    {form.formState.errors.payout && (
                      <p className="text-xs text-red-600">{form.formState.errors.payout.message}</p>
                    )}
                  </div>
                </div>

                {/* ADDITIONAL NOTES */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Anything else we should know?
                  </label>
                  <textarea
                    {...form.register("notes")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border/60 bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Tell us about your venue's vibe, any questions you have, or what you're hoping to achieve..."
                  />
                </div>

                {/* SUBMIT */}
                <motion.button
                  type="submit"
                  disabled={mutation.isPending}
                  whileHover={!mutation.isPending ? { scale: 1.02 } : {}}
                  whileTap={!mutation.isPending ? { scale: 0.98 } : {}}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Submit application"
                  )}
                </motion.button>

                <p className="text-xs text-center text-muted-foreground">
                  We'll follow up by email within 2 business days with next steps and a simple pilot outline.
                </p>
              </form>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* FOOTER */}
        <AnimatedSection className="py-12 md:py-16 px-4 md:px-6 container mx-auto text-center border-t border-border/30">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground mb-6">
              © 2026 TwoTable Ltd.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition font-medium"
              >
                Back to home
              </Link>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition font-medium"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition font-medium"
              >
                Terms
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </main>
    </div>
  );
}