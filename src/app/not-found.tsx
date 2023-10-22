import Button from "@/components/button";

export default function NotFound() {
  return (
    <div>
      <p className="text-lg font-semibold">404 - Not Found</p>
      <p className="mt-3 mb-5">Looks like you failed a Survival check.</p>
      <Button href="/" label="Back home" />
    </div>
  );
}
