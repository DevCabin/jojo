/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_HUME_API_KEY: process.env.NEXT_PUBLIC_HUME_API_KEY,
  },
  typescript: {
    ignoreBuildErrors: true // For faster Vercel builds
  }
}

module.exports = nextConfig 