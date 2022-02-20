import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getTodos, deleteTodo, toggleTodo } from "../js/actions";
import ModulesComponent from "./ModulesComponent";

const TodoListComponent = () => {
  const propTypes = {
    todos: PropTypes.array.isRequired,
    getTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };
  //
  // componentDidMount() {
  //   this.props.getTodos();
  // }

  return (
    <Fragment>
      <h2>Todo records</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>done</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={this.props.toggleTodo.bind(this, todo)}
                  defaultChecked={todo.done}
                />
              </td>
              <td>
                <button
                  onClick={this.props.deleteTodo.bind(this, todo.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TodoListComponent;

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});
