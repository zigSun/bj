class TodoController {
  constructor(TodoService) {
    this.TodoService = TodoService;
  }

  async getList(req, res) {
    const { username, email, completed, page } = req.query;
  
    res.json(this.TodoService.getTodoList({ username, email, completed, page }));
  }
  
  async addTodoItem(req, res) {
    const { username, email, text } = req.body;
  
    res.json(this.TodoService.addTodoItem({ username, email, text }));
  }
  
  async updateTodoItem(req, res) {
    const { id } = req.params;
    const { text } = req.body;
  
    res.json(this.TodoService.updateTodoItem(id, { text }));
  }
  
  async markTodoItemCompleted(req, res) {
    const { id } = req.params;
  
    res.json(this.TodoService.markAsCompleted(id));
  }
}

module.exports = TodoController;