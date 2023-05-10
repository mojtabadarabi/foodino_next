export interface restaurantType {
    _id?: string,
    name: string,
    description: string,
    images?: ImageType[],
    tags?: TagType[]
    price?: string,
    count?: string,
    adminUserName?: string,
    adminPassword?: string,
    address?: string,
    score?: Number
}
export interface foodType {
    _id?: string,
    name: string,
    description: string,
    images?: ImageType[],
    price?: string | number,
    score?: Number
}
export interface SideBarItems {
    title: string,
    href: string,
    isActive: boolean
}
export interface RouteType {
    href: string;
    needLogin: boolean
}
export interface LoginType {
    userName: string
    password: string
}
export interface ImageType {

}

export interface TagType {

}
export interface DataWithPagination<T> {
    data: T[],
    total: number,
}
