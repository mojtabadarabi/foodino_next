import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {productType} from "@/components/products/productsType";
import {HYDRATE} from "next-redux-wrapper";

export interface ProductsState {
    products: productType[]|null
}

const initialState: ProductsState = {
    products: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, {payload}: PayloadAction<productType[]>) => {
            state.products = payload
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return state = action.payload
        },
    },
})

export const {setProducts} = productsSlice.actions

export default productsSlice.reducer