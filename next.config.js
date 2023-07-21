/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Acess-Control-Allow-Origin', value: '*' }
        ]
      }
    ];
  }
}

module.exports = nextConfig
