import empty from '@/assets/empty.jpg'
import Image from "next/image";

export default function Index(){
    return (
        <div className='flex items-center justify-center bg-white'>
            <div className='w-[5em] h-[5em] relative' style={{width:'25em',height:'25em'}}>
            <Image className='w-full h-full absolute'  src={empty} alt={'empty'}/>

            </div>
        </div>
    )
}