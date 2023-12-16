"use client";

import error from "@/img/error.png";
import Image from "next/image";
import Link from "next/link";

export default function GeneralError() {
  return (
    <>
      <p className="title">Error</p>
      <p className="mb-5">Something went wrong.</p>
      <Image src={error} alt="Error image" className="mb-6" />
      <Link href="/" className="primary button">
        Back home
      </Link>
    </>
  );
}
