import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createRoutes from '../routes';

let Root;

if (__DEVELOPMENT__ && __DEVTOOLS__) {
  Root = ({ store, history }) => (
    <div>
      <Provider store={store}>
        <Router history={history}>{createRoutes()}</Router>
      </Provider>
    </div>
  );
} else {
  Root = ({ store, history }) => (
    <Provider store={store}>
      <Router history={history}>{createRoutes()}</Router>
    </Provider>
 );
}

export default Root;
