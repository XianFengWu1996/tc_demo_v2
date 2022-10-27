/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.pexels.com',
      'firebasestorage.googleapis.com',
      'img.icons8.com',
      'unsplash.com',
      'media.istockphoto.com',
    ],
  },
};

module.exports = nextConfig;
