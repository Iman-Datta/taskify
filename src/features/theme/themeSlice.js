import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  loading: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      state.loading = false;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
