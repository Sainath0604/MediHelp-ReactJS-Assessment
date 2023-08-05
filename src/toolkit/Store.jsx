import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./Reducer";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
