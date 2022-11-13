import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { tasksApi } from './features/api/task';

export const store = configureStore({
  reducer: { [tasksApi.reducerPath]: tasksApi.reducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
