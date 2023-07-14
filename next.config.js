/** @type {import('next').NextConfig} */

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  }
}
