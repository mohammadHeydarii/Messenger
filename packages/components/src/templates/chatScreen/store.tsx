import React, { ReactNode } from 'react';
import {
  createReducer,
  createStore,
  Provider as RPRovider,
} from 'react-principal';
import { ImagePickerResponse } from 'react-native-image-picker';

const SEND_MESSAGE = 'SEND_MESSAGE';
const GET_MESSAGE = 'GET_MESSAGE';
const EDIT_MESSAGE = 'EDIT_MESSAGE';
const PIN_MESSAGE = 'PIN_MESSAGE';
const EDIT_SEEN_ALL_MESSAGE = 'EDIT_SEEN_ALL_MESSAGE';
const REPLY_MESSAGE = 'REPLY_MESSAGE';
const FORWARDED_MESSAGE = 'FORWARDED_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SEARCH_TEXT = 'SEARCH_TEXT';
const CLEAR = 'CLEAR';
const CHANGE_TEXT = 'CHANGE_TEXT';
const LOAD_EARLIER_MESSAGES = 'LOAD_EARLIER_MESSAGES';
const LOAD_EARLIER_START = 'LOAD_EARLIER_START';
const SET_IS_TYPING = 'SET_IS_TYPING';
const SET_IS_EDITING = 'SET_IS_EDITING';
const SET_FILE = 'SET_FILE';
const SET_DOCUMENT = 'SET_DOCUMENT';
const SET_UPLOADED_DATA = 'SET_UPLOADED_DATA';
interface InitialState {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
  editingMessage: any;
  replyMessage: any;
  text: string;
  forwardedMessage: any;
  pinMessage: any;
  searchText: string;
  file: ImagePickerResponse | null;
  document: any;
  uploadedFile: any;
}

const initialState: InitialState = {
  messages: [],
  step: 0,
  loadEarlier: false,
  isLoadingEarlier: false,
  isTyping: false,
  editingMessage: null,
  text: '',
  replyMessage: null,
  forwardedMessage: null,
  searchText: '',
  file: null,
  document: null,
  pinMessage: null,
  uploadedFile: null,
};

const reducer = createReducer<InitialState>({
  SET_FILE: (state, { payload }) => ({
    ...state,
    file: payload?.file,
  }),
  SET_DOCUMENT: (state, { payload }) => ({
    ...state,
    document: payload?.document,
  }),
  SET_UPLOADED_DATA: (state, { payload }) => ({
    ...state,
    uploadedFile: payload?.uploadedFile,
  }),
  SEND_MESSAGE: (state, { payload }) => ({
    ...state,
    step: state.step + 1,
    messages: payload.messages,
    replyMessage: null,
    editingMessage: null,
    document: null,
    file: null,
    uploadedFile: null,
    text: '',
  }),
  GET_MESSAGE: (state, { payload }) => ({
    ...state,
    step: state.step + 1,
    messages: payload.messages,
    // replyMessage: null,
    // editingMessage: null,
    // document: null,
    // file: null,
    // uploadedFile: null,
    // text: '',
  }),
  REPLY_MESSAGE: (state, { payload }) => ({
    ...state,
    replyMessage: payload.replyMessage,
  }),
  FORWARDED_MESSAGE: (state, { payload }) => ({
    ...state,
    forwardedMessage: payload.forwardedMessage,
  }),
  PIN_MESSAGE: (state, { payload }) => ({
    ...state,
    pinMessage: payload.pinMessage,
  }),
  DELETE_MESSAGE: (state, { payload }) => {
    const updatedMessages = state.messages.filter(
      (msg) => !payload.messages.includes(msg.id),
    );

    return {
      ...state,
      messages: updatedMessages,
    };
  },

  EDIT_MESSAGE: (state, { payload }) => {
    const messageIndex = state.messages.findIndex(
      (m) => m.id === payload.messages[0]?.id,
    );
    const _messageIndex = state.messages.findIndex((m) => {
      return m._id === payload.messages[0]?.client_id;
    });

    const index =
      messageIndex > -1
        ? messageIndex
        : _messageIndex > -1
          ? _messageIndex
          : -1;

    if (index > -1) {
      state.messages[index].pending = false;
      state.messages[index].text =
        payload.messages[0]?.text || state.messages[index]?.text;
      state.messages[index].sent =
        payload.messages[0]?.sent || state.messages[index]?.sent;
      state.messages[index].recived =
        payload.messages[0]?.recived || state.messages[index]?.recived;
      state.messages[index].id =
        payload.messages[0]?.id || state.messages[index]?.id;
      state.messages[index]._id =
        payload.messages[0]?._id || state.messages[index]?._id;
    }

    return {
      ...state,
      step: state.step + 1,
      text: ' ',
      editingMessage: null,
      replyMessage: null,
    };
  },
  EDIT_SEEN_ALL_MESSAGE: (state, {}) => {
    const messages = state?.messages?.map((item) => {
      if (item.id) {
        return {
          ...item,
          received: true,
        };
      } else {
        return item;
      }
    });
    return {
      ...state,
      messages,
    };
  },
  CHANGE_TEXT: (state, { payload }) => ({
    ...state,
    text: payload.text,
  }),
  SEARCH_TEXT: (state, { payload }) => ({
    ...state,
    searchText: payload.searchText,
  }),

  LOAD_EARLIER_MESSAGES: (state, { payload }) => ({
    ...state,
    messages: payload.messages,
  }),

  LOAD_EARLIER_START: (state) => ({
    ...state,
    isLoadingEarlier: true,
  }),

  SET_IS_TYPING: (state, { payload }) => ({
    ...state,
    isTyping: payload.isTyping,
  }),
  SET_IS_EDITING: (state, { payload }) => ({
    ...state,
    editingMessage: payload.editingMessage,
  }),
  CLEAR: (state, { payload }) => {
    state?.document?.assets?.item?.(0) &&
      URL.revokeObjectURL(state?.document?.assets?.item(0));
    state.document?.assets ?? URL.revokeObjectURL(state.document?.assets);

    return {
      ...state,
      editingMessage: null,
      replyMessage: null,
      forwardedMessage: null,
      file: null,
      document: null,
      text: '',
    };
  },
});

