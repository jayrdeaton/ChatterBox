import { sounds_actions } from '../actions';
const { CLOSE_SOUNDS, OPEN_SOUNDS } = sounds_actions;

const INITIAL_STATE = { open: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CLOSE_SOUNDS:
      return { ...state, open: false };
    case OPEN_SOUNDS:
      return { ...state, open: true };
    default:
      return state;
  }
}
