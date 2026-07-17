"use client";

import { Logo } from "./logo";
import { NAV } from "../utils/copies";

type NavProps = {
  onBook: () => void;
  onNavigate?: (id: string) => void;
};

export function Nav({ onBook, onNavigate }: NavProps) {
  return (
    <div className="lnav">
      <Logo size={80} />
      <div className="lnav-links">
        {NAV.links.map(([label, id]) => (
          <a style={{fontSize: '1.25rem'}} key={id} onClick={() => onNavigate?.(id)}>
            {label}
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={onBook}
        className="btn btn-primary"
        style={{ fontSize: 13, padding: "12px 22px" }}
      >
        {NAV.cta} <span aria-hidden>→</span>
      </button>
    </div>
  );
}
