import Database from 'better-sqlite3';
const db = new Database('./databaseSQLite.db');

export function getExpenses() {
  const stmt = db.prepare('SELECT * FROM EXPENSES');
  return stmt.all();
}