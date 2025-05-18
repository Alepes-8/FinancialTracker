import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcMainOn, ipcWebContentsSend } from './utils.js';

const SENDING_INTERVAL = 2000;

//sending a message each 2000 second t
export function pullResources(mainWindow: BrowserWindow){
    setInterval(async () => {
        const message = await getBackendMessage();
        ipcWebContentsSend('subscribeStats', mainWindow.webContents, {log: message})
    }, SENDING_INTERVAL)
}

export function getStaticBackendData() {
    const totalStorage = 100;
    return {sum: totalStorage};
}

function getBackendMessage() : Promise<number>{
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

export function printPayLoadListner(){
    ipcMainOn('sendCreateExpense', (payload) => {
        console.log('Received expense from renderer:', payload.name, payload.value, payload.date);
    });
}