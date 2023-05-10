/*
  XXX This file is loaded by "next.config.js" and cannot contain ES6+ code (import, etc.)
   Note that any change should/must be followed by a server restart, because it's used in "next.config.js"
 */

/**
 * Select the "supportedLocales.name" you want to use by default in your app.
 * This value will be used as a fallback value, when the user locale cannot be resolved.
 *
 * @example en
 * @example en-US
 *
 * @type {string}
 */
const defaultLocale = process.env.DEFAULT_LANG;
const supportedLocales = [{
    name: 'fa',
    lang: 'fa',
},
    {
        name: 'en',
        lang: 'en',
    },
    {
        name: 'ar',
        lang: 'ar',
    },
    {
        name: 'tr',
        lang: 'tr',
    },
];
/**
 * List of all supported locales by your app.
 *
 * If a user tries to load your site using non-supported locales, the default locale is used instead.
 *
 * @type {({name: string, lang: string}|{name: string, lang: string}|{name: string, lang: string})[]}
 */


/**
 * Returns the list of all supported languages.
 * Basically extracts the "lang" parameter from the supported locales array.
 *
 * @type {string[]}
 */

const supportedLanguages = supportedLocales.map((item) => {
    return item.lang;
});

module.exports = {
    // https://www.i18next.com/overview/configuration-options#logging
    debug: false,
    serializeConfig: false,
    i18n: {
        locales: supportedLanguages,
        defaultLocale,
    },
    ns: ["common", "ideas", "forums", "main_page", "logins", "profile"],
    reloadOnPrerender: process.env.NODE_ENV === 'development',
    nonExplicitSupportedLngs: true,
    localePath: (locale, namespace) => {
        const customPaths = {
            forums: 'Modules/NtnContents/locales/' + locale + '/forums.json',
            logins: 'Modules/NtnOAuth/locales/' + locale + '/logins.json',
            profile: 'Modules/NtnGamification/locales/' + locale + '/profile.json',
            conversations: 'Modules/NtnConversations/locales/' + locale + '/conversations.json',
            favorites: 'Modules/NtnActions/locales/' + locale + '/favorites.json',
            suppliers_list: 'Modules/NtnSuppliers/locales/' + locale + '/suppliers_list.json',
            supplier_details: 'Modules/NtnSuppliers/locales/' + locale + '/supplier_details.json',
            supplier_manager: 'Modules/NtnSuppliers/locales/' + locale + '/supplier_manager.json',
            shared: 'Modules/NtnHelpers/locales/' + locale + '/shared.json',
        };
        const defaultPath = "public/locales/" + locale + "/" + namespace + '.json';

        return customPaths[namespace] ?? defaultPath;
    }
}
