import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import appointmentReducer from "./appointmentSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appointmentPersistConfig = {
  key: "appointment",
  storage,
  blacklist: ["appointment"],
};
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["appointment"],
};
const reducer = combineReducers({
  user: authReducer,
  post: postReducer,
  // appointment: persistReducer(appointmentPersistConfig, appointmentReducer),
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export const persistor = persistStore(store);
