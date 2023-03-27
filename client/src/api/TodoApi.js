import axios from 'axios';

const TodoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

/**
 * 
 * @param {{
 *  username: string;
 *  email: string;
 *  text: string;
 * }} todo
 * @returns Promise<{
 *  id: string;
 *  username: string;
 *  email: string;
 *  text: string;
 *  completed: boolean;
 * }>
 */
export async function AddTodoItem(todo) {
  const response = await TodoApi.post('/todos', todo);
  return response.data;
}

export async function GetTodoItems({ username, email, completed }) {
  const response = await TodoApi.get('/todos', {
    params: {
      username,
      email,
      completed
    }
  });
  return response.data;
}

export async function DeleteTodoItem(id) {
  const response = await TodoApi.delete(`/todos/${id}`);
  return response.data;
}

export async function UpdateTodoItem(id, todo) {
  const response = await TodoApi.put(`/todos/${id}`, todo);
  return response.data;
}