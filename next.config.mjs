/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "green-dexifier.vercel.app",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "rango.vip",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "api.rango.exchange",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/*/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
