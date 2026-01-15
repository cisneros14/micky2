import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Facebook, Instagram } from "lucide-react";
import { PropertyQuoteModal } from "./property-quote-modal";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full top-3 px-3">
      <div className="flex items-center bg-background/80 backdrop-blur-sm border rounded-full justify-between container mx-auto p-3">
        <div className="bg-background border rounded-full p-1 px-4">
          <Logo className="w-16 md:w-28" />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3 md:bg-background md:p-2 rounded-full md:pl-4">
          <div className="items-center gap-2 text-muted-foreground/80 hidden md:flex">
            <Instagram className="size-5" />
            <Facebook className="size-5" />
          </div>
          <PropertyQuoteModal>
            <Button className="rounded-full">Get my cash offer</Button>
          </PropertyQuoteModal>

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
