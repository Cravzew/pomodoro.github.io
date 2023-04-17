import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";

export interface itemsType {
    date: string,
    work_sec: number,
    pause_sec: number,
    isDone: number,
    stop_count: number,
    tomatoesToday: number
}

type itemsState = {
    stats: itemsType[]
}

const currentDate = {
    date: moment().format('YYYY-MM-DD'),
    work_sec: 0,
    pause_sec: 0,
    isDone: 0,
    stop_count: 0,
    tomatoesToday: 0,
}

const initialState: itemsState = {
    stats: [currentDate]
}

export const dateSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        pushNewAdd(state) {
            const findStatItem = state.stats.find(item => item.date === moment().format('YYYY-MM-DD'));

            if (!findStatItem) {
                state.stats.push(currentDate);
            }
        },
        incWorkSec(state) {
            state.stats = state.stats.map((item) => item.date === moment().format('YYYY-MM-DD') ? {
                ...item,
                work_sec: item.work_sec += 1
            } : item)
        },
        incPauseSec(state) {
            state.stats = state.stats.map((item) => item.date === moment().format('YYYY-MM-DD') ? {
                ...item,
                pause_sec: item.pause_sec += 1
            } : item)
        },
        incComplete(state) {
            state.stats = state.stats.map((item) => item.date === moment().format('YYYY-MM-DD') ? {
                ...item,
                isDone: item.isDone += 1
            } : item)
        },
        incStopCount(state) {
            state.stats = state.stats.map((item) => item.date === moment().format('YYYY-MM-DD') ? {
                ...item,
                stop_count: item.stop_count += 1
            } : item)
        },
        incTomatoesToday(state) {
            state.stats = state.stats.map((item) => item.date === moment().format('YYYY-MM-DD') ? {
                ...item,
                tomatoesToday: item.tomatoesToday += 1
            } : item)
        },
    }
})

export const {incWorkSec, incPauseSec, incComplete, incStopCount, incTomatoesToday, pushNewAdd} = dateSlice.actions

export default dateSlice.reducer