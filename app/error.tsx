"use client";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Error() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-950 text-center">
      <Image src="/404.png" width={500} height={500} alt="error" />

      <Link
        href="/"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
      >
        <FaHome />
        Home
      </Link>
    </div>
  );
}
