import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
const reducer = combineReducers({
  user: authReducer,
  counter: counterSlice,
  post: postReducer,
  // global: globalSlice,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(addressApi.middleware),
  // middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

export default store;
