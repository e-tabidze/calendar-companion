/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

  images: {
    domains: ['static.my.ge', 'test.static.my.ge'],
  },

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })


    return config
  }
}
