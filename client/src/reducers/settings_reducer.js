import { settings_actions } from '../actions';
const { CLOSE_SETTINGS, OPEN_SETTINGS } = settings_actions;

const INITIAL_STATE = { open: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CLOSE_SETTINGS:
      return { ...state, open: false };
    case OPEN_SETTINGS:
      return { ...state, open: true };
    default:
      return state;
  }
}
