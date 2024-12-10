/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['103.129.115.165'], // Allow the API's image domain
  },
};

module.exports = nextConfig;
