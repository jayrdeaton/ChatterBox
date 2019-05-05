const CLOSE_DRAWER = 'CLOSE_DRAWER';
const OPEN_DRAWER = 'OPEN_DRAWER';
const MAKE_PERMANENT = 'MAKE_PERMANENT';
const MAKE_NOT_PERMANENT = 'MAKE_NOT_PERMANENT';

const closeDrawer = () => {
  sessionStorage.setItem('drawer_open', false);
  return {
    type: CLOSE_DRAWER
  };
};
const openDrawer = () => {
  sessionStorage.setItem('drawer_open', true);
  return {
    type: OPEN_DRAWER
  };
};
const makePermanent = () => {
  return {
    type: MAKE_PERMANENT
  };
};
const makeNotPermanent = () => {
  return {
    type: MAKE_NOT_PERMANENT
  };
};

export default {
  CLOSE_DRAWER, OPEN_DRAWER, MAKE_PERMANENT, MAKE_NOT_PERMANENT,
  closeDrawer, openDrawer, makePermanent, makeNotPermanent
};
