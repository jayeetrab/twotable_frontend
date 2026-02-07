// src/components/landing/InteractiveDemo.tsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  X,
  MapPin,
  Clock,
  Calendar,
  Check,
  HelpCircle,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RedDot } from "./Logo";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// do NOT import MapContainerProps or LeafletMap yourself

import L from "leaflet";


type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type ProfileState = {
  selectedTags: string[];
};

type PreferencesState = {
  lookingFor: "Long-term" | "Something casual" | "Open to either";
};

type MatchState = {
  progress: number;
};

type BookingState = {
  restaurant: string | null;
  time: string | null;
};

type MatchCard = {
  id: string;
  name: string;
  distance: string;
  score: number;
  blurb: string;
  tags: string[];
  image: string;
};
const STATIC_MAP_URL =
  "https://i.postimg.cc/x1hHfHh7/Gemini-Generated-Image-pq5gcypq5gcypq5g.png";


const allProfileTags = ["Foodie", "Traveler", "Dog Lover", "Books", "Outdoors"];

const restaurantOptions = [
  {
    id: "bella",
    name: "Bella Vita",
    type: "Italian · Clifton",
    rating: 4.8,
    price: "$$$",
    eta: 25,
  },
  {
    id: "sakura",
    name: "Sakura House",
    type: "Japanese · Harbourside",
    rating: 4.7,
    price: "$$",
    eta: 30,
  },
  {
    id: "garden",
    name: "The Garden",
    type: "Farm‑to‑table · Stokes Croft",
    rating: 4.9,
    price: "$$$",
    eta: 45,
  },
];

