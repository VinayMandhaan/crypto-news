import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
    selectedFilter: any,
    newsData:any
};

const initialState = {
    selectedFilter: null,
    newsData:[]
} as FilterState;

export const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSelectedFilter: (state, action) => {
            state.selectedFilter = action.payload
        },
        setData: (state, action) => {
            state.newsData = action.payload
        }
    },
});

export const { setSelectedFilter, setData } = filter.actions;
export default filter.reducer;
