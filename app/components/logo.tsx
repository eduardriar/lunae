import Image from "next/image";

type LogoProps = {
  size?: number;
  color?: string;
};

const LOGO_RATIO = 460 / 200;
const LOGO_SRC = "/assets/Logo- Web.svg";

export function Logo({ size = 20 }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Lunae"
      width={Math.round(size * LOGO_RATIO)}
      height={size}
      priority
      unoptimized
      style={{ display: "block" }}
    />
  );
}
