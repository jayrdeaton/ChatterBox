const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

const toggleDarkMode = () => {
  if (sessionStorage.getItem('theme_type') === 'dark') {
    sessionStorage.setItem('theme_type', 'light');
  } else {
    sessionStorage.setItem('theme_type', 'dark');
  };
  return {
    type: TOGGLE_DARK_MODE
  };
};

export default {
  TOGGLE_DARK_MODE,
  toggleDarkMode
}
