import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload; // ✅ Immer की मदद से state update हो रही है
    },
    removeUser: (state) => { 
      state.user = null; // ✅ action की जरूरत नहीं
    },
  },
});

export const { addUser, removeUser } = userslice.actions;
export default userslice.reducer;
