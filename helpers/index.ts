import { supportedLocales } from "@/configs";
import PrivateLayout from '@/components/layouts/privateLayout'

export const getLang = (language: string | undefined): string => {
    const foundedLang = supportedLocales.find((lang: { lang: string, name: string }) => lang.name === language)
    if (foundedLang) {
        return foundedLang.name
    }
    else return <string>process.env["DEFAULT_LANG "]
}
export const getTemplateWithPathname = (pathname: string) => {
    const path = pathname.split('/')[1]
}
export const getLocale=(locale:string):string=>{
    if(locale==='default'){
        return process.env.DEFAULT_LANG || 'fa'
    }
    return locale
}
