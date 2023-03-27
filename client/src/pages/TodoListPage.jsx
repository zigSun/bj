import { Page } from '@geist-ui/core';
import React from 'react';

import AddTodoItemForm from '../components/AddTodoItemForm';
import TodoList from '../components/TodoList';

const TodoListPage = () => {
  return (
    <Page>
      <AddTodoItemForm />
      <TodoList />
    </Page>
  )
}

export default TodoListPage;