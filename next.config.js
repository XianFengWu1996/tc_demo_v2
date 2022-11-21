/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
