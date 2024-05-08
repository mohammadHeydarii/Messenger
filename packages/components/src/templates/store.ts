import { createReducer } from 'react-principal';


const SCROLLED = Symbol();

const initialState = {
  Scrolled: false,
};

const reducer = createReducer({
  [SCROLLED]: (state, { payload: { scrolled } }) => ({
    ...state,
    scrolled,
  }),

});

function toggleScroll(scrolled: Boolean) {
  return {
    type: SCROLLED,
    payload: { scrolled },
  };
}


export {
  initialState,
  reducer,
  toggleScroll,
};
