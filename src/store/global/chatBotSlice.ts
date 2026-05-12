import { createSlice } from '@reduxjs/toolkit';

interface ChatBotState {
  isOpen: boolean;
}

const initialState: ChatBotState = {
  isOpen: false,
};

export const chatBotSlice = createSlice({
  name: 'chatBot',
  initialState,
  reducers: {
    openChatBot: (state) => {
      state.isOpen = true;
    },
    closeChatBot: (state) => {
      state.isOpen = false;
    },
    toggleChatBot: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openChatBot, closeChatBot, toggleChatBot } = chatBotSlice.actions;
export default chatBotSlice.reducer;
