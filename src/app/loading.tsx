import { getLogo } from "@/lib/utils";
import Image from "next/image";

export default function GeneralLoading() {
  return (
    <div className="flex items-center">
      <Image
        src={getLogo().icon}
        alt="Loading animation"
        width={60}
        className="mr-2 animate-spin"
      />
      <p>Loading...</p>
    </div>
  );
}
