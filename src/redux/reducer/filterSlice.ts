import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCryptoNews } from '../actions/crypto';

type FilterState = {
    selectedFilter: any,
    newsData:any,
    cryptoNews:any;
    isLoading:boolean;
};

const initialState = {
    selectedFilter: null,
    newsData:[],
    cryptoNews:[],
    isLoading:false
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
    extraReducers: (builder) => {
        builder.addCase(getCryptoNews.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCryptoNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cryptoNews = action?.payload?.responseData.data;
        })
        builder.addCase(getCryptoNews.rejected, (state, action) => {
        })
    }
});

export const { setSelectedFilter, setData } = filter.actions;
export default filter.reducer;
