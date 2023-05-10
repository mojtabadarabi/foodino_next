import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { AppContext } from "next/app";
import CreateRestaurant from "@/components/restaurants/admin/CreateRestaurant";

export default function Home({ data }: any) {
    const { t } = useTranslation('restaurant')

    return (
        <main className="h-full">
            <CreateRestaurant/>
        </main>
    )
}

export const getServerSideProps = async (context: AppContext) => {
    const translations = await serverSideTranslations(['restaurant'], context)
    return {
        props: { ...translations, title: 'create_restaurant', template: 'admin' }
    };
}