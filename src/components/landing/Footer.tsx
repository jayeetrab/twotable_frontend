import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:twotable.uk@gmail.com", label: "Email" },
];

const footerLinks = {
  Product: ["How It Works", "Pricing", "Cities", "Restaurants"],
  Company: ["About Us", "Careers", "Press", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-background/90 pt-14 pb-10 overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-gradient-to-b from-[#B80B0B]/20 via-rose-500/10 to-transparent blur-3xl opacity-70" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-10 md:mb-12 items-start">
          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <div className="inline-flex items-center rounded-2xl bg-white/5 border border-white/10 px-3 py-2 backdrop-blur-sm">
              <Logo size="sm" />
            </div>
            <p className="text-background/60 text-sm md:text-[13px] max-w-xs">
              TwoTable is the dating app that matches you with someone special
              and books your first date at a restaurant.
            </p>

            {/* Socials with motion */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.96, y: 0 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-background/70 hover:text-background hover:bg-white/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-sm font-semibold text-background">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="inline-flex items-center gap-1 text-background/55 hover:text-background transition-colors"
                    >
                      <span className="h-[3px] w-[3px] rounded-full bg-background/40" />
                      <span>{link}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] md:text-sm text-background/45" style={{marginBottom:"20px"}}>
          <p>© 2026 TwoTable Ltd.</p>
          <p className="flex items-center gap-1">
            
          </p>
        </div>
      </div>
    </footer>
  );
}
