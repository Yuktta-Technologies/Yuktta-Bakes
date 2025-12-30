"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, ShoppingCart, User } from "lucide-react";

type HeaderProps = {
  cartItemCount?: number;
};

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    pathname === href
      ? "text-brand-peach font-semibold border-b-2 border-brand-peach"
      : "text-white hover:text-brand-peach";

  return (
    <header
      className={`w-full sticky top-0 z-50 ${
        isScrolled ? "shadow-md" : ""
      } bg-brand-dark transition-colors`}
    >
      {/* Left & right padding can be tweaked with pl-* and pr-* */}
      <div className="container-wrapper">
        <div className="flex items-center py-3">
          {/* Logo + Brand (left) */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-90"
          >
            <Image
              src="/Yuktta.png"
              alt="Yuktta Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-white">Yuktta</span>
              <span className="text-xs text-gray-300">
                Brownies, Cookies & Beyond
              </span>
            </div>
          </Link>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center space-x-20 mx-auto text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions (right) */}
          <div className="flex items-center space-x-4 pr-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-white p-2 hover:bg-white/10 rounded"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>

            {/* Cart */}
            <div className="relative">
              <button className="p-2 rounded hover:bg-white/10 text-white">
                <ShoppingCart className="w-4 h-4" />
              </button>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full bg-brand-peach text-brand-dark font-semibold">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Profile */}
            <button className="p-2 rounded hover:bg-white/10 text-white">
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-auto pr-4">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded hover:bg-white/10 text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t py-4 space-y-4 ${
              !isScrolled ? "border-white/20" : ""
            }`}
          >
            <div className="flex flex-col">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="py-2 text-white">
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded hover:bg-white/10 text-white"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 rounded hover:bg-white/10 text-white">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded hover:bg-white/10 text-white">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
