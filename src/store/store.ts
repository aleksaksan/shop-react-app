import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalogSlice';
import cardSlice from './cardSlice';

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    card: cardSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
