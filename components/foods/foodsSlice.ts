import { foodType } from "@/app/types/food";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface foodsState {
    data: foodType[] | null | undefined,
    paginate?: number
}

const initialState: foodsState = {
    data: []
}

export const foodsSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        setFoods: (state, { payload }: PayloadAction<foodsState>) => {
            return state = payload
        },
        deleteFood(state, { payload }: PayloadAction<string>) {
            return { ...state, data: state.data?.filter(todo => todo._id !== payload) }
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = { ...state, ...action.payload.foods }
        },
    },
})

export const { setFoods, deleteFood } = foodsSlice.actions

export default foodsSlice.reducer