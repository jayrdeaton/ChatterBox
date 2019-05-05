import { combineReducers } from 'redux';
import drawer_reducer from './drawer_reducer';
import theme_reducer from './theme_reducer';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  drawer: drawer_reducer,
  theme: theme_reducer
});

export default rootReducer;
