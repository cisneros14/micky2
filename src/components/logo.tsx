import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (

  <Image className={cn("", className)} src="/logoSinFond.png" alt="Logo" width={124} height={32} />
);
