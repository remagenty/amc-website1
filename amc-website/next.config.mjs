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
    ];
  },
};

export default nextConfig;
