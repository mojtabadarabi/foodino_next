import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getLocale } from './helpers';

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const pathname = url.pathname
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname) ||
        url.pathname.startsWith('/_next') ||
        url.pathname.endsWith('.txt') || // example = /robots.txt
        url.pathname.endsWith('.ico') ||   //example = /favicon.ico
        url.pathname.startsWith('/files')  // public files
    ) {
        return NextResponse.next()
    }
    if (req.nextUrl.locale === 'default') {
        const locale = process.env.DEFAULT_LANG || 'fa'
        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }
    const refreshTokenCookie = req.cookies.get("token")
    if (pathname.startsWith('/admin')) {
        if (!refreshTokenCookie) {
            const response = NextResponse.redirect(new URL(`/login`, req.url))
            response.headers.set('x-middleware-cache', 'no-cache')
            return response
        }
    }

    if (pathname === '/login/') {
        if (refreshTokenCookie) {
            const response = NextResponse.redirect(new URL(`/${getLocale(req?.nextUrl?.locale) || req.cookies.get("lang") || process.env.DEFAULT_LANG || 'fa'}/${req.nextUrl.search}`, req.url))
            response.headers.set('x-middleware-cache', 'no-cache')
            return response
        }
    }
    const Locale = url.locale === 'default' ? process.env.DEFAULT_LANG || 'fa' : url.locale
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('lang', Locale)

    if (refreshTokenCookie) requestHeaders.set('Authorization', `Bearer ${refreshTokenCookie.value}`)
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
    // response.cookies.set({
    // 	name: 'myCookieName',
    // 	value: 'some-value',
    // 	httpOnly: true,
    // })
    response.cookies.set('lang', Locale)
    return response
}