/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration de base sans appDir
  // experimental: {
  //   appDir: true,
  // },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        ],
      },
    ];
  },

  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async rewrites() {
    return [
      { source: '/api/:path*', destination: '/api/:path*' },
    ];
  },
};

module.exports = nextConfig;
