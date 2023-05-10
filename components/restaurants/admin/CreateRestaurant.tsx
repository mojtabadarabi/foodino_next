import { restaurantType } from "@/app/types/food";
import { appRoutes } from "@/configs/routes";
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyCreateRestaurantQuery, useLazyUpdateRestaurantQuery } from "../restaurantsServices";

export default function CreateRestaurant({ editedRestaurant = null }: { editedRestaurant?: restaurantType | null }) {
    const { t } = useTranslation('restaurant')
    const { t:tCommon } = useTranslation('common')
    const [createRestaurantApi, { isFetching }] = useLazyCreateRestaurantQuery()
    const [updateRestaurantApi, { isFetching: isFetchingUpdate }] = useLazyUpdateRestaurantQuery()

    const [restaurant, setRestaurant] = useState<restaurantType>({
        name: '',
        description: '',
        score: 0,
        address: '',
        adminUserName: '',
        adminPassword: ''
    })
    useEffect(() => {
        if (editedRestaurant) {
            setRestaurant({
                _id:editedRestaurant._id,
                name: editedRestaurant.name,
                description: editedRestaurant.description,
                score: editedRestaurant.score,
                address: editedRestaurant.address,
                adminUserName: editedRestaurant.adminUserName,
            })
        }
    }, [])
    const router = useRouter()
    const changeVAlue = (e: any, input: string) => {
        setRestaurant((prev: restaurantType) => {
            return {
                ...prev,
                [input]: e.target.value
            }
        })
    }
    const onSubmitForm = (e: any) => {
        e.preventDefault()
        if (editedRestaurant) {
            updateRestaurantApi(restaurant).unwrap().then(() => afterFetch())
        }
        else {
            createRestaurantApi(restaurant).unwrap().then(() => afterFetch())
        }
    }
    const afterFetch = () => {
        setRestaurant({
            name: '',
            description: '',
            score: 0,
            address: '',
            adminUserName: '',
            adminPassword: ''
        })
        router.push(appRoutes.dashboard.href)
    }
    return (
        <div className="bg-white shadow-md p-2 rounded ">
            <h2 className="font-bold text-xl my-4 mx-2">{editedRestaurant?t('update_restaurant'):t('create_restaurant')}</h2>
            <form onSubmit={onSubmitForm} className="flex flex-col mx-4 gap-7 mt-10">
                <TextField
                    placeholder={t('restaurant_name')}
                    type='text'
                    value={restaurant.name}
                    onChange={(e: any) => changeVAlue(e, 'name')}
                />
                <TextField
                    placeholder={tCommon('description')}
                    type='text'
                    value={restaurant.description}
                    onChange={(e: any) => changeVAlue(e, 'description')}
                />
                <TextField
                    placeholder={tCommon('score')}
                    type='number'
                    value={restaurant.score}
                    onChange={(e: any) => changeVAlue(e, 'score')}
                />
                <TextField
                    placeholder={t('address')}
                    type='text'
                    value={restaurant.address}
                    onChange={(e: any) => changeVAlue(e, 'address')}
                />
                <TextField
                    placeholder={t('admin_user_name')}
                    type='text'
                    value={restaurant.adminUserName}
                    onChange={(e: any) => changeVAlue(e, 'adminUserName')}
                />
                <TextField
                    placeholder={t('admin_password')}
                    type='password'
                    value={restaurant.adminPassword}
                    onChange={(e: any) => changeVAlue(e, 'adminPassword')}
                />
                <LoadingButton type='submit' loading={isFetching || isFetchingUpdate} disabled={isFetching || isFetchingUpdate} sx={{ background: 'var(--background) !important', color: '#fff' }}>
                    {editedRestaurant?tCommon('update'):tCommon('create')}
                </LoadingButton>
            </form>
        </div>
    )
}