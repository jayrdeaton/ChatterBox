import { drawer_actions } from '../actions';
const { CLOSE_DRAWER, OPEN_DRAWER, MAKE_PERMANENT, MAKE_NOT_PERMANENT } = drawer_actions;

const INITIAL_STATE = { open: false, permanent: false };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CLOSE_DRAWER:
      return { ...state, open: false };
    case OPEN_DRAWER:
      return { ...state, open: true };
    case MAKE_PERMANENT:
      return { ...state, permanent: true };
    case MAKE_NOT_PERMANENT:
      return { ...state, permanent: false };
    default:
      return state;
  }
}
