import restaurantsReducer from '@/components/restaurants/restaurantsSlice'
import foodsReducer from '@/components/foods/foodsSlice'
import {createWrapper} from 'next-redux-wrapper';
import mainReducer from '@/mainSlice/slice'
import authReducer from '@/services/slice'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { baseApi } from '@/services/baseApi';

export const makeStore = () => configureStore({
    reducer: {
        main:mainReducer,
        auth:authReducer,
        restaurants:restaurantsReducer,
        foods:foodsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, AppState, unknown, Action >;
// export const appStore = makeStore
export const wrapper = createWrapper<AppStore>(makeStore,{debug:true});
