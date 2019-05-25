const CLOSE_SOUNDS = 'CLOSE_SOUNDS';
const OPEN_SOUNDS = 'OPEN_SOUNDS';

const closeSounds = () => {
  return {
    type: CLOSE_SOUNDS
  };
};
const openSounds = () => {
  return {
    type: OPEN_SOUNDS
  };
};

export default {
  CLOSE_SOUNDS, OPEN_SOUNDS,
  closeSounds, openSounds
}
