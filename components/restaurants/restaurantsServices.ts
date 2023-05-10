import { restaurantType } from '@/app/types/food';
import { baseApi } from '@/services/baseApi';
import { IncomingHttpHeaders } from "http";

export const attractionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRestaurants: builder.query<any, { page: string, paginate: string, headers: IncomingHttpHeaders }>({
            query: ({ page, paginate, headers }) => {
                return {
                    url: `/restaurant`,
                    method: 'get',
                    headers: { paginate, ...headers }
                };
            },
        }),
        getRestaurant: builder.query<any, string | string[] | undefined>({
            query: (_id) => {
                return {
                    url: `/restaurant/${_id}`,
                    method: 'get',
                };
            },
        }),
        createRestaurant: builder.query<any, restaurantType>({
            query: (restaurant) => {
                return {
                    url: `/restaurant`,
                    method: 'post',
                    data: restaurant,
                };
            },
        }),
        updateRestaurant: builder.query<any, restaurantType>({
            query: (restaurant) => {
                return {
                    url: `/restaurant/${restaurant?._id}`,
                    method: 'put',
                    data: restaurant,
                };
            },
        }),
        deleteRestaurant: builder.query<any, string>({
            query: (_id) => {
                return {
                    url: `/restaurant/${_id}`,
                    method: 'delete',
                };
            },
        }),
    }),
})

export const { useGetRestaurantsQuery, useLazyDeleteRestaurantQuery, useLazyUpdateRestaurantQuery, useLazyCreateRestaurantQuery, util: { getRunningQueriesThunk }, } = attractionsApi
export const { getRestaurants, getRestaurant } = attractionsApi.endpoints;