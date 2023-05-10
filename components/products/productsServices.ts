import {baseApi} from '@/services/baseApi';
import {IncomingHttpHeaders} from "http";

export const attractionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<any, { page:string,paginate:string,headers:IncomingHttpHeaders }>({
            query: ({page,paginate,headers}) => {
                return {
                    url: `/restaurant`,
                    method: 'get',
                    headers:{paginate,...headers}
                };
            },
        }),
    }),
})

export const { useGetProductsQuery , util: { getRunningQueriesThunk },} = attractionsApi
export const { getProducts } = attractionsApi.endpoints;