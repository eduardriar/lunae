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
import { RitualsModal } from "./Rituals/rituals-modal";
import { TOAST } from "../utils/copies";

export function Home() {
  const reservation = useReservation();
  const [servicesModal, setServicesModal] = useState(false);
  const [infoServiceSelection, setInfoServicesSelection] = useState<Service | null>(null);
  const [bookingRitual, setBookingRitual] = useState<Service | null>(null);
  const [showToast, toastNode] = useToast();
  const rootRef = useRef<HTMLDivElement>(null);

  const open = (ritual?: Service) => {
    setBookingRitual(ritual ?? null);
    reservation.setBookingOpen(true);
  };

  const openServicesInfoModal = (ritual: Service) => {
    setInfoServicesSelection(ritual);
    setServicesModal(true);
  }

  const onConfirm = (ritual: Service | undefined) => {
    if(!!ritual){
      showToast(TOAST.reserved(ritual.name ? ritual.name.split(" ")[0] : undefined));
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
        <Rituals open={openServicesInfoModal} />
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
      <RitualsModal 
        open={servicesModal}
        onClose={() => setServicesModal(false)}
        service={infoServiceSelection}
      />

      {toastNode}
    </>
  );
}
