"use client";

import { useEffect, type ReactNode } from "react";

type SideModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  maxWidth?: number;
};

export function SideModal({
  open,
  onClose,
  children,
  ariaLabel,
  maxWidth = 640,
}: SideModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,24,20,0.55)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        zIndex: 1500,
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        style={{
          position: "relative",
          width: "100%",
          maxWidth,
          background: "var(--blanco)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-30px 0 80px -20px rgba(0,0,0,0.4)",
          animation: "slideInRight 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 22,
            right: 36,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: "var(--negro)",
            padding: 4,
            borderRadius: 4,
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
