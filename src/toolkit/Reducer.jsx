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
    removeFromTask: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        console.warn(`Can't (id: ${action.payload}) as it's not in the tasks!`);
      }
    },
  },
});

export const { addToTask, emptyTask, removeFromTask } = TaskSlice.actions;

export default TaskSlice.reducer;
