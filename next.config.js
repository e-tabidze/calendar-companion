// next.config.js
const { i18n } = require('./next-i18next.config')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  trailingSlash: true,
  reactStrictMode: false,

  images: {
    domains: ['static.my.ge', 'test.static.my.ge']
  },

  i18n,

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    // Add TerserPlugin for JavaScript minification
    if (!isServer) {
      config.optimization.minimizer.push(new TerserPlugin({
        terserOptions: {
          // Your Terser options if needed
        },
      }));

      // Add OptimizeCSSAssetsPlugin for CSS optimization
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    }

    return config
  }
}
