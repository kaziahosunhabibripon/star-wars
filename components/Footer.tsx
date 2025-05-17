"use client";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 flex flex-col-reverse gap-2 items-center justify-center w-full bg-amber-50 ">
      <span className="text-sm text-gray-700 flex flex-col  sm:text-center dark:text-gray-400">
        <Link
          href="https://github.com/kaziahosunhabibripon/"
          className="hover:underline  hover:decoration-sky-500 hover:underline-offset-4 transition duration-200"
        >
          © {new Date().getFullYear()} Ripon™{" "}
        </Link>
        Star Wars Explorer. All Rights Reserved.
      </span>

      <Link
        href="https://www.linkedin.com/in/kazi-ahosun-habib-ripon"
        className="hover:underline mt-2 hover:decoration-sky-500 hover:underline-offset-4 transition duration-200"
      >
        <FaLinkedinIn className="text-sky-700" />
      </Link>
    </footer>
  );
}
