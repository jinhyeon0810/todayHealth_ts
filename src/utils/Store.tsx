import { configureStore, createSlice } from "@reduxjs/toolkit";

const textId = createSlice({
  name: "textId",
  initialState: { textId: "" },
  reducers: {
    changeData: (state, action) => {
      state.textId = action.payload;
    },
  },
});

export const { changeData } = textId.actions;

const store = configureStore({
  reducer: {
    textId: textId.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
