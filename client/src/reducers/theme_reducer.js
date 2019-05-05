import { theme_actions } from '../actions';
const { TOGGLE_DARK_MODE } = theme_actions;

const INITIAL_STATE = { type: sessionStorage.getItem('theme_type') || 'light' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, type: sessionStorage.getItem('theme_type') };
    default:
      return state;
  }
};
