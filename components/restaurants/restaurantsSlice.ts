import { restaurantType } from "@/app/types/food";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface restaurantsState {
    data: restaurantType[] | null | undefined,
    paginate?: number
}

const initialState: restaurantsState = {
    data: []
}

export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setRestaurants: (state, { payload }: PayloadAction<restaurantsState>) => {
            return state = payload
        },
        deleteRestaurants(state, { payload }: PayloadAction<string>) {
            return { ...state, data: state.data?.filter(todo => todo._id !== payload) }
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = { ...state, ...action.payload.restaurants }
        },
    },
})

export const { setRestaurants, deleteRestaurants } = restaurantsSlice.actions

export default restaurantsSlice.reducer