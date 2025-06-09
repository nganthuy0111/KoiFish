import { createSlice } from "@reduxjs/toolkit";

const tourSlice = createSlice({
  name: "tour",
  initialState: null,
  reducers: {
    saveTour: (state, actions) => {
      state = actions.payload;
      return state;
    },

    resetTour: () => {
      return null;
    },
  },
});

export const { saveTour, resetTour } = tourSlice.actions;
export default tourSlice.reducer;
