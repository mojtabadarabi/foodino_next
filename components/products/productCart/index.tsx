import phone from '@/assets/products/phone.png'
import Rating from '@mui/material/Rating';
import CustomizedMuiButton from "@/components/buttons/muiButton";

interface Props {
    title: string,
    description: string,
    price: string | number,
    discount?: null | string | number,
}

export default function ProductCart({
                                        title, description,
                                        price,
                                        discount = null
                                    }: Props) {
    return (
        <div
            className="bg-white w-full flex h-[12em] rounded-md overflow-hidden shadow-md hover:shadow-xl transition duration-100 ease-in-out">
            <div
                className="bg-[#60a5fa] w-1/3 h-full flex items-center"
            >
                <img src={phone.src}/>
            </div>
            <div
                className=" p-3 w-2/3 relative">
                <div className="">
                    <div className="text-gray-900 font-bold text-xl">{title.substring(0, 15)}</div>
                    <p className="text-gray-700 text-base">{description.substring(0, 50)}</p>
                </div>
                <div className="absolute w-full bottom-0 left-0 px-3 py-2">
                    <Rating disabled={true} value={4} size='small'/>
                    <div className="flex items-center justify-between ">
                        <div className='flex items-center'>
                            {discount && <span
                                className='text-xl mx-2'>{Number(price) - (Number(price) * Number(discount) / 100)}$</span>}
                            <span className={`text-sm ${discount ? 'opacity-30' : 'text-xl'}`}>{price}$</span>
                        </div>
                        <CustomizedMuiButton>
                            Add to card
                        </CustomizedMuiButton>
                    </div>
                </div>
            </div>
        </div>
    )
}