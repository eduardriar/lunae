import { Service } from "@/app/generated/prisma/client";
import { SideModal } from "../SideModal/side-modal"
import Image from "next/image";
import { Placeholder } from "../placeholder";
import { useReservation } from "@/app/context/reservation-context";
import { RITUALS_MODAL } from "@/app/utils/copies";

type RitualsModalProps = {
    open: boolean;
    onClose: () => void;
    service: Service | null;
}

export const RitualsModal = ({ open, onClose, service }: RitualsModalProps) => {
    const reservation = useReservation();

    const onSelectService = () => {
        if(!!service){
            onClose()
            reservation.setRitual(service);
            reservation.setStep(2);
            reservation.setBookingOpen(true);
        }
    }

    return (
        <SideModal open={open} onClose={onClose}>
            <div style={{ padding: "1rem" }}>
                {!!service && (
                    <>
                        <Placeholder style={{ padding: '3rem 0 1rem 0', width: "100%", minHeight: "560px", borderRadius: 4 }} imageUrl={service.imageUrl} alt={service.name} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "end"
                        }}>
                            <button
                                onClick={onSelectService}
                                className="btn btn-primary"
                                style={{ fontSize: 13, padding: "12px 24px" }}
                            >
                                {RITUALS_MODAL.cta}
                            </button>
                        </div>

                    </>
                )}
            </div>
        </SideModal>
    )
}