/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
