/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

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
