import userLogin from '@/assets/vectors/user_login.png';
import CustomizedMuiButton from "@/components/buttons/muiButton";
import { appRoutes } from '@/configs/routes';
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { useAppDispatch } from '@/hooks/redux';
import { useLazyLoginQuery } from "@/services/authServices";
import { refreshTokenAdded } from '@/services/slice';
import { setCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { AppContext } from "next/app";
import Image from "next/image";
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
    const { t } = useTranslation('common')
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [loginApi, { isFetching }] = useLazyLoginQuery()

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLogin = (e: FormEvent) => {
        e.preventDefault()
        loginApi({ userName, password }).unwrap()
            .then((data) => {
                dispatch(refreshTokenAdded(data.data.token.token))
                router.push(appRoutes.dashboard.href)
            })
    }

    return (
        <div className='flex justify-center items-center my-7'>
            <form onSubmit={onLogin} className='w-[40em] bg-white shadow-md rounded p-5 flex gap-2 flex-col '>
                <h1 className='text-xl font-bold m-auto mb-5'>{t('login_signup')}</h1>
                <Image className='m-auto drop-shadow-2xl' width={250} src={userLogin} alt={t('login')} />
                <p className='font-medium opacity-80 mb-4 mx-auto'>
                    {t('login_description')}
                </p>
                <input
                    type='text'
                    value={userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    className='rounded p-2 bg-blue-50 mb-2 shadow-xl'
                    placeholder={String(t('user_name'))}
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className='rounded p-2 bg-blue-50 mb-2 shadow-xl'
                    placeholder={String(t('password'))}
                />
                <CustomizedMuiButton type='submit' loading={isFetching}>
                    {t('login')}
                </CustomizedMuiButton>
            </form>
        </div>
    )
}
export const getServerSideProps = async (context: AppContext) => {
    const translations = await serverSideTranslations(['common'], context)
    return {
        props: {
            ...translations,
            title: 'login'
        }
    }
}