export interface productType {
    _id: string,
    name: string,
    description: string,
    images: ImageType[],
    tags: TagType[]
    price: string,
    count: string
}

export interface ImageType {

}

export interface TagType {

}
export interface DataWithPagination<T>{
    data:T[],
    total:number,
}
