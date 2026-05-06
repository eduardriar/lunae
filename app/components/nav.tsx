"use client";

import { Logo } from "./logo";

type NavProps = {
  onBook: () => void;
  onNavigate?: (id: string) => void;
};

const LINKS: Array<[string, string]> = [
  ["Rituales", "rituales"],
  ["Filosofía", "filosofia"],
  ["Visítanos", "visitanos"],
  ["Regalo", "regalo"],
];

export function Nav({ onBook, onNavigate }: NavProps) {
  return (
    <div className="lnav">
      <Logo size={20} />
      <div className="lnav-links">
        {LINKS.map(([label, id]) => (
          <a key={id} onClick={() => onNavigate?.(id)}>
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
        Agendar <span aria-hidden>→</span>
      </button>
    </div>
  );
}
