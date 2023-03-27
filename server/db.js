const sqlite3 = require('sqlite3').verbose();

const { SQLITE_DB_PATH } = process.env;

const db = new sqlite3.Database(SQLITE_DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS todoapp_todos(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0,
    edited INTEGER NOT NULL DEFAULT 0
  );`)

module.exports = db;