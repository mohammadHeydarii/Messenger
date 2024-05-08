import { createReducer } from 'react-principal';

const START_ADD = Symbol();
const GROUP_NAME =Symbol();
const initialState = {
  startAdd: false,
  groupName:""
};


const reducer = createReducer({
  [START_ADD]: (state, { payload: { startAdd } }) => ({
    ...state,
    startAdd,
  }),
  [GROUP_NAME]: (state, { payload: { groupName } }) => ({
    ...state,
    groupName,
  }),

});


function toggleStart(startAdd: Boolean) {
  return {
    type: START_ADD,
    payload: { startAdd },
  };
}

function updateGroupName(groupName: string) {
  return {
    type: GROUP_NAME,
    payload: { groupName },
  };
}



export { 
  initialState, 
  reducer, 
  toggleStart,
  updateGroupName
 };
