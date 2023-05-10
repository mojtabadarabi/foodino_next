import { foodType } from '@/app/types/food';
import { baseApi } from '@/services/baseApi';
import { IncomingHttpHeaders } from "http";

export const attractionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFoods: builder.query<any, { page: string, paginate: string, headers: IncomingHttpHeaders }>({
            query: ({ page, paginate, headers }) => {
                return {
                    url: `/food`,
                    method: 'get',
                    headers: { paginate, ...headers }
                };
            },
        }),
        getFood: builder.query<any, { id: number, headers: IncomingHttpHeaders }>({
            query: ({ id, headers }) => {
                return {
                    url: `/food/${id}`,
                    method: 'get',
                    headers: { ...headers }
                };
            },
        }),
        createFood: builder.query<any, foodType>({
            query: (food) => {
                return {
                    url: `/food`,
                    method: 'post',
                    data: food,
                };
            },
        }),
        updateFood: builder.query<any, foodType>({
            query: (food) => {
                return {
                    url: `/food/${food?._id}`,
                    method: 'put',
                    data: food,
                };
            },
        }),
        deleteFood: builder.query<any, string>({
            query: (_id) => {
                return {
                    url: `/food/${_id}`,
                    method: 'delete',
                };
            },
        }),
    }),
})

export const { useGetFoodsQuery, useLazyDeleteFoodQuery, useLazyUpdateFoodQuery, useLazyCreateFoodQuery, util: { getRunningQueriesThunk }, } = attractionsApi
export const { getFoods, getFood } = attractionsApi.endpoints;