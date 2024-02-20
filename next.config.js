/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lafenice.soulsbros.ch",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        pathname: "/avatar/*",
      },
    ],
  },
};

module.exports = nextConfig;
