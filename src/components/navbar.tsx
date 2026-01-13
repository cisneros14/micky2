import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Facebook, Instagram } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full h-20 top-3">
      <div className="h-full flex items-center bg-background/80 backdrop-blur-sm border rounded-full justify-between container px-6 mx-auto">
        <div className="bg-background border rounded-full p-1 px-4">
        <Logo className="w-28" />
        </div>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3 bg-background p-2 rounded-full pl-4">
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
