import { STRIP_ITEMS } from "../utils/copies";

export function Strip() {
  return (
    <div className="lstrip">
      ✦ {STRIP_ITEMS[0]}
      <span className="dot">·</span>
      {STRIP_ITEMS[1]}
      <span className="dot">·</span>
      {STRIP_ITEMS[2]}
    </div>
  );
}
