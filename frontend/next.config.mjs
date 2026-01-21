const nextConfig = {
  reactStrictMode: false,
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "admin.models.ai4bharat.org"], // Replace 'example.com' with the hostname of your image source
  },
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "ai4bharat.iitm.ac.in",
          },
        ],
        permanent: true,
        destination: "https://ai4bharat.iitm.ac.in/:path*",
      },
    ];
  },
};

export default nextConfig;
