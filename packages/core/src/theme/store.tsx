import React, { ReactNode } from 'react';
import {
  createReducer,
  createStore,
  Provider as RPProvider,
} from 'react-principal';
import { persistkeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type THEME = 'light' | 'dark' | 'rose';
const CHANGE_THEME = 'CHANGE_THEME';

interface InitialState {
  theme: THEME;
}

const initialState: InitialState = {
  theme: 'light',
};

const reducer = createReducer<InitialState>({
  CHANGE_THEME: (state, { payload: { theme } }) => ({
    ...state,
    theme,
  }),
});

function setTheme(theme: THEME) {
  return {
    type: CHANGE_THEME,
    payload: { theme },
  };
}

const storeTheme = createStore({
  reducer,
  initialState,
  persistKey: persistkeys.THEME,
  storage: AsyncStorage,
  mapStateToPersist: ({ theme }) => ({
    theme,
  }),
});

const mapThemePersistToState = () => storeTheme.setToState();

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <RPProvider {...{ store: storeTheme }}>{children}</RPProvider>;
};

export {
  initialState,
  reducer as reducerTheme,
  setTheme,
  ThemeProvider,
  storeTheme,
  mapThemePersistToState,
};
