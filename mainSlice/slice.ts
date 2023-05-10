import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {State} from "./types";
import i18next from "i18next";

const initialState: Partial<State> = {
    lang: 'fa',
    openMenu:false
}

export const MainSlice = createSlice({
    name: 'MainReducer',
    initialState,
    reducers: {
        changeLang(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        },
        toggleMenu(state) {
            state.openMenu = !state.openMenu;
        },
    },
})

export const {toggleMenu} = MainSlice.actions
export default MainSlice.reducer