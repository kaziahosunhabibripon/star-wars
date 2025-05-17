"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`sticky top-0 z-50 bg-fuchsia-100 border-gray-200  transition-shadow duration-300 ${
        isScrolled ? "shadow-md shadow-sky-950" : ""
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image
            src="/starwar.png"
            className="w-12 h-auto hover:animate-bounce"
            width={16}
            height={16}
            alt="Starswar Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap hover:underline hover:decoration-sky-500 hover:underline-offset-4 transition duration-200">
            Starswar
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-row items-center justify-center p-2  gap-2">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-500 hover:underline hover:decoration-sky-500 hover:underline-offset-4 transition duration-200"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="#"
                className="block my-2 rounded-full p-1 text-gray-900  border border-slate-500 hover:animate-bounce"
              >
                <User className="text-amber-700 " />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
