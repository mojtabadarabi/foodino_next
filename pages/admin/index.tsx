import CustomizedMuiButton from "@/components/buttons/muiButton";
import FoodsTable from "@/components/foods/admin/FoodsTable";
import { getFoods } from "@/components/foods/foodsServices";
import { setFoods } from "@/components/foods/foodsSlice";
import RestaurantTable from "@/components/restaurants/admin/RestaurantsTable";
import { getRestaurants, getRunningQueriesThunk } from "@/components/restaurants/restaurantsServices";
import { setRestaurants } from "@/components/restaurants/restaurantsSlice";
import { appRoutes } from "@/configs/routes";
import Result from "@/helpers/components/result";
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { afterSsrApi } from "@/helpers/servicesHelpers";
import { useAppSelector } from "@/hooks/redux";
import { wrapper } from "@/Store";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { setCookie, removeCookies, getCookie, deleteCookie } from "cookies-next";

export default function Home() {
    const { t } = useTranslation('restaurant')
    const { t: foodTranslator } = useTranslation('food')
    const { data: restaurant } = useAppSelector(state => state.restaurants)
    const { data: foods } = useAppSelector(state => state.foods)

    return (
        <main className="h-full">
            <Result empty={!restaurant || restaurant?.length === 0}>
                <div className="bg-white shadow-md px-2 mb-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl my-6">{t('restaurant_list')}</h3>
                        <Link href={appRoutes.createRestaurant.href}>
                            <CustomizedMuiButton>
                                {t('create_restaurant')}
                            </CustomizedMuiButton>
                        </Link>
                    </div>
                    <div className="px-4 ">
                        <RestaurantTable restaurants={restaurant} />
                    </div>
                </div>
            </Result>
            <Result empty={!foods || foods?.length === 0}>
                <div className="bg-white shadow-md px-2">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl my-6">{foodTranslator('food_list')}</h3>
                        <Link href={appRoutes.createFood.href}>
                            <CustomizedMuiButton>
                                {foodTranslator('create_food')}
                            </CustomizedMuiButton>
                        </Link>
                    </div>
                    <div className="px-4 ">
                        <FoodsTable foods={foods} />
                    </div>
                </div>
            </Result>
        </main>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        store.dispatch(getRestaurants.initiate({ page: '1', paginate: '15', headers: context.req.headers }));
        store.dispatch(getFoods.initiate({ page: '1', paginate: '15', headers: context.req.headers }));
        const data: any = await Promise.all(store.dispatch(getRunningQueriesThunk()));
        const [[{ data: restaurant }, { data: foods }], isUnAuthError] = afterSsrApi(data)
        if (isUnAuthError) {
            try {
                deleteCookie('token', { req: context.req, res: context.res });
            }
            catch (e) { }
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }
        await store.dispatch(setRestaurants(restaurant.data))
        await store.dispatch(setFoods(foods.data))
        const translations = await serverSideTranslations(['restaurant', 'food'], context)
        return {
            props: { ...translations, title: 'dashboard', template: 'admin' },
        };
    }
);