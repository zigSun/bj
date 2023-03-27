import React, { createContext, useReducer, useContext } from "react";
import { initialState, todoReducer } from "./TodoAppReducer";
export const TodoAppContext = createContext({
  todos: [],
  isAdmin: false
});
export const TodoAppReducerContext = createContext(null);

export const TodoAppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(
    todoReducer,
    initialState
  );

  return (
    <TodoAppContext.Provider value={store}>
      <TodoAppReducerContext.Provider value={dispatch}>
        {children}
      </TodoAppReducerContext.Provider>
    </TodoAppContext.Provider>
  );
}

export function useTasks() {
  const { todos } = useContext(TodoAppContext);

  return todos;
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
