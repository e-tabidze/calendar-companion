// next.config.js
const { i18n } = require('./next-i18next.config')
module.exports = {
  trailingSlash: true,

  reactStrictMode: true,

  images: {
    domains: []
  },

  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      }
    ]
  },

  i18n,

  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
