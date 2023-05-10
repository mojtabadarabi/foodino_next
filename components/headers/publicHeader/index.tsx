import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useRouter} from "next/router";
import Link from "next/link";
import {BsFillCartFill} from 'react-icons/bs'
import {HiOutlineLightBulb} from 'react-icons/hi'
import SearchMain from '@/helpers/components/searchMain'
import {IconButton} from "@mui/material";
import LanguagePicker from "@/helpers/components/languagePicker";
import {BsFillBellFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import {BsPersonCircle} from 'react-icons/bs'

import {GiHamburgerMenu} from 'react-icons/gi'
import {toggleMenu} from "@/mainSlice/slice";
import {i18n, useTranslation} from "next-i18next";

export default function Index() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {t} = useTranslation('common')

    return (
        <div className='block items-center justify-between p-3 md:block lg:flex '>
            <div className='grid md:flex grid-cols-2 items-center justify-start md:gap-10 gap-2 lg:w-1/2 md:w-full w-full'>
                <h1 onClick={()=>router.push('/')} className={`pointer text-3xl font-bold text-[var(--text-color)]`}>{t('app_name')}</h1>
                <SearchMain/>
                <IconButton sx={{gridColumn:'2',gridRow:'1',justifyContent:'flex-end'}} onClick={()=>dispatch(toggleMenu())} className='sm:hidden flex'><GiHamburgerMenu/></IconButton>
            </div>
            <div className='flex  md:gap-2 gap-1 items-center justify-end sm:flex hidden'>
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
                <IconButton onClick={()=>router.push('login')}>
                    <BsPersonCircle/>
                </IconButton>
            </div>
        </div>
    )
}