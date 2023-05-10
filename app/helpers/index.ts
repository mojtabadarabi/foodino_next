import clientPromise from "@/app/helpers/database";
import {DEFAULT_PAGE, DEFAULT_PAGINATION} from "@/constants/Links";

export const connectToDb=async()=>{
    const client = await clientPromise;
    const db = client.db("market");
    return db
}
export const getAllModelPagination=(Model: any, page: string|string[]=DEFAULT_PAGE, paginate: string|string[]=DEFAULT_PAGINATION,optiolns:object={}) =>{
    return Model.find({...optiolns})
        .skip((Number(page) - 1) * Number(paginate))
        .limit(Number(paginate))
        .toArray()
}
export const findOne=(Model: any,field:string,value:string) =>{
    console.log({field:value})
    return Model.findOne({[field]:'mojtaba@gmail.com'})
}