const nextConfig = {
  output: 'export', 
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "admin.models.ai4bharat.org"], // Replace 'example.com' with the hostname of your image source
  },
};

export default nextConfig;
