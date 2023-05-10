import config from "./next-i18next.config"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


// @ts-ignore
export default async function serverSideTranslationsDeclare(ns: string[], ctx): Promise<ReturnType<typeof serverSideTranslations>> {
    // @ts-ignore
    const nameSpaces = [...new Set([...ns, "main_page", "logins","common","siteTitles"])]
    try {
        // @ts-ignore
        return await serverSideTranslations(ctx.lang === "default" ? process.env.NEXT_PUBLIC_DefaultLang ?? "en" : ctx.locale ?? "en", nameSpaces, {
            ...config,
            ns: nameSpaces
        }, config.i18n.locales)
    } catch (e) {
        console.log("server side translations failed", e)
        // @ts-ignore
        return {initialLocale: config.i18n.defaultLocale, initialI18nStore: {}, ns: nameSpaces}
    }
}