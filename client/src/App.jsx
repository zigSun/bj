import React, { useState } from 'react'
import { Page } from '@geist-ui/core'
import './App.css'
import { TodoAppContextProvider } from './TodoAppContext';
import TodoListPage from './pages/TodoListPage';
import AuthPage from './pages/AuthPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoListPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return (
    <TodoAppContextProvider>
      <RouterProvider router={router}/>
    </TodoAppContextProvider>
  )
}

export default App
