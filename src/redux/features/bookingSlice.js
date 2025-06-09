import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingId: null,
    consultingId: null,
  },
  reducers: {
    setBooking: (state, action) => {
      state.bookingId = action.payload.bookingId;
      state.consultingId = action.payload.consultingId;
    },
    clearBooking: (state) => {
      state.bookingId = null;
      state.consultingId = null;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
