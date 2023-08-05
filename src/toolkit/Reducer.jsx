import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "task",
  initialState: {
    items: [],
  },

  reducers: {
    addToTask: (state, action) => {
      state.items.push(action.payload);
    },
    emptyTask: (state) => {
      state.items = [];
    },
  },
});

export const { addToTask, emptyTask } = TaskSlice.actions;

export default TaskSlice.reducer;
