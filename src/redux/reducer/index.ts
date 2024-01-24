import {combineReducers} from 'redux';
import theme from './theme';
import fields from './fields';

const rootReducer = combineReducers({
  theme,
  fields,
});

export default rootReducer;
