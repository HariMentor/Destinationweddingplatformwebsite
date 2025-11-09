/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable static exports for easier deployment
  // output: 'export', // Uncomment if you want static export
};

module.exports = nextConfig;