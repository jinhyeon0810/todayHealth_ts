import { configureStore, createSlice } from "@reduxjs/toolkit";
import { RecordingProps } from "./type";

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

const pickedDatas = createSlice({
  name: "pickedDatas",
  initialState: { pickedDatas: [] as RecordingProps[] },
  reducers: {
    addPickedDatas: (state, action) => {
      const isDuplicate = state.pickedDatas.some((data) => data.name === action.payload.name);
      if (!isDuplicate) {
        state.pickedDatas.push(action.payload);
      }
    },
    removePickedDatas: (state, action) => {
      state.pickedDatas = state.pickedDatas.filter((data) => data.name != action.payload.name);
    },
    resetPickedDatas: (state) => {
      state.pickedDatas = [];
    },
  },
});
const rowCountData = createSlice({
  //이거 로컬스토리지에 저장해서 해보기
  name: "rowCountData",
  initialState: { count: 0 },
  reducers: {
    addCount: (state) => {
      state.count = state.count + 1;
    },
    minusCount: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { changeData } = textId.actions;
export const { changeUser } = user.actions;
export const { addPickedDatas, removePickedDatas, resetPickedDatas } = pickedDatas.actions;
export const { addCount, minusCount } = rowCountData.actions;
const store = configureStore({
  reducer: {
    textId: textId.reducer,
    user: user.reducer,
    pickedDatas: pickedDatas.reducer,
    rowCountData: rowCountData.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
