"use client";

import { useRef, useState } from "react";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { Strip } from "./strip";
import { BookingModal } from "./booking-modal";
import { useToast } from "./toast";
import { Hero } from "./Hero/HeroSplit";
import { Rituals } from "./Home/Rituals";
import { ProductInfo } from "./Home/ProductInfo";
import { Location } from "./Home/Location";
import { Service } from "../generated/prisma/client";
import { useReservation } from "../context/reservation-context";

export function Home() {
  const reservation = useReservation()
  const [bookingRitual, setBookingRitual] = useState<Service | null>(null);
  const [showToast, toastNode] = useToast();
  const rootRef = useRef<HTMLDivElement>(null);

  const open = (ritual?: Service) => {
    setBookingRitual(ritual ?? null);
    reservation.setBookingOpen(true);
  };

  const onConfirm = (ritual: Service | undefined) => {
    if(!!ritual){
      showToast(`Ritual reservado${ritual.name ? `, ${ritual.name.split(" ")[0]}` : ""}. Confirmamos por WhatsApp.`);
    }
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
        <Hero />
        <Rituals open={open}/>
        <ProductInfo />
        <Location />
        <Footer />
      </div>

      <BookingModal
        open={reservation.bookingOpen}
        initialRitual={bookingRitual}
        onClose={() => reservation.setBookingOpen(false)}
        onConfirm={onConfirm}
      />

      {toastNode}
    </>
  );
}
