import React from 'react';
import styles from './Todo.scss';

export default ({ children: text, pending, removeTodo }) => (
  <li className={styles.todoItem}>
    <span className={styles.todoItemText}>{text}</span>
    <button className={styles.todoItemRemovButton} onClick={removeTodo} disabled={pending}>Remove</button>
  </li>
);
