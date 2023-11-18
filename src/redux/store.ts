import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice';

const store = configureStore({
  reducer: {
    ticket: ticketReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
