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

const user = createSlice({
  name: "user",
  initialState: { uid: null },
  reducers: {
    changeUser: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { changeData } = textId.actions;
export const { changeUser } = user.actions;
const store = configureStore({
  reducer: {
    textId: textId.reducer,
    user: user.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
