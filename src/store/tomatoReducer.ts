import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generateRandomIndex} from "../utils/generateRandomIndex";

type tomatoState = {
    value: number
}

const initialState: tomatoState = {
    value: 1
}

export const tomatoSlice = createSlice({
    name: 'tomato',
    initialState,
    reducers: {
        addTomato: state => {
          state.value += 1
        },
        setTomato: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const {setTomato, addTomato} = tomatoSlice.actions

export default tomatoSlice.reducer