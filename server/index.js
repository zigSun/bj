require('dotenv').config();
const { SERVER_PORT } = process.env;

const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./db');

const TodoController = require('./controllers/TodoController');
const TodoService = require('./service/TodoService');

const TodoServiceInstance = new TodoService(db);
const TodoControllerInstance = new TodoController(TodoServiceInstance);


const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(async(req, res, next) => {
  try {
    await next();
  } catch(err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


const authAdminMiddleware = (req, res, next) => {
  const { auth } = req.cookies;
  if (auth !== 'admin') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

app.get('/todos', TodoControllerInstance.getList);
app.post('/todos', TodoControllerInstance.addTodoItem);
app.put('/todos/:id', authAdminMiddleware, TodoControllerInstance.updateTodoItem);
app.post('/todos/:id/completed', authAdminMiddleware, TodoControllerInstance.markTodoItemCompleted);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin' || password !== '123') {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }
  res.cookie('auth', 'admin', { httpOnly: true, expires: new Date(Date.now() + 10*60*1000) });
  res.status(200);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});

process.on('SIGINT', () => {
  db.close();
  console.log('Server shutting down');
  process.exit();
});