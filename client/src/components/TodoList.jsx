import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { Pagination } from "@geist-ui/core";
const TodoList = () => {
  const todos = useTodos();
  
  const [page, setPage] = useState(1);

  return (
    <div>
      {todos.map(todoData => (<TodoItem data={todoData} />))}
      <Pagination 
        count={10} 
        page={page} 
        onChange={(page) => setPage(page)}
      />
    </div>
  )
}

export default TodoList;