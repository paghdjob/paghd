const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  async rewrites() {
    return [
      {
        source: '/v2/:path*',
        destination: 'https://www.paghd.com/v2/:path*',
      },
    ]
  },
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
})

/*
module.exports = {
  reactStrictMode: true,
  env: {
    customKey: 'paghd.com',
    isSSR: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    isSSR: true,
  },
} */
/*
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    isSSR: true,
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    isSSR: true,
  },
} */