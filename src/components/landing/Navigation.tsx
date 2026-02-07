import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export function Navigation() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
      setIsPastHero(window.scrollY > heroHeight - 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isVenuesPage = location === "/venues";

  const items = [
    { label: "Home", id: "", path: "/", section: null },
    { label: "How it works", id: "how-it-works", path: "/works", section: null },
    { label: "About", id: "about", path: "/about", section: null },
    { label: "FAQ", id: "faq", path: "/", section: "faq" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300 py-4"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Blurred pill background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 backdrop-blur-xl ${
            isVenuesPage || isPastHero
              ? "bg-white/95 border border-neutral-200 shadow-lg shadow-black/5"
              : "bg-white/10 border border-white/20"
          }`}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between px-4 md:px-5 py-2.5">
          <Link href="/" className="cursor-pointer" data-testid="link-home">
            <Logo
              size="sm"
              className={
                isVenuesPage || isPastHero ? "text-neutral-900" : "text-white"
              }
            />
          </Link>

          <div className="hidden md:flex items-center">
            <div
              className={`flex items-center gap-1 rounded-full px-1 py-1 shadow-sm transition-all duration-300 ${
                isVenuesPage || isPastHero
                  ? "border border-neutral-200 bg-white"
                  : "border border-white/10 bg-white/5"
              }`}
            >
              {items.map((item) =>
                item.section ? (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.location.pathname !== "/") {
                        window.location.href = "/#faq";
                      } else {
                        const el = document.getElementById(item.section);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isVenuesPage || isPastHero
                        ? "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                        : "text-white hover:bg-white/15"
                    }`}
                    data-testid={`nav-${item.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.path}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      item.path === "/venues"
                        ? "text-black"
                        : isVenuesPage || isPastHero
                        ? "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                        : "text-white hover:bg-white/15"
                    }`}
                    data-testid={`nav-${item.label
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {!isVenuesPage && (
            <Link href="/venues" data-testid="link-partner">
              <Button
                className={`rounded-full bg-[#B80B0B] hover:bg-[#9a0909] text-white shadow-lg shadow-[#B80B0B]/25 px-6 font-medium border ${
                  isPastHero ? "border-[#B80B0B]/40" : "border-white/30"
                }`}
              >
                Want to be a partner?
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
