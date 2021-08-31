import queryString from 'query-string';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from 'D:\\Html\\react-begin\\src\\features\\Todo\\components\\TodoList';

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'active',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'inactive',
    },
    {
      id: 3,
      title: 'Go',
      status: 'active',
    },
  ];

  const location = useLocation();
  const [todoList, setTodoList] = useState(initTodoList);
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = queryString.parse(location.search);

    return params.status || 'all';
  });

  const handleTodoClick = (todo, index) => {
    //clone current array to new one
    const newTodoList = [...todoList];

    const newTodo = {
      ...newTodoList[index], // clone object [index] in array
      status: newTodoList[index].status === 'active' ? 'inactive' : 'active',
    };
    newTodoList[index] = newTodo;

    //update status
    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    setFilterStatus('all');
  };

  const handleShowComplete = () => {
    setFilterStatus('active');
  };

  const handleShowNew = () => {
    setFilterStatus('inactive');
  };

  const renderTodoList = todoList.filter((todo) => filterStatus === 'all' || filterStatus === todo.status);

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: values.length + 1,
      title: values.title,
      status: 'active',
    };

    const newTodoList = [...todoList, newTodo];

    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>What you do</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />

      <button onClick={handleShowAll}>All</button>
      <button onClick={handleShowComplete}>Show Complete</button>
      <button onClick={handleShowNew}>Show New</button>
    </div>
  );
}
export default ListPage;
