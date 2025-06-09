import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../../src/redux/features/userSlice";
import tourSlice from "./features/tourSlice";
import cartReducer from "./features/cartSlice"
export const rootReducer = combineReducers({
  user: userReducer,
  tour: tourSlice, 
  cart: cartReducer,
});
