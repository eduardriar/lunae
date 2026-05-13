export const Loading = () => {
    return (
        <div
            role="status"
            aria-label="Cargando horarios"
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