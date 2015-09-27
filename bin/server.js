#!/usr/bin/env node
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import WebPackIsomorphicToolsConfig from '../webpack/webpack-isomorphic-tools';
import path from 'path';

// Define isomorphic constants.
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVTOOLS__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

global.webpackIsomorphicTools = new WebpackIsomorphicTools(WebPackIsomorphicToolsConfig)
  .development(__DEVELOPMENT__)
  .server(path.resolve(__dirname, '..'), () => {
    require('../src/server');
  });
