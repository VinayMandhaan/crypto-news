import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store';
import axios from 'axios';

export const getCryptoNews = createAsyncThunk("getCryptoNews", async (data) => {
    try {
        if (data != null) {
            const res = await axios({
                method: 'GET',
                url: `https://cryptonews-api.com/api/v1?tickers=${data}&items=50&page=1&token=pnudnubwjqdofl14enbotqh6by28lc3g4mz1tyuo`
            })
            const responseData = res.data
            return { responseData, data }
        } else {
            const res = await axios({
                method: 'GET',
                url: `https://cryptonews-api.com/api/v1/category?section=general&items=50&page=1&token=pnudnubwjqdofl14enbotqh6by28lc3g4mz1tyuo`
            })
            const responseData = res.data
            return { responseData, data }
        }
    } catch (err) {
        console.log(err)
    }
})


export const getCryptoNotificationNews = createAsyncThunk("getCryptoNotificationNews", async (data) => {
    try {
        console.log(data,'Data')
        const res = await axios({
            method: 'GET',
            url: `https://cryptonews-api.com/api/v1/category?section=general&items=50&page=1&token=pnudnubwjqdofl14enbotqh6by28lc3g4mz1tyuo`
        })
        const responseData = res.data
        const notificationData = data
        return { responseData, data, notificationData }
    } catch (err) {
        console.log(err)
    }
})