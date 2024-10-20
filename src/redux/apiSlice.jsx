import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
  name: "apiSlice",
  initialState: {
    userInput: "",
  },
  reducers: {
    updateUserInput: (state, action) => {
      state.userInput = action.payload.userInput;
    },
  },
});

export const { updateUserInput } = apiSlice.actions;
export default apiSlice.reducer;
