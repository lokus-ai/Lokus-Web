/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lokusmd.com',
      },
      {
        protocol: 'https',
        hostname: '*.lokusmd.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // SEO: Security headers for better Google ranking
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
  // SEO: Redirects for canonical URLs
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.lokusmd.com' }],
        destination: 'https://lokusmd.com/:path*',
        permanent: true,
      },
      // SEO redirects for common searches
      {
        source: '/obsidian-alternative',
        destination: '/compare/obsidian',
        permanent: true,
      },
      {
        source: '/notion-alternative',
        destination: '/compare/notion',
        permanent: true,
      },
      {
        source: '/pkm',
        destination: '/features',
        permanent: true,
      },
      {
        source: '/download',
        destination: 'https://github.com/lokus-ai/lokus/releases',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
