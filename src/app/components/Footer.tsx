"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-6 mt-12">
      {/* <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"> */}
      <div className="container-wrapper flex flex-col md:flex-row items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Image
            src="/Yuktta.png"
            alt="Yuktta Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-white">Yuktta</span>
            <span className="text-xs text-gray-400">
              Brownies, Cookies & Beyond
            </span>
          </div>
        </div>

        {/* Footer Nav */}
        <nav className="flex space-x-6 text-sm">
          <Link href="/about" className="hover:text-brand-peach">
            About
          </Link>
          <Link href="/contact" className="hover:text-brand-peach">
            Contact
          </Link>
          <Link href="/products" className="hover:text-brand-peach">
            Products
          </Link>
        </nav>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} Yuktta — All rights reserved.
      </div>
    </footer>
  );
}
