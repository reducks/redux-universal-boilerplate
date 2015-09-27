import React from 'react';
import ReactDOM from 'react-dom/server';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 *
 * Used in server-side code only to wrap the string output of the rendered route
 * component.
 *
 * The only thing this component doesn't (and can't) include is the HTML doctype
 * declaration, which is added to the rendered output by the server.js file.
 */
export default ({ assets, component, store }) => (
  <html lang="en-us">
    <head>
      <meta charSet="utf-8" />
      {DocumentMeta.renderAsReact()}
      {Object.keys(assets.styles).map((style, index) =>
        <link href={assets.styles[style]} key={index} media="screen, projection" rel="stylesheet" type="text/css" />
      )}
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: ReactDOM.renderToString(component) }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState().toJS())};` }} />
      <script src={assets.javascript.main} />
    </body>
  </html>
);
