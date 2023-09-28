import { configureStore, createSlice } from "@reduxjs/toolkit";
import { RecordingProps } from "./type";

const user = createSlice({
  name: "user",
  initialState: { uid: null, displayName: null, photoURL: undefined },
  reducers: {
    changeUser: (state, action) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
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

const chatContent = createSlice({
  name: "chatContent",
  initialState: { chatId: null, user: { uid: null, displayName: null, photoURL: undefined } },
  reducers: {
    changeChatUser: (state, action) => {
      state.user = action.payload;
      state.chatId =
        action.payload.currentUser.uid > action.payload.uid
          ? action.payload.currentUser.uid + action.payload.uid
          : action.payload.uid + action.payload.currentUser.uid;
    },
  },
});

export const { changeUser } = user.actions;
export const { addPickedDatas, removePickedDatas, resetPickedDatas } = pickedDatas.actions;
export const { changeChatUser } = chatContent.actions;
const store = configureStore({
  reducer: {
    user: user.reducer,
    pickedDatas: pickedDatas.reducer,
    chatContent: chatContent.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
