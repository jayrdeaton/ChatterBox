const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
const OPEN_SETTINGS = 'OPEN_SETTINGS';

const closeSettings = () => {
  return {
    type: CLOSE_SETTINGS
  };
};
const openSettings = () => {
  return {
    type: OPEN_SETTINGS
  };
};

export default {
  CLOSE_SETTINGS, OPEN_SETTINGS,
  closeSettings, openSettings
}
