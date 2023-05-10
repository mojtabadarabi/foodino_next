import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { tokenReceived, loggedOut } from './slice'
import { getCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";
import { notifyFailure, notifySuccess } from '@/helpers/view';
import { i18n } from "next-i18next";
import i18next from "i18next";
import { getLang } from "@/helpers";
import { Router, useRouter } from 'next/router'


type Fn = BaseQueryFn<{
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    headers?: AxiosRequestConfig['headers']
    params?: AxiosRequestConfig['params']
},
    unknown,
    unknown>

const BASE_URL = 'http://localhost:8000/api';

// axios.interceptors.response.use((response) => {
//     console.log(response.data);
//     if(response.status === 403) {
//     }
//     return response
// });
const baseQuery: Fn = async ({ url, method, data, headers, params }) => {
    try {
        const result = await axios({ url: BASE_URL + url, method, data, headers, params })
        notifySuccess(result?.data?.message || 'successful');
        return {
            data: result.data,
            error: null
        }
    } catch (axiosError) {
        let err = axiosError as AxiosError
        notifyFailure(err.response?.data?.message || err.message);
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            },
        }
    }
}

const isError = (maybeError: any): maybeError is FetchBaseQueryError => {
    return (maybeError && maybeError.status)
}

// @ts-ignore
const baseQueryWithReauth: Fn = async (args, api, extraOptions) => {
    const refreshToken = getCookie('token')
    if (refreshToken) args.headers = { ...args.headers, 'Authorization': `Bearer ${refreshToken}` }
    let result = await baseQuery({ ...args, headers: { ...args.headers } }, api, extraOptions);
    return result
}

export const baseApi = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithReauth,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    // tagTypes: ['attractions', 'attraction', 'events', 'event', 'favorites','conversations'],
    endpoints: () => ({}),
})
