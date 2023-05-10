import CreateFood from "@/components/foods/admin/CreateFood";
import { getFood } from "@/components/foods/foodsServices";
import { getRunningQueriesThunk } from "@/components/restaurants/restaurantsServices";
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { wrapper } from "@/Store";
import { useTranslation } from "next-i18next";

export default function Home({ data }: any) {
    return (
        <main className="h-full">
            <CreateFood editedFood={data} />
        </main>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        store.dispatch(getFood.initiate({ id: context?.query._id, headers: context.req.headers }));
        const [{ data }]: any = await Promise.all(store.dispatch(getRunningQueriesThunk()));
        const translations = await serverSideTranslations(['food'], context)
        return {
            props: data ? { data: data.data, ...translations, title: 'update_food', template: 'admin' } : {
                notFound: true,
            },
        };
    }
);