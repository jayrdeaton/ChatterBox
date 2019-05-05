import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { fetch_middleware } from './middlewares';
import App from './routes';
import reducers from './reducers';
import { ThemeProvider } from './providers';
import * as serviceWorker from './serviceWorker';
import './style/index.css';

const createStoreWithMiddleware = applyMiddleware(
  promise, fetch_middleware
)(createStore);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <ThemeProvider>
        <Route path='/' component={App} />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
