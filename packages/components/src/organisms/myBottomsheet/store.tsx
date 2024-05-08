import React, { ReactNode } from 'react';
import { createReducer, createStore, Provider } from 'react-principal';

const SHOW_BOTTOM_SHEET = Symbol();
const initialState = {
  showBottomSheet: false,
};

const reducer = createReducer({
  [SHOW_BOTTOM_SHEET]: (state, { payload: { showBottomSheet } }) => ({
    ...state,
    showBottomSheet,
  }),
});

function showBottomSheetUpdate(showBottomSheet: Boolean) {
  return {
    type: SHOW_BOTTOM_SHEET,
    payload: { showBottomSheet },
  };
}

const Store = createStore({
  reducer,
  initialState,
});

const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export { initialState, reducer, showBottomSheetUpdate, BottomSheetProvider, Store };
