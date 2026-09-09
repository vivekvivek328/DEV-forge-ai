import logo from "../../assets/devforge-logo.png";

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ className = "size-full", priority = false }: BrandLogoProps) {
  return (
    <img
      src={logo}
      alt=""
      width={1024}
      height={1024}
      aria-hidden
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      className={`object-contain ${className}`}
    />
  );
}