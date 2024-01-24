import {CHANGE_SIGNATURE, ADD_SIGNATURE_LIST} from '../types';

export const changeSignatureAction = (payload: any) => {
  return (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch({
      type: CHANGE_SIGNATURE,
      payload: payload,
    });
  };
};

export const addSignatureAction = (payload: any) => {
  return (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch({
      type: ADD_SIGNATURE_LIST,
      payload: payload,
    });
  };
};
