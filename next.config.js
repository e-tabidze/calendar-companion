/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

  images: {
    domains: ['static.my.ge'],
  },

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  }
}
