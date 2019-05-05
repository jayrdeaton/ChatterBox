export default store => next => action => {
  if (action.payload instanceof Error) {
    console.log('error caught!');
  } else {
    return next(action);
  };
};
