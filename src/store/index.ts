// src/app/store.js
import resourceContentReducer from "@/features/resourceContent/resourceContentSlice";
import resourceContentformReducer from "@/features/form/resourceContentFormSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    resourceContent: resourceContentReducer, // Placeholder for resource content reducer
    form: resourceContentformReducer, // Placeholder for form reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
