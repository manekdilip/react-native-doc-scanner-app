import {CHANGE_SIGNATURE, ADD_SIGNATURE_LIST} from '../types';

const INITIAL_STATE = {
  signature: '',
  allSignatures: [],
};

export default function (
  state = INITIAL_STATE,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    case CHANGE_SIGNATURE:
      return {
        ...state,
        signature: action.payload,
      };
    case ADD_SIGNATURE_LIST:
      return {
        ...state,
        allSignatures: [...state.allSignatures, action.payload],
      };
    default:
      return state;
  }
}
