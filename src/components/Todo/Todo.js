import React, { Component, PropTypes } from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { multiplexActionCreator } from 'redux-multiplex';
import { ensureTodoItemState } from '../../redux/reducers/todo';

import {
  addTodo as addTodoAction,
  removeTodo as removeTodoAction,
} from '../../redux/reducers/todo/items';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
import styles from './Todo.scss';

class TodoContainer extends Component {
  static propTypes = {
    todos: PropTypes.instanceOf(List).isRequired,
    status: PropTypes.instanceOf(Map).isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (__SERVER__ && !this.props.status.get('pending') && !this.props.todos.size) {
      this.props.addTodo('Item added by the server.');
      this.props.addTodo('Item added by the server.');
      this.props.addTodo('Item added by the server.');
      this.props.addTodo('Item added by the server.');
      this.props.addTodo('Item added by the server.');
    }
  }

  render() {
    const { todos, status, addTodo, removeTodo } = this.props;

    return (
      <Todo>
        <TodoForm addTodo={addTodo} pending={status.get('pending')} />
        <TodoList removeTodo={removeTodo} pending={status.get('pending')} todos={todos} />
      </Todo>
    );
  }
}

const Todo = ({ children }) => (
  <div className={styles.todoContainer}>
    <h2 className={styles.todoTitle}>Todos</h2>
    <div>{children}</div>
  </div>
);

const connectTodo = connect(ensureTodoItemState((state) => ({
  todos: state.get('items'),
  status: state.get('status'),
})), (dispatch, props) => bindActionCreators({
  addTodo: multiplexActionCreator(props.id)(addTodoAction),
  removeTodo: multiplexActionCreator(props.id)(removeTodoAction),
}, dispatch));

export default connectTodo(TodoContainer);
