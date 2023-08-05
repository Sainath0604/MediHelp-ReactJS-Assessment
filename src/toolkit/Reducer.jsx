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
    editTask: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index] = action.payload.updatedTask;
      } else {
        console.warn(
          `Can't edit task (id: ${action.payload.id}) as it's not in the tasks!`
        );
      }
    },
  },
});

export const { addToTask, emptyTask, removeFromTask, editTask } =
  TaskSlice.actions;

export default TaskSlice.reducer;
