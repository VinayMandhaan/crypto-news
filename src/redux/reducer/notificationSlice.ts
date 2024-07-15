import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationState = {
    notificationNews:any;
};

const initialState = {
    notificationNews:null,
} as NotificationState;

export const notification = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationNews: (state, action) => {
            state.notificationNews = action.payload
        },
    },
});

export const { setNotificationNews } = notification.actions;
export default notification.reducer;
