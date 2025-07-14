import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcMainOn, ipcWebContentsSend } from './utils.js';
import { getExpenses, addExpenseEntry, getCategories, deleteExpense, updateExpense, updateCategory, deleteCategory, getCategorySumValue} from '../../database/dbmanager.js';

const SENDING_INTERVAL = 2000;

//sending a message each 2000 second t
export function pullResources(mainWindow: BrowserWindow){
    setInterval(async () => {
        const message = await getBackendMessage();
        ipcWebContentsSend('subscribeStats', mainWindow.webContents, {log: message})
    }, SENDING_INTERVAL)
}

export function getAllBackendExpenseData() {
    return getExpenses();
}

export function getAllCategoriesFromDatabase() {
    const rawData = getCategories() as DatabaseCategoryRow[];
    const transformed: CategoryData[] = rawData.map((row) => ({
        ID: row.ID,
        CATEGORY_NAME: row.CATEGORY_NAME,
    }));
    return transformed
}

export function getAllCategorySumValues() {
  const rawData = getCategorySumValue() as DatabaseCategorySum[];
  
  const transformed: CategorySumData[] = rawData.map((row) => ({
    ID: row.CATEGORY_ID,               
    CATEGORY_NAME: row.CATEGORY_NAME,  
    SUM: row.TOTAL_EXPENSE            
  }));

  console.log(transformed);
  return transformed;
}

function getBackendMessage() : Promise<number>{
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

export function createPayLoadListner(){
    ipcMainOn('sendCreateExpense', (payload) => {
        addExpenseEntry(payload.name, payload.value, payload.category);
    });

    ipcMainOn('sendUpdateExpense', (payLoad) => {
        updateExpense(payLoad);
    });

    ipcMainOn('sendDeleteExpense', (expenseId) => {
        deleteExpense(expenseId);
    });

    ipcMainOn('sendUpdateCategory', (payLoad) => {
        updateCategory(payLoad);
    });

    ipcMainOn('sendDeleteCatagory', (categoryId) => {
        deleteCategory(categoryId);
    });
}