import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    return "light";
  }
  return "dark";
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: getInitialTheme() as ThemeMode,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
      localStorage.setItem("theme", action.payload.themeMode);
    }),
  }),
});

export const { selectThemeMode } = themeSlice.selectors;
export const { changeThemeModeAC } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

export type ThemeMode = "dark" | "light";
