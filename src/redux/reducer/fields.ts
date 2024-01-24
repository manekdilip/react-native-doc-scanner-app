import {
  CHANGE_FELIDS,
  REPLACE_SPECIFIC_SIGNATURE,
  ADD_POSITION,
} from '../types';

const INITIAL_STATE = {
  listComponent: [],
};

export default function (
  state = INITIAL_STATE,
  action: {type: string; payload: any},
) {
  switch (action.type) {
    case CHANGE_FELIDS:
      return {
        ...state,
        listComponent: [...state.listComponent, action.payload],
      };
    case REPLACE_SPECIFIC_SIGNATURE:
      const AddSignatureImgById = state.listComponent.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            signature: action.payload.signature,
          };
        }
        return item;
      });
      return {
        ...state,
        listComponent: AddSignatureImgById,
      };

    case ADD_POSITION:
      const AddPositionById = state.listComponent.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            position: action.payload.position,
          };
        }
        return item;
      });
      return {
        ...state,
        listComponent: AddPositionById,
      };
    default:
      return state;
  }
}
