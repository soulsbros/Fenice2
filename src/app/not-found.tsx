import notFound from "@/img/notFound.png";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Image
        src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/a8ff05675a435f99aa429b723ff73af4dca5c7e3/ResponseCode/404%20NotFound.png"
        alt="Error 404 - Not Found"
        width={400}
        height={200}
        priority={true}
      />
      <p className="mb-5">Looks like you failed a Survival check.</p>
      <Image src={notFound} alt="Not found image" className="mb-6" />
      <Link href="/" className="primary button">
        Back home
      </Link>
    </>
  );
}
