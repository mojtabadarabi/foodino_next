import CreateFood from "@/components/foods/admin/CreateFood";
import serverSideTranslations from "@/helpers/i18nextHelpers";
import { useTranslation } from "next-i18next";
import { AppContext } from "next/app";

export default function Home() {

    return (
        <main className="h-full">
            <CreateFood />
        </main>
    )
}

export const getServerSideProps = async (context: AppContext) => {
    const translations = await serverSideTranslations(['food'], context)
    return {
        props: { ...translations, title: 'create_food', template: 'admin' }
    };
}