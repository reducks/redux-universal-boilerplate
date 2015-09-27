import './Reset.scss';
import React from 'react';
import DocumentMeta from 'react-document-meta';
import styles from './App.scss';

const title = 'Boilerplate';
const description = 'Boilerplate for universal React applications.';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
  },
};

export default ({ children }) => (
  <div className={styles.appContainer}>
    <DocumentMeta {...meta} />
    {children}
  </div>
);
