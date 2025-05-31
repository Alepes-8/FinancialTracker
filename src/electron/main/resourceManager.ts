import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcMainOn, ipcWebContentsSend } from './utils.js';
import { getExpenses, addExpenseEntry, getCategories} from '../../database/dbmanager.js';

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
    console.log("raw" , rawData)
    const transformed: CategoryData[] = rawData.map((row) => ({
        id: row.ID,
        category_name: row.CATEGORY_NAME,
    }));
    console.log("raw2" , transformed)

    return transformed
}

function getBackendMessage() : Promise<number>{
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

export function printPayLoadListner(){
    ipcMainOn('sendCreateExpense', (payload) => {
        console.log('Received expense from renderer:', payload.name, payload.value, payload.date);
        addExpenseEntry(payload.name, payload.value);
        console.log('database:', getExpenses());
    });
}