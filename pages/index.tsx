import {wrapper} from "@/Store";
import {getProducts, getRunningQueriesThunk} from "@/components/products/productsServices";
import {setProducts} from "@/components/products/productsSlice";
import ProductCard from '@/components/products/productCart'
import Result from "@/helpers/components/result";
import {productType} from "@/app/types/products";
import {i18n} from "next-i18next";
import serverSideTranslations from "@/helpers/i18nextHelpers";

export default function Home({data}: any) {
    console.log(data)
    return (
        <main>
            {/* <Result empty={!data || data?.data?.length === 0}>
                <div className=' grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 justify-center p-2 gap-4'>
                    {
                        data.map(({_id, name, description, price}: productType) => (
                            <ProductCard key={_id} title={name} description={description}
                                         price={price}
                            />
                        ))
                    }
                </div>
            </Result> */}
        </main>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        store.dispatch(getProducts.initiate({page: '1', paginate: '15', headers: context.req.headers}));
        const [{data}]: any = await Promise.all(store.dispatch(getRunningQueriesThunk()));
        await store.dispatch(setProducts(data.data))
        const translations = await serverSideTranslations(['common'], context)
        return {
            props: data ? {data: data.data, ...translations, title: 'main_page'} : {},
        };
    }
);