const {i18n:{locales}} = require('./helpers/next-i18next.config');

module.exports = {
  locales: [...locales,"default"],
  defaultLocale: "default",
  localeDetection: false,
}