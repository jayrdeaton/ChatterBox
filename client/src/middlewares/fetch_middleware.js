const { convertResponse } = require('../helpers');

const fetch_middleware = store => next => async action => {
  if (action.payload && action.payload.json) {
    action.response = action.payload;
    action.payload = await action.response.json();
    convertResponse(action.payload);
  };
  return next(action);
};

module.exports = fetch_middleware;
