// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import formReducer from './formSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, formReducer);

// Configure store
export const store = configureStore({
  reducer: {
    form: persistedReducer,
  },
});

// Create persistor
export const persistor = persistStore(store);

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
