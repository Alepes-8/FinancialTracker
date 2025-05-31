import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDatabasePath(): string {
  if (app?.isPackaged) {
    const userDataPath = app.getPath('userData');
    const dbDestPath = path.join(userDataPath, 'databaseSQLite.db');
    const packagedPath = path.join(process.resourcesPath, 'databaseSQLite.db');

    // First-time copy
    if (!fs.existsSync(dbDestPath)) {
      fs.copyFileSync(packagedPath, dbDestPath);
    }

    return dbDestPath;
  } else {
    return path.resolve(__dirname, 'databaseSQLite.db'); // Adjust to dev path if needed
  }
}

const dbPath = getDatabasePath();
const db = new Database(dbPath);
console.log('Using DB at:', dbPath);

export function getExpenses() {
  const stmt = db.prepare('SELECT * FROM EXPENSES');
  return stmt.all();
}

export function getCategories() {
  const stmt = db.prepare('SELECT * FROM CATEGORIES');
  return stmt.all();
}

export function addExpenseEntry(expenseName: string, sumAmount: number) {
    const stmt = db.prepare(`
    INSERT INTO EXPENSES (EXPENSE_REASON, SUM)
    VALUES (@EXPENSE_REASON, @SUM)
  `);

  stmt.run({
    EXPENSE_REASON: expenseName, 
    SUM: sumAmount,
  });
}