import { LoginType } from '@/app/types/food';
import { baseApi } from '@/services/baseApi';
import { IncomingHttpHeaders } from "http";

export const attractionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<any, LoginType>({
            query: (props) => {
                return {
                    url: `/restaurant/login`,
                    method: 'post',
                    data: props,
                };
            },
        }),
    }),
})

export const { useLazyLoginQuery } = attractionsApi