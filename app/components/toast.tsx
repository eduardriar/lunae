"use client";

import { useCallback, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);

  const show = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }, []);

  const node = toast ? (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--negro)",
        color: "var(--blanco)",
        padding: "14px 22px",
        borderRadius: 999,
        zIndex: 2000,
        fontFamily: "var(--ff-body)",
        fontSize: 13,
        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "toastIn 0.3s ease",
      }}
    >
      <span
        aria-hidden
        style={{ width: 8, height: 8, background: "var(--sage)", borderRadius: "50%" }}
      />
      {toast}
    </div>
  ) : null;

  return [show, node] as const;
}
