import React from 'react';
import TodoItem from './TodoItem';
import styles from './Todo.scss';

const TodoList = ({ children: items }) => (
  <ul className={styles.todoList}>{items}</ul>
);

export default ({ todos, pending, removeTodo }) => (
  <TodoList>{todos.map((text, key) => (
    <TodoItem key={key} pending={pending} removeTodo={() => removeTodo(key)}>{text}</TodoItem>
  ))}</TodoList>
);
