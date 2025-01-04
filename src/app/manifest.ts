import { baseDesc, baseTitle } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: baseTitle,
    short_name: baseTitle,
    description: baseDesc,
    start_url: "/",
    display: "standalone",
    background_color: "#212121",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
