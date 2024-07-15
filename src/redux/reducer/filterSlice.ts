import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCryptoNews, getCryptoNotificationNews } from '../actions/crypto';

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
        },
        setCryptoNews: (state, action) => {
            state.cryptoNews = action.payload
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
        builder.addCase(getCryptoNotificationNews.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCryptoNotificationNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cryptoNews = [action.payload?.notificationData, ...action?.payload?.responseData.data];
        })
        builder.addCase(getCryptoNotificationNews.rejected, (state, action) => {
        })
    }
});

export const { setSelectedFilter, setData, setCryptoNews } = filter.actions;
export default filter.reducer;
