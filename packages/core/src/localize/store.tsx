import React, { ReactNode } from 'react';
import {
  createReducer,
  createStore,
  Provider as PRProvider,
} from 'react-principal';
import { persistkeys } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LANG = 'en' | 'fa-IR';
const CHANGE_LANG = 'CHANGE_LANG';

interface InitialState {
  lang: LANG;
}

const initialState: InitialState = {
  lang: 'en',
};

const reducer = createReducer<InitialState>({
  CHANGE_LANG: (state, { payload: { lang } }) => ({
    ...state,
    lang,
  }),
});

function setLang(lang: LANG) {
  return {
    type: CHANGE_LANG,
    payload: { lang },
  };
}

const storeLang = createStore({
  reducer,
  initialState,
  persistKey: persistkeys.LANG,
  storage: AsyncStorage,
  mapStateToPersist: ({ lang }) => ({
    lang,
  }),
});

// const getStateFromPersist = () => storeLang.state.lang;

const mapLangPersistToState = () => storeLang.setToState();

const LangProvider = ({ children }: { children: ReactNode }) => {
  return <PRProvider {...{ store: storeLang }}>{children}</PRProvider>;
};

export {
  initialState as initialStateLang,
  reducer,
  setLang,
  LangProvider,
  storeLang,
  mapLangPersistToState,
};
