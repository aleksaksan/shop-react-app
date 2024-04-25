import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalogSlice';

const store = configureStore({
  reducer: {
    // todos: todoReducer,
    items: catalogReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;