import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import authTokenReducer from "./authTokenSlice"

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    userData: persistReducer(persistConfig, userReducer),
    authToken: persistReducer(persistConfig, authTokenReducer),
});

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);
