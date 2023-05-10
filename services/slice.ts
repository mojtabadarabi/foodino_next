import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {State} from "./types";
import {setCookie, removeCookies, getCookie} from "cookies-next";
import Router, { useRouter } from 'next/router';

const initialState: Partial<State> = {}
const Redirect = () => {
    const router = useRouter()
    const redirect = () => {
        router.push('login')
    }
    return redirect
}
export const AuthSlice = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        tokenReceived(state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) {
            const {refreshToken, accessToken} = action.payload;
            setCookie('Token', accessToken);
            setCookie('refreshToken', refreshToken);
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },

        refreshTokenAdded(state, {payload}: PayloadAction<string>) {
            setCookie('token', payload);
            state.refreshToken = payload;
        },

        loggedOut() {
            // removeCookies('token');
            // Router.push(`login`);
            // remove the old token and refreshToken from state.
            return {};
        },
    },
})

export const {tokenReceived, refreshTokenAdded, loggedOut} = AuthSlice.actions
export default AuthSlice.reducer