import GetTemplate from '@/components/layouts/GetTEmplate'
import i18nConfig from '@/helpers/next-i18next.config'
import ServerSideTranslations from "@/helpers/serverSideTranslations"
import { wrapper } from '@/Store'
import '@/styles/globals.css'
import { getCookies } from "cookies-next"
import { appWithTranslation, useTranslation } from 'next-i18next'
import type { AppContext, AppProps } from 'next/app'
import NApp from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  const { t } = useTranslation('siteTitles')

  return (
    <Provider store={store} >
      <GetTemplate template={pageProps?.template} title={t(pageProps.title)}>
        <Component {...pageProps} />
      </GetTemplate>
      <ToastContainer
        position='bottom-left'
      />
    </Provider>
  )
}
App.getInitialProps = async (appContext: AppContext) => {
  if (appContext.ctx.err) return { err: appContext.ctx.err }
  const coockies = getCookies(appContext.ctx)
  try {
    const appProps = await NApp.getInitialProps(appContext);

    if (!appProps.pageProps?.initialI18nStore) {
      // @ts-ignore
      const translations = await ServerSideTranslations([], appContext.ctx)
      appProps.pageProps = { ...appProps.pageProps, ...translations }
    }

    return { ...appProps, pageProps: { ...appProps.pageProps, lang: coockies?.lang, refreshToken: coockies.token } }
  } catch (e) {
    console.log(";> sync_app error", e)
  }

  return { pageProps: { lang: coockies?.lang, refreshToken: coockies.token } }
}

export default appWithTranslation(App, i18nConfig)