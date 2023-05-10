import SideBar from '@/components/sideBards/adminSideBar'
import LanguagePicker from "@/helpers/components/languagePicker"
import { IconButton } from "@mui/material"
import { i18n, useTranslation } from "next-i18next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { BsFillBellFill, BsPersonCircle } from "react-icons/bs"

export default function index({ title, children }: { title: string, children: JSX.Element }) {
    const router = useRouter()
    const { t } = useTranslation('common')

    return (
        <main className="bg-gray-200 h-full" dir={i18n?.dir()}>
            <Head >
                <title >{!title ? t('app_name') : `${t('app_name')} | ${title}`}</title>
            </Head>
            <nav className="bg-slate-50 shadow-md flex items-center p-2 justify-between">
                <div className="flex items-center justify-center ">
                    <Link href='/'><h1 onClick={() => router.push('/')} className={`mx-2 pointer text-3xl font-bold text-[var(--text-color)]`}>{t('app_name')}</h1></Link>
                </div>
                <div className="flex">
                    <LanguagePicker />
                    <IconButton>
                        <BsFillBellFill style={{ width: '1.2em', height: '1.2em' }} />
                    </IconButton>
                    <IconButton>
                        <BsPersonCircle style={{ width: '1.2em', height: '1.2em' }} />
                    </IconButton>
                </div>
            </nav>
            <div className="grid grid-cols-12 gap-4 min-h-[40em]">
                <div className="bg-[var(--background)] p-2 col-span-2 "><SideBar /> </div>
                <div className="col-span-10 h-full p-4">{children}</div>
            </div>
        </main>
    )
}