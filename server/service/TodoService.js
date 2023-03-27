/**
 * @typedef {{
 *  id: number;
 *  username: string;
 *  email: string;
 *  text: string;
 *  completed: boolean;
 *  edited: boolean;
 * }} TodoItem
 */

class TodoService {
  constructor(db) {
    this.db = db;
  }

  /**
   * 
   * @param {{
   *  username: string;
   *  email: string;
   *  text: string;
   * }} todo 
   * @returns {Promise<TodoItem>}
   */
  async addTodoItem(todo) {
    const insertedItemId = await new Promise((resolve, reject) => this.db.run(
      'INSERT INTO todoapp_todos (username, email, text) VALUES (?, ?, ?) RETURNING *;',
      [todo.username, todo.email, todo.text],
      function (err, row)  {
        if(err) reject(err);
        resolve(this.lastID);
      }
    ));

    return this.getTodoItem(insertedItemId);
  }

  /**
   * 
   * @param {number} id 
   * @returns {Promise<TodoItem>}
   */
  async markAsCompleted(id) {
    await new Promise((resolve,reject) => this.db.run(
      'UPDATE todoapp_todos SET completed = 1 WHERE id = ?',
      [id],
      function(err) {
        if(err) reject(err);
        resolve(true);
      }
    ));

    return this.getTodoItem(id);
  }

  /**
   * 
   * @param {number} id 
   * @param {{ text: string;}} param1 
   * @returns {Promise<TodoItem>}
   */
  async updateTodoItem(id, { text }) {
    await new Promise((resolve,reject) => this.db.run(
      'UPDATE todoapp_todos SET text = ?, edited = 1 WHERE id = ?',
      [text, id],
      function(err) {
        if(err) reject(err);
        resolve(true);
      }
    ));

    return this.getTodoItem(id); 
  }

  /**
   * 
   * @param {number} id 
   * @returns {Promise<TodoItem>}
   */
  async getTodoItem(id) {
    return new Promise((resolve, reject) => this.db.get(
      `SELECT * FROM todoapp_todos WHERE id = ?`, 
      [id], 
      (err, row) => {
        if(err) reject(err);
        resolve(row);
      }
    ));
  }

  /**
   * 
   * @param {{
   *  username?: string;
   *  email?: string;
   *  completed?: boolean;
   *  orderBy?: 'username' | 'email' | 'text' | 'completed';
   *  order?: 'ASC' | 'DESC';
   *  page?: number;
   * }} param0 
   * @returns {Promise<{list: TodoItem[], currentPage:number; totalPages: number;}>}
   */
  async getTodoList({ username, email, completed, orderBy, order = 'ASC', page = 1 }) {
    const LIMIT = 3;
    const OFFSET = LIMIT * (page-1);
    
    //* Query build */
    let query = `SELECT * FROM todoapp_todos`;
    const where = [];
    
    const paramsMap = {
    };
    
    if(typeof username !== 'undefined') {
      where.push(`username LIKE $username`);  
      paramsMap.$username = `%${username}%`;
    }
    if(typeof email !== 'undefined') {
      where.push(`email LIKE $email`);
      paramsMap.$email = `%${email}%`;
    }
    if(typeof completed !== 'undefined') {
      where.push(`completed = $completed`);
      paramsMap.$completed = Number(Boolean(completed));
    }

    if(where.length > 0) {
      query += ` WHERE ${where.join(' AND ')}`;
    }
    if(typeof orderBy !== 'undefined') {
      query += ` ORDER BY ${orderBy} ${order}`;
    }

    query += ` LIMIT $limit OFFSET $offset`;

    const pageData = await new Promise((resolve, reject) => this.db.all(
      query,
      {...paramsMap, $limit: LIMIT, $offset: OFFSET},
      (err, rows) => {
        if(err) reject(err);
        resolve(rows);
      }
    ));

    const countQuery = `SELECT COUNT(*) as total FROM todoapp_todos ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}`;

    const { total } = await new Promise((resolve, reject) => this.db.get(
      countQuery,
      paramsMap,
      (err, row) => {
        if(err) reject(err);
        resolve(row);  
      }
    ));
    
    return {
      list: pageData,
      currentPage: page,
      totalPages: Math.ceil(total / LIMIT)
    };
  }
}

module.exports = TodoService;