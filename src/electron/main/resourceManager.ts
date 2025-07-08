import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcMainOn, ipcWebContentsSend } from './utils.js';
import { getExpenses, addExpenseEntry, getCategories, deleteExpense, updateExpense} from '../../database/dbmanager.js';

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
        id: row.ID,
        category_name: row.CATEGORY_NAME,
    }));
    return transformed
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
}