import { createReducer } from 'react-principal';

const CHAT = Symbol();

const initialState = {
  chatInfo: {
    chatId: '',
    name: '',
    userName: '',
    status: '',
  },
};

const reducer = createReducer({
  [CHAT]: (state, { payload: { chatInfo } }) => ({
    ...state,
    chatInfo,
  }),
});

function updateChatInfo(chatInfo: any) {
  return {
    type: CHAT,
    payload: { chatInfo },
  };
}

export { initialState, reducer, updateChatInfo };
