"use client";

import error from "@/img/error.png";
import Image from "next/image";
import Link from "next/link";

export default function GeneralError() {
  return (
    <div>
      <p className="text-lg font-semibold">Error</p>
      <p className="mt-3 mb-5">Something went wrong.</p>
      <Image src={error} alt="Error image" className="mb-6" />
      <Link href="/" className="button">
        Back home
      </Link>
    </div>
  );
}
