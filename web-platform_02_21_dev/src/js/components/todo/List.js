import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { PropTypes} from 'prop-types';
import { getTodos, deleteTodo, toggleTodo } from '../../actions/todos';

export class List extends Component {

    static PropTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        geleteTodo: PropTypes.func.isRequired
    };
    

    componentDidMount() {
        this.props.getTodos();
    };

    render() {
        return (
            <Fragment>
                <h2>Лист Задач</h2>
                <table className='table table-stripe'>
                    <thead>
                        <tr>
                            <th>название</th>
                            <th>описание</th>
                            <th>готовность</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td><input 
                                    onChange={this.props.toggleTodo.bind(this, todo)} 
                                    type='checkbox' defaultChecked={todo.done} /></td>
                                <td><button 
                                    onClick={this.props.deleteTodo.bind(this, todo.id)} 
                                    className='btn btn-banger btn-sm'>удалить</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    todos: state.todos.todos
})
export default connect(mapStateToProps, { getTodos, deleteTodo, toggleTodo })(List);