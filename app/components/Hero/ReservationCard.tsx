import { stepBadgeStyle } from "@/app/utils/stepBadgeStyle";
import { useReservation } from "@/app/context/reservation-context";
import { Eyebrow } from "../eyebrow";
import { useServices } from "@/app/context/services-context";
import { useCalendarAvailability } from "@/app/hooks/useCalendarAvailability";
import { useEffect, useMemo } from "react";
import { Loading } from "../Loading/Loading";
import { formatCurrency } from "@/app/utils/currency";
import { RESERVATION_CARD } from "@/app/utils/copies";
import { getUpcomingWorkDays } from "@/app/utils/workDays";

export const ReserevationCard = () => {
    const reservation = useReservation();
    const { services, loading, error } = useServices();
    const { availability, loading: calendarLoading, error: calendarError, fetchCalendarAvailability } = useCalendarAvailability();
    const days = useMemo(() => getUpcomingWorkDays(1), []);
    const today = new Date();

    useEffect(() => {
        fetchCalendarAvailability(today.toISOString().split('T')[0])
    }, []);

    const onContinue = () => {
        reservation.setDay(days[0])
        reservation.setStep(3);
        reservation.setBookingOpen(true);
    }

    const renderCard = () => {
        if (loading && calendarLoading) return <Loading />

        return (
            <>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <Eyebrow>{RESERVATION_CARD.eyebrow}</Eyebrow>
                    <span
                        style={{
                            fontFamily: "var(--ff-mono)",
                            fontSize: 10,
                            letterSpacing: "0.18em",
                            color: "var(--sage-deep)",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <span
                            aria-hidden
                            style={{ width: 6, height: 6, background: "var(--sage-deep)", borderRadius: "50%" }}
                        />{" "}
                        {RESERVATION_CARD.available}
                    </span>
                </div>

                <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={stepBadgeStyle}>1</span>
                        <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--negro)" }}>
                            {RESERVATION_CARD.step1}
                        </span>
                    </div>
                    <select
                        value={reservation.ritual?.id}
                        onChange={(e) => {
                            const found = services.find((o) => o.id === e.target.value);
                            if (found) reservation.setRitual(found);
                        }}
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            border: "1px solid var(--line)",
                            borderRadius: 4,
                            fontFamily: "var(--ff-display)",
                            fontSize: 18,
                            color: "var(--negro)",
                            background: "var(--blanco)",
                            cursor: "pointer",
                        }}
                    >
                        {services.map((o) => (
                            <option key={o.id} value={o.id}>{o.name} - {formatCurrency(o.price)}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={stepBadgeStyle}>2</span>
                        <span style={{ fontFamily: "var(--ff-body)", fontSize: 13, color: "var(--negro)" }}>
                            {RESERVATION_CARD.step2}
                        </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                        {availability && availability.map((t) => {
                            const isBlocked = t.blocked;
                            const sel = reservation.time === t.displayTime && !isBlocked;
                            return (
                                <button
                                    type="button"
                                    key={t.displayTime}
                                    onClick={() => !isBlocked && reservation.setTime(t.displayTime)}
                                    style={{
                                        padding: 14,
                                        textAlign: "center",
                                        border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                                        background: sel ? "var(--negro)" : isBlocked ? "transparent" : "#fff",
                                        color: sel ? "var(--blanco)" : isBlocked ? "#bfb39a" : "var(--negro)",
                                        textDecoration: isBlocked ? "line-through" : "none",
                                        borderRadius: 4,
                                        cursor: isBlocked ? "not-allowed" : "pointer",
                                        fontFamily: "var(--ff-body)",
                                        fontSize: 13,
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    {t.displayTime}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onContinue}
                    disabled={!reservation.time}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: 16 }}
                >
                    {RESERVATION_CARD.cta}
                </button>
            </>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 6,
                padding: 28,
                boxShadow: "0 30px 60px -30px rgba(128,97,75,0.25)",
            }}
        >
            {renderCard()}
        </div>
    )
}