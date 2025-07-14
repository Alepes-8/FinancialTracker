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

export function getCategorySumValue() {
  const stmt = db.prepare(`
    SELECT 
        c.ID AS CATEGORY_ID, 
        c.CATEGORY_NAME,  
        SUM(e.SUM) AS TOTAL_EXPENSE 
    FROM CATEGORIES c 
        JOIN EXPENSE_CATEGORIES ec 
            ON c.ID = ec.CATEGORY_ID
            JOIN 
                EXPENSES e ON e.ID = ec.expense_id
                GROUP BY 
                    c.ID, c.CATEGORY_NAME
                ORDER BY 
                    TOTAL_EXPENSE DESC;
  `);
  return stmt.all();
}

export function getCategorieConnections() {
  const stmt = db.prepare('SELECT * FROM EXPENSE_CATEGORIES');
  return stmt.all();
}

export function updateCategory(
    categoryData: CategoryData | null,
    ) {
    const updateExpense = db.prepare(
        'UPDATE CATEGORIES SET CATEGORY_NAME = @CATEGORY_NAME WHERE ID = @ID'
    );

    return updateExpense.run({
        ID: categoryData?.ID,
        CATEGORY_NAME: categoryData?.CATEGORY_NAME,
    });
}

export function deleteCategory(categoryId: number) {
    const stmt = db.prepare('DELETE FROM CATEGORIES WHERE ID = ?');
    return stmt.run(categoryId);
}

export function updateExpense(
    expenseData: ExpenseBackendData | null,
    ) {
    const updateExpense = db.prepare(
        'UPDATE EXPENSES SET SUM = @SUM, EXPENSE_REASON = @EXPENSE_REASON WHERE ID = @ID'
    );

    return updateExpense.run({
        ID: expenseData?.ID,
        SUM: expenseData?.SUM,
        EXPENSE_REASON: expenseData?.EXPENSE_REASON,
    });
}

export function deleteExpense(
  expenseId: number
) {
  const stmt = db.prepare('DELETE FROM EXPENSES WHERE ID = ?');
  return stmt.run(expenseId);
}

export function addExpenseEntry(
  expenseName: string,
  sumAmount: number,
  categories: CategoryData | null,
) {
  // Start transaction (depends on your SQLite library)
  const insertExpenseStmt = db.prepare(`
    INSERT INTO EXPENSES (EXPENSE_REASON, SUM)
    VALUES (@EXPENSE_REASON, @SUM)
  `);

  const getCategoryByIdStmt = db.prepare(`
    SELECT * FROM CATEGORIES WHERE ID = ?
  `);

  const insertCategoryStmt = db.prepare(`
    INSERT INTO CATEGORIES (CATEGORY_NAME)
    VALUES (?)
  `);

  const insertExpenseCategoryStmt = db.prepare(`
    INSERT INTO EXPENSE_CATEGORIES (EXPENSE_ID, CATEGORY_ID)
    VALUES (?, ?)
  `);

  const expenseResult = insertExpenseStmt.run({
    EXPENSE_REASON: expenseName,
    SUM: sumAmount,
  });

  const expenseId = expenseResult.lastInsertRowid;

  // For each category, check if it exists by ID. If no ID, insert it.
  if (categories !== null) {
    let categoryId = categories.ID;

    if (!categoryId) {
      // Insert new category, get new id
      const categoryResult = insertCategoryStmt.run(categories.CATEGORY_NAME);
      categoryId = Number(categoryResult.lastInsertRowid);
    } else {
      // Optional: verify category exists by ID
      const existing = getCategoryByIdStmt.get(categoryId);
      if (!existing) {
        // If category id given but not found, insert new category instead
        const categoryResult = insertCategoryStmt.run(categories.CATEGORY_NAME);
        categoryId = Number(categoryResult.lastInsertRowid);
      }
    }

    // Link expense to category
    insertExpenseCategoryStmt.run(expenseId, categoryId);
  }
  
}

