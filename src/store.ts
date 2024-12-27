import { configureStore } from "@reduxjs/toolkit";
import colorCodeReducer from "./features/colorCode/colorCodeSlice";
import pointerReducer from "./features/pointer/pointerSlice";

export const store = configureStore({
  reducer: { colorCode: colorCodeReducer, pointer: pointerReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
