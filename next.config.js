/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lafenice.soulsbros.ch",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/avatar/*",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/SAWARATSUKI/KawaiiLogos/**",
      },
    ],
  },
};

module.exports = nextConfig;
