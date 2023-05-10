import CreateRestaurant from "@/components/restaurants/admin/CreateRestaurant";
import { getRestaurant, getRunningQueriesThunk } from "@/components/restaurants/restaurantsServices";
import { setRestaurants } from "@/components/restaurants/restaurantsSlice";
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { wrapper } from "@/Store";
import { useTranslation } from "next-i18next";

export default function Home({ data }: any) {
    const { t } = useTranslation('restaurant')
    return (
        <main className="h-full">
            <CreateRestaurant editedRestaurant={data}/>
        </main>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        store.dispatch(getRestaurant.initiate(context?.query._id));
        const [{ data }]: any = await Promise.all(store.dispatch(getRunningQueriesThunk()));
        const translations = await serverSideTranslations(['restaurant'],context)
        return {
            props: data ? { data: data.data, ...translations, title: 'update_restaurant', template: 'admin' } :{
                notFound: true,
            },
        };
    }
);