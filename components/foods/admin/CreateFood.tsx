import { foodType } from "@/app/types/food";
import { appRoutes } from "@/configs/routes";
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyCreateFoodQuery, useLazyUpdateFoodQuery } from "../foodsServices";

export default function CreateFood({ editedFood = null }: { editedFood?: foodType | null }) {
    const { t } = useTranslation('food')
    const { t: tCommon } = useTranslation('common')
    const [createFoodApi, { isFetching }] = useLazyCreateFoodQuery()
    const [updateFoodApi, { isFetching: isFetchingUpdate }] = useLazyUpdateFoodQuery()

    const [food, setFood] = useState<foodType>({
        name: '',
        description: '',
        score: 0,
        price: 0
    })
    useEffect(() => {
        if (editedFood) {
            setFood({
                _id: editedFood._id,
                name: editedFood.name,
                description: editedFood.description,
                score: editedFood.score,
                price: editedFood.price,
            })
        }
    }, [])
    const router = useRouter()
    const changeVAlue = (e: any, input: string) => {
        setFood((prev: foodType) => {
            return {
                ...prev,
                [input]: e.target.value
            }
        })
    }
    const onSubmitForm = (e: any) => {
        e.preventDefault()
        if (editedFood) {
            updateFoodApi(food).unwrap().then(() => afterFetch())
        }
        else {
            createFoodApi(food).unwrap().then(() => afterFetch())
        }
    }
    const afterFetch = async () => {
        await router.push(appRoutes.dashboard.href)
        setFood({
            name: '',
            description: '',
            score: 0,
            price: '',
        })
    }
    return (
        <div className="bg-white shadow-md p-2 rounded ">
            <h2 className="font-bold text-xl my-4 mx-2">{editedFood ? t('update_food') : t('create_food')}</h2>
            <form onSubmit={onSubmitForm} className="flex flex-col mx-4 gap-7 mt-10">
                <TextField
                    placeholder={t('food_name')}
                    type='text'
                    value={food.name}
                    onChange={(e: any) => changeVAlue(e, 'name')}
                />
                <TextField
                    placeholder={tCommon('description')}
                    type='text'
                    value={food.description}
                    onChange={(e: any) => changeVAlue(e, 'description')}
                />
                <TextField
                    placeholder={tCommon('score')}
                    type='number'
                    value={food.score}
                    onChange={(e: any) => changeVAlue(e, 'score')}
                />
                <TextField
                    placeholder={t('price')}
                    type='text'
                    value={food.price}
                    onChange={(e: any) => changeVAlue(e, 'price')}
                />
                <LoadingButton type='submit' loading={isFetching || isFetchingUpdate} disabled={isFetching || isFetchingUpdate} sx={{ background: 'var(--background) !important', color: '#fff' }}>
                    {editedFood ? tCommon('update') : tCommon('create')}
                </LoadingButton>
            </form>
        </div>
    )
}