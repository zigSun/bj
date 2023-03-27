require('dotenv').config({ path: '../.env' });
const db = require('../db');

const TodoService = require('./TodoService');
const TodoServiceInstance = new TodoService(db);

(async()=> {
  const data = await TodoServiceInstance.getTodoList({});
  console.dir(data);
})();