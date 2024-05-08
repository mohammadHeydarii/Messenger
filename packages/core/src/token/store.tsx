import React, { ReactNode } from 'react';
import {
  createReducer,
  createStore,
  Provider as PRProvider,
} from 'react-principal';
import { persistkeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SET_TOKEN = 'SET_TOKEN';
const CLEAR = 'CLEAR';

interface InitialState {
  token: string;
}

const initialState: InitialState = {
  token: '',
};

const reducer = createReducer<InitialState>({
  SET_TOKEN: (state, { payload: { token } }) => ({
    ...state,
    token,
  }),
  CLEAR: (state, {}) => ({
    ...state,
    token: '',
  }),
});

function setToken(token: string) {
  return {
    type: SET_TOKEN,
    payload: { token },
  };
}

function logOut() {
  return {
    type: CLEAR,
    payload: {},
  };
}

const storeToken = createStore({
  reducer,
  initialState,
  persistKey: persistkeys.accessToken,
  storage: AsyncStorage,
  mapStateToPersist: ({ token }) => ({
    token,
  }),
});

const mapTokenPersistToState = () => storeToken.setToState();

const getTokenFromPersist = () => storeToken.state.token;

const TokenProvider = ({ children }: { children: ReactNode }) => {
  return <PRProvider {...{ store: storeToken }}>{children}</PRProvider>;
};

export {
  initialState as initialStateToken,
  reducer as reducerToken,
  setToken,
  TokenProvider,
  storeToken,
  mapTokenPersistToState,
  getTokenFromPersist,
  logOut,
};
