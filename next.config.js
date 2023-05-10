const i18n  = require('./next-i18nFront.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    DEFAULT_LANG: process.env.DEFAULT_LANG,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  i18n,
  trailingSlash: true,
}
