import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import express from 'express';
import configureStore from './redux/configure';
import createLocation from 'history/lib/createLocation';
import createHistory from 'history/lib/createHistory';
import Html from './containers/Html';
import Root from './containers/Root';

const port = process.env.PORT || 3030;
const app = express();

app.use('/static', express.static(path.resolve(__dirname, '..', 'static')));

app.use((request, response) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const store = configureStore();
  const history = createHistory({
    getCurrentLocation: () => createLocation(request.path, {}, undefined, 'root'),
  });

  if (__DISABLE_SSR__) {
    const html = ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={<div />} store={store} />
    );

    response.send('<!doctype html>\n' + html);
  } else {
    const content = <Root store={store} history={history} />;

    store.renderUniversal(ReactDOM.renderToString,
      <Html assets={webpackIsomorphicTools.assets()} component={content} store={store} />
    ).then(({ output }) => {
      response.send('<!doctype html>\n' + output);
    }, ({ output, error }) => {
      // @todo Add some better error handling.
      response.send('<!doctype html>\n' + output);
    });
  }
});

app.listen(port, () => {
  console.info('----\n');// eslint-disable-line no-console
  console.info('==> Open http://localhost:%s in a browser to view the app.', port);// eslint-disable-line no-console
});
