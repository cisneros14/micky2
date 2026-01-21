import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps extends Omit<ImageProps, "src" | "alt"> {
  className?: string;
}

export const Logo = ({ className, ...props }: LogoProps) => (
  <Image
    className={cn("", className)}
    src="/logoSinFond.png"
    alt="Easy Closers Logo"
    width={124}
    height={32}
    {...props}
  />
);
