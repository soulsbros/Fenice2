import loading from "@/img/loading.gif";
import Image from "next/image";

export default function GeneralLoading() {
  return (
    <div className="flex items-center">
      <Image
        src={loading}
        alt="Loading animation"
        width={60}
        className="mr-2"
      />
      <p>Loading...</p>
    </div>
  );
}
