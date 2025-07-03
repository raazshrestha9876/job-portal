import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../slice/auth";
import companyReducer from "../slice/company";
import { authApi } from "../services/authApi";
import localStorage from "redux-persist/lib/storage";
import { companyApi } from "../services/companyApi";
import { jobApi } from "../services/jobApi";

const rootReducer = combineReducers({
  auth: authReducer,
  companies: companyReducer,
  [authApi.reducerPath]: authApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware, companyApi.middleware, jobApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