const matches: MatchCard[] = [
  {
    id: "marcus",
    name: "Marcus, 31",
    distance: "3 miles away",
    score: 92,
    blurb: "Photographer who loves wine bars & Sunday markets.",
    tags: ["Photography", "Wine bars", "Markets"],
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "Alex",
    name: "Alex, 29",
    distance: "2 miles away",
    score: 89,
    blurb: "Designer, obsessed with cosy corners and long dinners.",
    tags: ["Design", "Red wine", "Live music"],
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
    
];

const youTimeGrid = [
  {
    day: "Friday",
    slots: ["18:30", "20:30"],
  },
  {
    day: "Saturday",
    slots: ["19:00", "21:00"],
  },
  {
    day: "Sunday",
    slots: ["17:30", "19:30"],
  },
];

// pretend these are pre‑selected by the other person
const themChosenSlots = new Set<string>(["Friday 20:30", "Saturday 19:00", "Sunday 19:30"]);

export function InteractiveDemo() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [maxUnlockedScreen, setMaxUnlockedScreen] = useState<ScreenId>(1);
  const [profile, setProfile] = useState<ProfileState>({
    selectedTags: ["Foodie", "Traveler"],
  });
  const [preferences, setPreferences] = useState<PreferencesState>({
    lookingFor: "Long-term",
  });
  const [matchState, setMatchState] = useState<MatchState>({ progress: 0 });
  const [booking, setBooking] = useState<BookingState>({
    restaurant: null,
    time: null,
  });
  // const [noTimeOverlap, setNoTimeOverlap] = useState(false);

  // results carousel state (screen 4)
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [likedMatchId, setLikedMatchId] = useState<string | null>(null);
  // const [likedMatchId, setLikedMatchId] = useState<string | null>(null);
const [likedMatch, setLikedMatch] = useState<MatchCard | null>(null);


  // restaurant decision
  const [primaryRestaurantId, setPrimaryRestaurantId] = useState<string>("bella");
  const [proposedRestaurantId, setProposedRestaurantId] = useState<string | null>(null);
  const [restaurantAgreement, setRestaurantAgreement] = useState<
    "primary" | "proposed" | null
  >(null);

  // time picker
  const [yourChosenSlots, setYourChosenSlots] = useState<Set<string>>(
    () => new Set<string>()
  );
  const [matchedSlot, setMatchedSlot] = useState<string | null>(null);

  const currentMatch = matches[activeMatchIndex];

  // modern matching animation auto‑advance
  useEffect(() => {
    if (currentScreen !== 3) return;
    setMatchState({ progress: 0 });
    const start = Date.now();
    const duration = 2600;

    let rafId: number;
    const loop = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setMatchState({ progress: pct });
      if (pct < 100) {
        rafId = requestAnimationFrame(loop);
      } else {
        setTimeout(() => setCurrentScreen(4), 450);
      }
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [currentScreen]);

  // auto-slide matches on screen 4 (only when not in full profile view)
  useEffect(() => {
    if (currentScreen !== 4 || showFullProfile || likedMatchId) return;
    const timer = setInterval(() => {
      setActiveMatchIndex((prev) => (prev + 1) % matches.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [currentScreen, showFullProfile, likedMatchId]);

  // compute overlapping slots when yourChosenSlots change
  useEffect(() => {
  if (yourChosenSlots.size < 3) {
    setMatchedSlot(null);
    return;
  }
  const overlaps = [...yourChosenSlots].filter((slot) =>
    themChosenSlots.has(slot)
  );
  setMatchedSlot(overlaps[0] ?? null);
}, [yourChosenSlots]);


  const goToScreen = (index: number) => {
    if (index >= 1 && index <= 9) {
      setCurrentScreen(index as ScreenId);
      setShowFullProfile(false);
    }
  };
  type LatLngTuple = [number, number];

type AnimatedRouteProps = {
  from: LatLngTuple;
  to: LatLngTuple;
  color: string;
};

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ from, to, color }) => {
  const mid: LatLngTuple = [
    (from[0] + to[0]) / 2 + 0.003,
    (from[1] + to[1]) / 2 - 0.003,
  ];

  const pathOptions = {
    color,
    weight: 3,
    dashArray: "6 8",
    className: "route-dotted-animate",
  };

  return <Polyline positions={[from, mid, to]} pathOptions={pathOptions} />;
};


  const goNext = () => {
    if (currentScreen < 9) {
      setCurrentScreen((prev) => (prev + 1) as ScreenId);
      setShowFullProfile(false);
    }
  };

  const goBack = () => {
    if (currentScreen > 1) {
      setCurrentScreen((prev) => (prev - 1) as ScreenId);
      setShowFullProfile(false);
    }
  };

  const toggleTag = (tag: string) => {
    setProfile((prev) => {
      const exists = prev.selectedTags.includes(tag);
      if (exists) {
        return {
          ...prev,
          selectedTags: prev.selectedTags.filter((t) => t !== tag),
        };
      }
      return { ...prev, selectedTags: [...prev.selectedTags, tag] };
    });
  };

  const handleDislike = () => {
    if (matches.length === 0) return;
    setActiveMatchIndex((prev) => (prev + 1) % matches.length);
  };

  const handleLike = () => {
    const liked = currentMatch;
    setLikedMatchId(liked.id);
    setLikedMatch(liked);
    // lock in the liked match and jump to restaurants
    setTimeout(() => {
      // set TwoTable‑picked primary restaurant and reset any proposals
      setPrimaryRestaurantId("bella");
      setProposedRestaurantId(null);
      setRestaurantAgreement(null);
      setCurrentScreen(5);
      setMaxUnlockedScreen((old) => (5 > old ? 5 : old));
    }, 550);
  };

  const primaryRestaurant = useMemo(
    () => restaurantOptions.find((r) => r.id === primaryRestaurantId)!,
    [primaryRestaurantId]
  );

  const effectiveRestaurant = useMemo(() => {
    if (restaurantAgreement === "proposed" && proposedRestaurantId) {
      return restaurantOptions.find((r) => r.id === proposedRestaurantId)!;
    }
    return primaryRestaurant;
  }, [primaryRestaurant, restaurantAgreement, proposedRestaurantId]);

  const selectRestaurant = (id: string) => {
    setProposedRestaurantId(id);
  };

  const confirmPrimaryRestaurant = () => {
    setRestaurantAgreement("primary");
    const rest = primaryRestaurant;
    setBooking((prev) => ({
      ...prev,
      restaurant: rest.name,
    }));
    setCurrentScreen(6);
  };

  const confirmProposedRestaurant = () => {
    if (!proposedRestaurantId) return;
    setRestaurantAgreement("proposed");
    const rest = restaurantOptions.find((r) => r.id === proposedRestaurantId)!;
    setBooking((prev) => ({
      ...prev,
      restaurant: rest.name,
    }));
    setCurrentScreen(6);
  };

  const toggleYourSlot = (slotKey: string) => {
    setYourChosenSlots((prev) => {
      const next = new Set(prev);
      if (next.has(slotKey)) {
        next.delete(slotKey);
      } else {
        next.add(slotKey);
      }
      return next;
    });
  };

  const [noTimeOverlap, setNoTimeOverlap] = useState(false);

const lockTimeAndGoConfirm = () => {
  // need at least 3 choices from you, and a restaurant already chosen
  if (yourChosenSlots.size < 3 || !booking.restaurant) return;

  const youPicked = yourChosenSlots.size > 0;
  const theyPicked = themChosenSlots.size > 0;

  // CASE A: there IS an overlap -> normal flow
  if (matchedSlot) {
    setNoTimeOverlap(false);
    setBooking((prev) => ({
      ...prev,
      time: matchedSlot.replace(" ", " · "),
    }));
    setCurrentScreen(7);
    setMaxUnlockedScreen((old) => (7 > old ? 7 : old));
    return;
  }

  // CASE B: NO overlap but both have times -> “approved by” flow
  if (!matchedSlot && youPicked && theyPicked) {
    setNoTimeOverlap(true);
    const firstYourSlot = [...yourChosenSlots][0]; // one of your slots
    setBooking((prev) => ({
      ...prev,
      time: firstYourSlot.replace(" ", " · "),
    }));
    setCurrentScreen(7);
    setMaxUnlockedScreen((old) => (7 > old ? 7 : old));
  }
};

const [hasSeenGuide, setHasSeenGuide] = useState(false);
const isFirstScreen = currentScreen === 1 && !hasSeenGuide;

  const demoScreens = [
    {
      id: 1 as ScreenId,
      title: "Your TwoTable profile",
      subtitle: "A real person, not just a swipe.",
      content: (
        <div className="p-4 space-y-4 h-full flex flex-col">
          {/* big centered profile card like earlier hero */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-[210px] rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.48)] bg-black/90">
              <div className="relative h-60">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sarah profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <p className="text-sm font-semibold">Sarah, 28 · Bristol</p>
                  <p className="text-[11px] text-white/80">
                    Marketing · Loves hiking, cosy wine bars and cooking for
                    friends.
                  </p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {profile.selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-white/15 text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* small tag row under card */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Tap a few words that describe your vibe:
            </p>
            <div className="flex gap-2 flex-wrap">
              {allProfileTags.map((tag) => {
                const active = profile.selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${
                      active
                        ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/40"
                        : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground">
              We’ll use this to match you with people who feel like the same kind
              of night.
            </p>
          </div>
        </div>
      ),
    },
    {
  id: 2 as ScreenId,
  title: "Dial in your night",
  subtitle: "We’ll tune both the match and the table.",
  content: (
    <div className="p-4 space-y-4 pb-6">
      {/* date energy pill tabs (white + red) */}
      <div className="rounded-2xl bg-white border border-neutral-200 p-3 shadow-sm">
        <p className="text-[11px] text-neutral-500 mb-2">
          Date energy
        </p>
        <div className="relative flex text-[11px] font-medium rounded-full bg-neutral-100 p-1">
          {["Slow dinner", "Wine bar", "Low‑key drinks"].map((label, idx) => {
            const targetLookingFor =
              idx === 0
                ? "Long-term"
                : idx === 1
                ? "Something casual"
                : "Open to either";
            const active = preferences.lookingFor === targetLookingFor;
            return (
              <button
                key={label}
                type="button"
                onClick={() =>
                  setPreferences({
                    lookingFor: targetLookingFor as PreferencesState["lookingFor"],
                  })
                }
                className="relative flex-1 px-2 py-1.5"
              >
                {active && (
                  <motion.div
                    layoutId="dateEnergyPill"
                    className="absolute inset-0 rounded-full bg-[#B80B0B] text-white"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 26,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active ? "text-white" : "text-neutral-700"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-neutral-500">
          This sets the kind of venue, lighting and noise level we look for.
        </p>
      </div>

      {/* distance + age – fully selectable chips */}
      <div className="rounded-2xl bg-white border border-neutral-200 p-3 space-y-3 shadow-sm">
        <div className="space-y-1">
          <p className="text-[11px] text-neutral-500">Distance</p>
          <div className="flex gap-1.5">
            {["5 miles", "10 miles", "15 miles+"].map((label) => {
              const active = label === "15 miles+"; // demo default
              return (
                <motion.button
                  key={label}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  className={`px-2.5 py-1 rounded-full text-[11px] border ${
                    active
                      ? "bg-[#B80B0B] text-white border-[#B80B0B]"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] text-neutral-500">Age window</p>
          <div className="flex gap-1.5">
            {["25–33", "27–35", "30–40"].map((label) => {
              const active = label === "27–35";
              return (
                <motion.button
                  key={label}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  className={`px-2.5 py-1 rounded-full text-[11px] border ${
                    active
                      ? "bg-[#B80B0B] text-white border-[#B80B0B]"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* tonight is more about… – selectable chips */}
      <div className="rounded-2xl bg-white border border-neutral-200 p-3 space-y-2 shadow-sm">
        <p className="text-[11px] text-neutral-500">
          Tonight is more about…
        </p>
        <div className="flex flex-wrap gap-1.5">
          {[
            "Good conversation",
            "Quiet table",
            "Great wine list",
            "Sharing plates",
            "Short and sweet",
          ].map((tag) => {
            // simple demo: selected if it’s in profile.selectedTags
            const selected = profile.selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] border ${
                  selected
                    ? "bg-[#B80B0B] text-white border-[#B80B0B]"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200"
                }`}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
        <p className="text-[10px] text-neutral-500">
          We use these to pick restaurants, not to hard‑filter people.
        </p>
      </div>
    </div>
  ),
}

,
    {
      id: 3 as ScreenId,
      title: "Finding your match",
      subtitle: "People, then places — in one flow.",
      content: (
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* outer orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* pulsing restaurant halo */}
              <motion.div
                className="absolute w-24 h-24 rounded-full bg-primary/6 blur-sm"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              {/* you */}
              <motion.div
                className="w-16 h-16 rounded-full overflow-hidden shadow-[0_14px_35px_rgba(15,23,42,0.55)] border-2 border-white"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="You"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* orbiting matches */}
              {matches.map((m, idx) => {
                const angle = (idx / matches.length) * Math.PI * 2;
                const radius = 70;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={m.id}
                    className="absolute w-10 h-10 rounded-full overflow-hidden border border-white/70 shadow-md"
                    style={{ x, y }}
                    animate={{
                      y: [y - 4, y + 4, y - 4],
                    }}
                    transition={{
                      duration: 3.2 + idx,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Matching people</span>
                <span>{matchState.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: `${matchState.progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                We look at your profile, date energy and availability first, then
                check for great tables within 25, 30 and 45 minutes of you both.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4 as ScreenId,
      title: "Tap who you vibe with",
      subtitle: "Love = match. X = pass.",
      content: (
        <div className="p-4 h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentMatch.id}
                initial={{ opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -26, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="w-full max-w-[230px] rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.48)] bg-black/90 text-left"
              >
                <div className="relative h-64">
                  <img
                    src={currentMatch.image}
                    alt={currentMatch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 h-8 px-3 rounded-full bg-black/80 text-white text-[11px] flex items-center gap-1">
                    <Heart className="w-3 h-3 text-primary" />
                    {currentMatch.score}% match
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <p className="text-sm font-semibold">{currentMatch.name}</p>
                    <p className="text-[11px] text-white/80">
                      {currentMatch.distance}
                    </p>
                    <p className="text-[11px] text-white/80 line-clamp-2">
                      {currentMatch.blurb}
                    </p>
                    <div className="mt-1 flex gap-1 flex-wrap">
                      {currentMatch.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/15 text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* like / dislike bar */}
                <div className="p-3 flex items-center justify-between bg-background">
                  <button
                    type="button"
                    onClick={handleDislike}
                    className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFullProfile(true)}
                    className="px-3 py-1.5 rounded-full text-[11px] border border-neutral-200 text-neutral-700 hover:bg-muted"
                  >
                    View profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLike}
                    className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_10px_30px_rgba(184,11,11,0.55)]"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* full profile overlay */}
          <AnimatePresence>
            {showFullProfile && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-x-4 top-[140px] z-20"
              >
                <div className="w-full max-w-[260px] mx-auto rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.7)] bg-background">
                  <div className="relative h-52">
                    <img
                      src={currentMatch.image}
                      alt={currentMatch.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute top-3 left-3 h-7 px-3 rounded-full bg-black/80 text-white text-[11px] flex items-center gap-1">
                      <Heart className="w-3 h-3 text-primary" />
                      {currentMatch.score}% match
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-sm font-semibold text-neutral-900">
                      {currentMatch.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {currentMatch.distance}
                    </p>
                    <p className="text-[11px] text-neutral-700 leading-relaxed">
                      Loves long conversations, hates shouting over the bar, and is
                      happiest when the table already has a plan and a good bottle
                      on it.
                    </p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {currentMatch.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-black/5 text-[10px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowFullProfile(false)}
                        className="flex-1 rounded-full border border-neutral-200 text-xs py-2 text-neutral-700 hover:bg-muted"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleLike}
                        className="flex-1 rounded-full bg-primary text-primary-foreground text-xs py-2 flex items-center justify-center gap-1"
                      >
                        <Heart className="w-3 h-3 fill-current" />
                        Love
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* hint */}
          <p className="mt-3 text-[11px] text-center text-muted-foreground">
            Love locks in a match and jumps straight to picking a time and a table.
          </p>
        </div>
      ),
    },
    {
      id: 5 as ScreenId,
      title: "We pick the restaurants",
      subtitle: "All within 25–45 minutes of you both.",
      content: (
        <div className="p-4 space-y-3">
          <div className="p-3 rounded-xl bg-accent/60 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <p className="text-[11px] text-muted-foreground">
              TwoTable holds a few tables within 25, 30 and 45 minutes of where
              you both can get to after the match.
            </p>
          </div>
          <div className="space-y-2">
            {restaurantOptions.map((restaurant) => {
              const isPrimary = restaurant.id === primaryRestaurantId;
              const proposed = proposedRestaurantId === restaurant.id;
              return (
                <motion.button
                  key={restaurant.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => selectRestaurant(restaurant.id)}
                  className={`w-full text-left p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    proposed
                      ? "border-primary bg-accent/80"
                      : isPrimary
                      ? "border-primary/60 bg-muted/80"
                      : "border-transparent bg-muted hover:bg-muted/90"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-medium text-sm">{restaurant.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        {restaurant.type}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Within {restaurant.eta} minutes of both of you.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        {restaurant.rating}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {restaurant.price}
                      </span>
                      {isPrimary && (
                        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                          <Check className="w-3 h-3" />
                          Our pick
                        </div>
                      )}
                      {proposed && !isPrimary && (
                        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                          <Check className="w-3 h-3" />
                          You proposed
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="pt-1 space-y-2">
            <button
              type="button"
              onClick={confirmPrimaryRestaurant}
              className="w-full rounded-full bg-neutral-900 text-white text-xs py-2.5 flex items-center justify-center gap-1"
            >
              Keep TwoTable’s recommendation
            </button>
            <button
              type="button"
              onClick={confirmProposedRestaurant}
              disabled={!proposedRestaurantId}
              className="w-full rounded-full border text-xs py-2.5 flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Propose this instead
            </button>
            <p className="text-[11px] text-muted-foreground text-center" style={{marginBottom:"30px"}}>
              You can only choose from this list; if your match accepts your
              proposal, the booking is auto‑confirmed.
            </p>
          </div>
        </div>
      ),
    },
    

// put this near the top with other constants

{
  id: 6 as ScreenId,
  title: "See it on the map",
  subtitle: "How far it is for both of you.",
  content: (
    <div className="p-4 space-y-3">
      
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          Visualising the commute to {booking.restaurant ?? effectiveRestaurant.name}~25–45 min door to door
        </p>
        {/* <span className="text-[10px] text-neutral-500">
          ~25–45 min door to door
        </span> */}
      </div>

      {/* map-style card */}
      <div className="w-full h-52 rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.75)] border border-neutral-200 relative bg-neutral-900">
        {/* static map background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${STATIC_MAP_URL}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(0.4) contrast(1.05) brightness(0.95)",
          }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* dark wash */}
        <div className="absolute inset-0 bg-black/35" />

        {/* restaurant photo + label */}
        <motion.div
          className="absolute right-3 top-3 z-20 flex flex-col items-end gap-1"
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/80 shadow-lg bg-black/60" style={{marginTop:"60px"}}>
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt={booking.restaurant ?? effectiveRestaurant.name}
              className="w-full h-full object-cover"
              
            />
          </div>
          <div className="px-2 py-1 rounded-full bg-black/80 text-[10px] text-white flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B80B0B]" />
            {booking.restaurant ?? effectiveRestaurant.name}
          </div>
        </motion.div>

        {/* you avatar + time */}
        <motion.div
          className="absolute left-3 bottom-4 z-20 flex items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/90 bg-black/40">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="You"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] text-white/85">
            You · ~{primaryRestaurant.eta} min
          </span>
        </motion.div>

        {/* them avatar + time */}
        <motion.div
          className="absolute left-3 top-4 z-20 flex items-center gap-2"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/90 bg-black/40">
    <img
      src={
        likedMatch?.image ??
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"
      }
      alt={likedMatch?.name ?? "Them"}
      className="w-full h-full object-cover"
    />
  </div>
  <span className="text-[10px] text-white/85">
    {likedMatch?.name ?? "Them"} · ~
    {Math.max(primaryRestaurant.eta - 5, 20)} min
  </span>
</motion.div>
{noTimeOverlap && (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-2 py-0.5 rounded-full bg-red-100 text-[10px] text-red-700 font-medium"
    >
      Approved by {likedMatch?.name ?? "your match"}
    </motion.div>
  )}



        {/* animated dotted routes towards restaurant */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 300 210"
          className="absolute inset-0 z-10 pointer-events-none"
        >
          {/* you -> restaurant */}
          <motion.path
            d="M50 170 C 130 155, 180 145, 240 110"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* them -> restaurant */}
          <motion.path
            d="M50 40 C 130 60, 180 75, 240 110"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
              delay: 0.3,
            }}
          />
        </motion.svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>
          You ~{primaryRestaurant.eta} min · Them ~
          {Math.max(primaryRestaurant.eta - 5, 20)} min
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          balanced travel
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground">
        The dotted paths move towards the restaurant so you both see how the night
        meets in the middle.
      </p>
    </div>
  ),
},
    {
      id: 7 as ScreenId,
      title: "Pick a time together",
      subtitle: "You choose three, we find the overlap.",
      content: (
        <div className="p-4 space-y-3 h-full flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Choose at least three times on your side.
            </p>
            <HelpCircle className="w-3 h-3 text-muted-foreground" />
          </div>

          <div className="flex-1 rounded-2xl bg-muted/60 p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] font-medium">You</span>
              </div>
              <div className="flex items-center gap-2">
  <span className="text-[11px] font-medium">
    {likedMatch?.name ?? "Them"}
  </span>
  <div className="w-6 h-6 rounded-full overflow-hidden">
    <img
      src={
        likedMatch?.image ??
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"
      }
      alt={likedMatch?.name ?? "Them"}
      className="w-full h-full object-cover"
    />
  </div>
</div>

            </div>

            <div className="mt-1 rounded-xl bg-background p-2 space-y-2">
              {youTimeGrid.map((row) => (
                <div key={row.day} className="space-y-1">
                  <p className="text-[11px] font-medium text-neutral-700">
                    {row.day}
                  </p>
                  <div className="flex flex-col gap-1">
                    {row.slots.map((slot) => {
                      const key = `${row.day} ${slot}`;
                      const youSelected = yourChosenSlots.has(key);
                      const themSelected = themChosenSlots.has(key);
                      const overlap = youSelected && themSelected;
                      return (
                        <div
                          key={key}
                          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                            overlap
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/60"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleYourSlot(key)}
                            className={`flex-1 flex items-center justify-between rounded-full px-2 py-1 ${
                              youSelected
                                ? overlap
                                  ? "bg-primary/20"
                                  : "bg-white"
                                : "bg-black/5"
                            }`}
                          >
                            <span>
                              {slot}{" "}
                              <span className="text-[10px] opacity-70">
                                you
                              </span>
                            </span>
                            {youSelected && (
                              <Check className="w-3 h-3 opacity-80" />
                            )}
                          </button>
                          <div
                            className={`flex-1 flex items-center justify-between rounded-full px-2 py-1 ${
                              themSelected
                                ? overlap
                                  ? "bg-primary/20"
                                  : "bg-white/80"
                                : "bg-black/5"
                            }`}
                          >
                            <span>
                              {slot}{" "}
                              <span className="text-[10px] opacity-70">
                                them
                              </span>
                            </span>
                            {themSelected && (
                              <Check className="w-3 h-3 opacity-80" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 space-y-1">
              <p className="text-[11px] text-muted-foreground" style={{marginBottom:"30px"}}>
                We’ll automatically suggest a table within 45 minutes from your location.
              </p>
             


            </div>
          </div>
        </div>
      ),
    },
    {
  id: 8 as ScreenId,
  title: "Matched and synced",
  subtitle: "Same person, same time, same table.",
  content: (
    <div className="p-4 space-y-4 h-full flex flex-col">
      {/* layered motion backdrop */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* soft pulsing halo */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-primary/12 blur-xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* faint orbit ring */}
        <motion.div
          className="absolute w-44 h-44 rounded-full border border-white/8"
          animate={{ rotate: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* glass card with avatars */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full max-w-[230px] rounded-2xl  border border-white/10 px-4 py-3 backdrop-blur-md shadow-[0_24px_70px_rgba(15,23,42,0.8)]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-neutral-950/80">
              Tonight
            </span>
            <motion.span
              className="px-3 py-1 rounded-full bg-primary/15 text-[10px] text-primary font-medium flex items-center gap-1"
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Matched
            </motion.span>
          </div>

          {/* avatars + subtle connector */}
          <div className="relative flex items-center justify-between">
            <motion.div
              className="w-36 h-0.5 from-white/10 via-white/40 to-white/10 absolute left-1/2 -translate-x-1/2 top-1/2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            />
            <motion.div
              className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.5)] bg-neutral-900"
              initial={{ x: -6, opacity: 0, scale: 0.85 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{marginBottom:"20px"}}
            >
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="You"
                className="w-full h-full object-cover"
                
              />
            </motion.div>
            <div className="relative flex flex-col items-center gap-1">
  <motion.div
    className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.5)] bg-neutral-900"
    initial={{ x: 6, opacity: 0, scale: 0.85 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 18,
      delay: 0.05,
    }}
  >
    <img
      src={
        likedMatch?.image ??
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
      alt={likedMatch?.name ?? "Match"}
      className="w-full h-full object-cover"
    />
  </motion.div>

  {noTimeOverlap && (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-2 py-0.5 rounded-full bg-red-100 text-[10px] text-red-700 font-medium"
    >
      Approved by {likedMatch?.name ?? "your match"}
    </motion.div>
  )}
</div>


          </div>

          {/* tiny info strip */}
          <motion.p
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.22, duration: 0.3 }}
  className="mt-3 text-[11px] text-neutral-950/80"
>
  {noTimeOverlap
    ? "You chose different times, but they’ve approved one of yours."
    : "You both chose overlapping times and a TwoTable‑curated spot."}
</motion.p>

        </motion.div>
      </div>

      {/* info card below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
        className="bg-muted rounded-xl p-4 text-left space-y-3"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-xs">
            {booking.restaurant ?? effectiveRestaurant.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-xs">
            {booking.time ?? matchedSlot?.replace(" ", " · ")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs">Within 45 minutes of you both.</span>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground text-center">
        Next you both see the final reservation tile with the restaurant photo and time.
      </p>
    </div>
  ),
}
,
    {
  id: 9 as ScreenId,
  title: "Your table is locked",
  subtitle: "Restaurant, time and details in one card.",
  content: (
    <div className="p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-3xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.55)] bg-background"
      >
        <div className="relative h-40">
          <img
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt={booking.restaurant ?? effectiveRestaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
            <p className="text-sm font-semibold">
              {booking.restaurant ?? effectiveRestaurant.name}
            </p>
            <p className="text-[11px] text-white/80">
              Clifton · Quiet tables for two
            </p>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {booking.time ??
                matchedSlot?.replace(" ", " · ") ??
                "Saturday · 20:30"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-xs text-muted-foreground">
              12 Regent Street, Bristol · Within 45 minutes of you both
            </span>
          </div>
          <div className="flex items-center gap-2">
  <Heart className="w-4 h-4 text-primary" />
  <span className="text-xs text-muted-foreground">
    You and {likedMatch?.name ?? "your match"} see this same card.
  </span>
</div>

        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground text-center">
        Just show up at the time above. If either of you proposes a different
        restaurant from the list and both confirm, this card updates automatically.
      </p>
    </div>
  ),
},
  ];

  const active = demoScreens.find((s) => s.id === currentScreen)!;

  return (
    <section id="demo" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block mb-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              <span className="inline-block h-2 w-2 rounded-full bg-[#B80B0B]" />
              Experience TwoTable
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-2 text-3xl md:text-5xl font-bold text-neutral-900 leading-tight"
          >
            See how TwoTable works
            <RedDot />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            Tap through the journey like a modern dating app – from your profile,
            to a match you love, to a table within 45 minutes that suits you both.
          </motion.p>
        </AnimatedSection>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-14">
          
          {/* Phone mockup */}
          <AnimatedSection>
            <div className="relative">
              {/* modern device frame */}
              <div className="relative w-[290px] h-[600px] rounded-[2.6rem] bg-gradient-to-b from-neutral-900 to-black p-2 shadow-[0_30px_90px_rgba(0,0,0,0.7)] border border-white/10">
                <div className="relative w-full h-full rounded-[2.1rem] bg-background overflow-hidden">
                  {/* dynamic island */}
<div className="absolute top-3 left-1/2 -translate-x-1/2">
      <div
        className="w-24 h-6 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
        style={{ backgroundColor: "#000000" }}
      />
    </div>
  {/* header: back + brand */}
                  <div className="relative z-10 flex items-center justify-between px-3 pt-8 pb-3 bg-background/95">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={currentScreen === 1}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-700 hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                      TwoTable
                    </p>
                    <div className="h-8 w-8" />
                  </div>

                  {/* title bar */}
                  <div className="px-4 py-2 bg-background/95 border-b border-border">
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {active.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      {active.subtitle}
                    </p>
                  </div>

                  {/* content */}
                  {/* content – scrolls inside the phone, not the page */}
{/* content – scrolls inside the phone, not the page */}
<div className="flex-1 overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentScreen}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className="h-full max-h-[480px] overflow-y-auto no-scrollbar overscroll-contain"
    >
      {active.content}
    </motion.div>
  </AnimatePresence>
</div>


                  {/* in‑app round next button */}
                  {currentScreen < 9 && currentScreen !== 4 && currentScreen !== 5 &&  (
  <div className="absolute bottom-4 right-4">
    <button
      type="button"
      onClick={goNext}
      className="h-11 w-11 rounded-full bg-[#B80B0B] flex items-center justify-center shadow-[0_14px_35px_rgba(184,11,11,0.55)] border border-white/40"
    >
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  </div>
)}

                </div>
              </div>

              {/* external arrows (desktop only) */}
              <motion.button
                onClick={goBack}
                disabled={currentScreen === 1}
                whileHover={currentScreen === 1 ? {} : { y: -2 }}
                whileTap={currentScreen === 1 ? {} : { scale: 0.96 }}
              >

              </motion.button>
              <motion.button
                onClick={goNext}
                disabled={currentScreen === 9}
                whileHover={currentScreen === 9 ? {} : { y: -2 }}
                whileTap={currentScreen === 9 ? {} : { scale: 0.96 }}
              >

              </motion.button>
            </div>
          </AnimatedSection>

          {/* step indicators */}
          <AnimatedSection className="lg:pl-6 w-full lg:w-auto">
            <div className="space-y-3 max-w-md mx-auto">
              {demoScreens.map((screen) => {
  const isActive = screen.id === currentScreen;
  const isFuture = screen.id > currentScreen;

  return (
    <motion.button
      key={screen.id}
      onClick={() => {
        if (!isFuture) goToScreen(screen.id);
      }}
      disabled={isFuture}
      className={`flex items-center gap-4 w-full text-left rounded-2xl px-3 py-3 transition-all ${
        isActive
          ? "bg-neutral-900 text-white shadow-[0_20px_60px_rgba(15,23,42,0.5)]"
          : "bg-white/80 text-neutral-800 border border-neutral-200 hover:bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
      } ${isFuture ? "cursor-not-allowed opacity-60 hover:bg-white/80" : ""}`}
      whileHover={isFuture ? {} : { y: -2 }}
      whileTap={isFuture ? {} : { scale: 0.98 }}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ${
          isActive
            ? "bg-white text-neutral-900"
            : "bg-neutral-100 text-neutral-600"
        }`}
      >
        {screen.id}
      </span>
      <div>
        <p
          className={`font-medium text-sm ${
            isActive ? "text-white" : "text-neutral-900"
          }`}
        >
          {screen.title}
        </p>
        <p
          className={`text-xs ${
            isActive ? "text-white/80" : "text-neutral-500"
          }`}
        >
          {screen.subtitle}
        </p>
      </div>
    </motion.button>
  );
})}

            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
