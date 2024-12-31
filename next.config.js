/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.soulsbros.ch",
        port: "",
        pathname: "/fenice/**",
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
  // https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps#8-securing-your-application
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
