import Result from "@/helpers/components/result";
import ProductCart from "@/components/products/productCart";

export default function Index({products}: any) {
    console.log(products)
    return (
        <div className='text-3xl font-bold underline bg-red'>
            adkflakdflkdf
            {/*<Result loading={false} error={false} refetch={() => {*/}
            {/*}}>*/}
            {/*    {*/}
            {/*        products?.map((item: any,index:number) => <ProductCart key={index} title={item.title} />)*/}
            {/*    }*/}
            {/*</Result>*/}
        </div>
    )
}