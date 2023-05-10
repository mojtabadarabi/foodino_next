import phone from '@/assets/products/phone.png'
import Rating from '@mui/material/Rating';
import CustomizedMuiButton from "@/components/buttons/muiButton";
import Image from 'next/image';

interface Props {
    title: string,
    description: string,
    price: string | number,
    discount?: null | string | number,
}

export default function RestaurantCart({
    title, description,
    price,
    discount = null
}: Props) {
    return (
        <div
            className="bg-white w-full flex flex-col  h-[25em] rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-100 ease-in-out">
            <div
                className="bg-[#60a5fa] flex items-center justify-center  w-full  flex items-center"
            >
                <Image height={300} src={phone} alt='phone' />
            </div>
            <div
                className=" p-3 felx flex-col  gap-2">
                <div className="">
                    <div className="text-gray-900 font-bold text-xl">{title.substring(0, 15)}</div>
                    <p className="text-gray-700 text-base">{description.substring(0, 50)}</p>
                </div>
                <div className="absolute w-full bottom-0 left-0 px-3 py-2">
                    <Rating disabled={true} value={4} size='small' />
                    <div className="flex items-center justify-between ">
                        <div className='flex items-center'>
                            {discount && <span
                                className='text-xl mx-2'>{Number(price) - (Number(price) * Number(discount) / 100)}$</span>}
                            <span className={`text-sm ${discount ? 'opacity-30' : 'text-xl'}`}>{price}$</span>
                        </div>
                    </div>
                </div>
                <CustomizedMuiButton width='100%'>
                    Add to card
                </CustomizedMuiButton>
            </div>
        </div>
    )
}