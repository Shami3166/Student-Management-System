// components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, GraduationCap, PlusCircle, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-4 h-4 mr-2" />,
    },
    {
      name: "Add Student",
      path: "/add",
      icon: <PlusCircle className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <header className="bg-linear-to-r from-blue-600 to-purple-700 shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo with enhanced design */}
        <Link
          to="/"
          className="flex items-center space-x-3 text-white hover:opacity-90 transition-opacity"
        >
          <div className="bg-white/20 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">
              Student Manager
            </span>
            <Badge
              variant="secondary"
              className="text-xs bg-white/20 text-white border-0"
            >
              Academic System
            </Badge>
          </div>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant={
                        location.pathname === item.path ? "default" : "ghost"
                      }
                      className={`rounded-full transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-white text-blue-600 shadow-md"
                          : "text-white hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation - Enhanced */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-linear-to-b from-blue-600 to-purple-700 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-white flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6" />
                  <span>Student Manager</span>
                </SheetTitle>
              </SheetHeader>

              <Separator className="my-4 bg-white/20" />

              <div className="flex flex-col gap-3 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? "bg-white text-blue-600 font-semibold shadow-md"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Footer in mobile menu */}
              <div className="absolute bottom-6 left-6 right-6">
                <Separator className="my-4 bg-white/20" />
                <p className="text-white/70 text-sm text-center">
                  Manage your students efficiently
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
