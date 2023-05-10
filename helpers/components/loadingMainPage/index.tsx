import {CircularProgress} from "@mui/material";

export default function LoadingMainPage() {
    return (
        <div className='absolute left-0 top-0 z-10 flex items-center justify-center w-full h-full '>
            <span className='text-opacity-100 z-20'><CircularProgress color="inherit" /></span>
            <div
                className='absolute left-0 top-0 bg-[#64748b] opacity-30 z-10 flex items-center justify-center w-full h-full '/>


        </div>
    )
}