import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Facebook, Instagram } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-20 bg-background border">
      <div className="h-full flex items-center justify-between container px-4 mx-auto">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground/80">
            <Instagram className="size-5"/>
            <Facebook className="size-5"/>
          </div>
          <Button className="rounded-full">Get my cash offer</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
