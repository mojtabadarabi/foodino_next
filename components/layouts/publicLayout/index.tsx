import PublicHeader from '@/components/headers/publicHeader'
import PublicFooter from '@/components/footers/publicFooter'
import {i18n, useTranslation} from "next-i18next";
import Head from "next/head";
import {useEffect, useState} from "react";
import Router from "next/router";
import LoadingMainPage from "@/helpers/components/loadingMainPage";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import BurgerMenu from "@/helpers/components/burgerMenu";
import LanguagePicker from "@/helpers/components/languagePicker";
import {IconButton} from "@mui/material";
import {HiOutlineLightBulb} from "react-icons/hi";
import {BsFillBellFill, BsFillCartFill, BsPersonCircle} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";
import {toggleMenu} from "@/mainSlice/slice";

export default function Index({children,title}: { children: JSX.Element,title:string }) {
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation('common')

    const dispatch = useAppDispatch()
    const onLangChangeStart = () => {
        dispatch(toggleMenu())
        setLoading(true)
    }
    const onLangChangeEnd = () => {
        setLoading(false)
    }

    useEffect(() => {
        Router.events.on('routeChangeStart', () => onLangChangeStart());
        Router.events.on('routeChangeComplete', () => onLangChangeEnd());
        Router.events.on('routeChangeError', () => onLangChangeEnd());
        return () => {
            Router.events.off('routeChangeStart', () => onLangChangeStart());
            Router.events.off('routeChangeComplete', () => onLangChangeEnd());
            Router.events.off('routeChangeError', () => onLangChangeEnd());
        };
    }, [Router.events]);
    return (
        <div>
            <BurgerMenu>
                <div className='flex flex-col items-center justify-center '>
                    <div className='flex items-center justify-start w-full' dir={i18n?.dir()}>
                        <IconButton>
                            <BsPersonCircle style={{width: '1.7em', height: '1.7em'}}/>
                        </IconButton>
                        <div className='text-start'>
                            <span className=' block  font-bold text-sm'>Name</span>
                            <span className='font-bold text-sm opacity-60'>Name@gmail.com</span>
                        </div>
                    </div>
                    <div className='flex '>
                        <LanguagePicker/>
                        <IconButton>
                            <HiOutlineLightBulb/>
                        </IconButton>
                        <IconButton>
                            <BsFillBellFill/>
                        </IconButton>
                        <IconButton>
                            <AiFillHeart/>
                        </IconButton>
                        <IconButton>
                            <BsFillCartFill/>
                        </IconButton>

                    </div>

                </div>
            </BurgerMenu>
            {
                loading && <LoadingMainPage/>
            }
            <div dir={i18n?.dir()} className='px-4 '>
                <Head >
                    <title >{!title?t('app_name'):`${t('app_name')} | ${title}`}</title>
                </Head>
                <PublicHeader/>
                <div className=''>
                    {children}
                </div>
                <PublicFooter/>
            </div>
        </div>

    )
}