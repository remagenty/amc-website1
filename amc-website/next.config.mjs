/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/materiels",
        destination: "/catalogue",
        permanent: true,
      },
      {
        source: "/services/certification-se-plus",
        destination: "/services/certification-sav",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
