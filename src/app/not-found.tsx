import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p className="text-lg font-semibold">404 - Not Found</p>
      <p className="mt-3 mb-5">Looks like you failed a Survival check.</p>
      <Link href="/" className="button">
        Back home
      </Link>
    </div>
  );
}
