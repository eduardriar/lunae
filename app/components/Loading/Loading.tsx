import { A11Y } from "@/app/utils/copies";

export const Loading = () => {
    return (
        <div
            role="status"
            aria-label={A11Y.loadingSchedules}
            style={{ display: "flex", justifyContent: "center", padding: "28px 0" }}
        >
            <div
                style={{
                    width: 28,
                    height: 28,
                    border: "2px solid var(--line)",
                    borderTopColor: "var(--negro)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }}
            />
        </div>
    )
}