function sendFile(file: any) {
  console.log({ file });

  return {
    type: SET_FILE,
    payload: { file },
  };
}
function setDocument(document: any) {
  return {
    type: SET_DOCUMENT,
    payload: { document },
  };
}

function setUploadedFile(uploadedFile: any) {
  console.log({ uploadedFile });
  return {
    type: SET_UPLOADED_DATA,
    payload: { uploadedFile },
  };
}
function sendMessage(messages: any) {
  return {
    type: SEND_MESSAGE,
    payload: { messages },
  };
}
function getMessage(messages: any) {
  return {
    type: GET_MESSAGE,
    payload: { messages },
  };
}
function editMessage(messages: any) {
  return {
    type: EDIT_MESSAGE,
    payload: { messages },
  };
}
function editSeenAllMessage() {
  return {
    type: EDIT_SEEN_ALL_MESSAGE,
    payload: {},
  };
}
function replyMessage(replyMessage: any) {
  return {
    type: REPLY_MESSAGE,
    payload: { replyMessage },
  };
}
function forwardMessage(forwardedMessage: any) {
  return {
    type: FORWARDED_MESSAGE,
    payload: { forwardedMessage },
  };
}
function PinMessage(pinMessage: any) {
  return {
    type: PIN_MESSAGE,
    payload: { pinMessage },
  };
}

function deleteMessage(messages: any) {
  return {
    type: DELETE_MESSAGE,
    payload: { messages },
  };
}
function changeText(text: any) {
  return {
    type: CHANGE_TEXT,
    payload: { text },
  };
}
function searchText(searchText: any) {
  return {
    type: SEARCH_TEXT,
    payload: { searchText },
  };
}

function setIsEdited(editingMessage: any) {
  return {
    type: SET_IS_EDITING,
    payload: { editingMessage },
  };
}

function loadEarlier(messages: any) {
  return {
    type: LOAD_EARLIER_MESSAGES,
    payload: { messages },
  };
}

function loadEarlierStart() {
  return {
    type: LOAD_EARLIER_START,
    payload: {},
  };
}

function setIsTypingAction(isTyping: any) {
  return {
    type: SET_IS_TYPING,
    payload: { isTyping },
  };
}

function clear() {
  return {
    type: CLEAR,
    payload: {},
  };
}
const Store = createStore<InitialState>({
  reducer,
  initialState,
});

const Provider = ({ children }: { children: ReactNode }) => {
  return <RPRovider store={Store}>{children}</RPRovider>;
};

export {
  initialState,
  reducer,
  sendMessage,
  loadEarlier,
  loadEarlierStart,
  setIsTypingAction,
  changeText,
  setIsEdited,
  editMessage,
  replyMessage,
  clear,
  forwardMessage,
  deleteMessage,
  searchText,
  sendFile,
  getMessage,
  setDocument,
  editSeenAllMessage,
  PinMessage,
  Provider,
  setUploadedFile,
  Store,
};
