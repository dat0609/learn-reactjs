import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


TodoList.propTypes = {
   todoList: PropTypes.array,
   onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
   todoList: [],
   onTodoClick: null,
}



function TodoList(props) {

   const { todoList, onTodoClick } = props;

   const onHandleTodoClick = (todo, index) =>{
      if(!onTodoClick) return;

      onTodoClick(todo, index);
   }

   return (
      <ul className="todo-list">
         {todoList.map((todo, index) => (
            <li className={classnames({
               'todo-item': true,
               active: todo.status === 'active'
               })} key={todo.id} onClick={() => onHandleTodoClick(todo, index)}>

               {todo.title}
            </li>
         ))}
      </ul>
   );
}

export default TodoList;