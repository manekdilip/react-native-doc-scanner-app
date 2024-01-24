import {
  CHANGE_FELIDS,
  REPLACE_SPECIFIC_SIGNATURE,
  ADD_POSITION,
} from '../types';

export const addFieldsAction = (payload: any) => {
  return (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch({
      type: CHANGE_FELIDS,
      payload: payload,
    });
  };
};

export const replaceSignature = (payload: any) => {
  return (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch({
      type: REPLACE_SPECIFIC_SIGNATURE,
      payload: payload,
    });
  };
};

export const addFieldPosition = (payload: any) => {
  return (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch({
      type: ADD_POSITION,
      payload: payload,
    });
  };
};
