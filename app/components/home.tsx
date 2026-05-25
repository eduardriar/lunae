"use client";

import { useEffect, useRef, useState } from "react";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { Strip } from "./strip";
import { BookingModal } from "./booking-modal";
import { useToast } from "./toast";
import { Hero } from "./Home/HeroSplit";
import { HERO_OPTIONS, HERO_SLOTS } from "../utils/texts";
import { Rituals } from "./Home/Rituals";
import { ProductInfo } from "./Home/ProductInfo";
import { Location } from "./Home/Location";
import { Service } from "../generated/prisma/client";

export function Home() {
  const [ritualSel, setRitualSel] = useState(HERO_OPTIONS[0]);
  const [slotSel, setSlotSel] = useState(HERO_SLOTS[1]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingRitual, setBookingRitual] = useState<Service | null>(null);
  const [showToast, toastNode] = useToast();
  const rootRef = useRef<HTMLDivElement>(null);

  const open = (ritual?: Service) => {
    setBookingRitual(ritual ?? null);
    setBookingOpen(true);
  };

  const onConfirm = (ritual: Service) => {
    showToast(`Ritual reservado${ritual.name ? `, ${ritual.name.split(" ")[0]}` : ""}. Confirmamos por WhatsApp.`);
  };

  const scrollTo = (id: string) => {
    const el = rootRef.current?.querySelector(`[data-section="${id}"]`) as HTMLElement | null;
    if (el) {
      window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={rootRef} className="lpage">
        <Strip />
        <Nav onBook={() => open()} onNavigate={scrollTo} />
        <Hero ritualSel={ritualSel} setRitualSel={setRitualSel} slotSel={slotSel} setSlotSel={setSlotSel}/>
        <Rituals open={open}/>
        <ProductInfo />
        <Location />
        <Footer />
      </div>

      <BookingModal
        open={bookingOpen}
        initialRitual={bookingRitual}
        onClose={() => setBookingOpen(false)}
        onConfirm={onConfirm}
      />

      {toastNode}
    </>
  );
}
