import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCurrId: null,
  chatId: "null",
  user: null
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrUid: (state, action) => {
      state.userCurrId = action.payload.userCurrId; 
    },
    setChat: (state, action) => {
        state.user = action.payload.user,
        state.chatId = state.userCurrId < state.user.uid ? state.userCurrId + state.user.uid : state.user.uid + state.userCurrId
    }
},
});

export const { setCurrUid, setChat } = chatSlice.actions;
export default chatSlice.reducer;