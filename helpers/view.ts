import {toast} from 'react-toastify'

export const notifyFailure=(result:any)=>{
    toast.error(result)
}
export const notifySuccess=(result:any)=>{
    toast.success(result)
}