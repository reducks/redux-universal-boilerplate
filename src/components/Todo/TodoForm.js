import React, { Component, PropTypes } from 'react';
import styles from './Todo.scss';

export default class TodoForm extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  handleSubmit(event) {
    event.preventDefault();
    if (this.refs.text.value && !this.props.pending) {
      this.props.addTodo(this.refs.text.value);
      this.refs.text.value = '';
    }
  }

  render() {
    return (
      <form className={styles.todoForm} onSubmit={::this.handleSubmit}>
        <input className={styles.todoTextInput} type="text" ref="text" disabled={this.props.pending} />
      </form>
    );
  }
}
