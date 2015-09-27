import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import configureStore from './redux/configure';
import Root from './containers/Root';
import Immutable from 'immutable';

const history = createHistory();
const store = configureStore(Immutable.fromJS(window.__INITIAL_STATE__));

ReactDOM.render((
  <Root store={store} history={history} />
), document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  // Required for React development tools.
  window.React = React;

  const reactRoot = window.document.getElementById('root');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error(// eslint-disable-line no-console
      'Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'
    );
  }
}
