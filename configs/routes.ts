import { RouteType } from "@/app/types/food";

export const appRoutes :Record<string,RouteType>= {
    createRestaurant: {
        href: '/admin/restaurant',
        needLogin: true
    },
    createFood: {
        href: '/admin/food',
        needLogin: true
    },
    dashboard: {
        href: '/admin',
        needLogin: true
    },
}