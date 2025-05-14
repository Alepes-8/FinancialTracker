import osUtils from 'os-utils';
import { BrowserWindow } from 'electron';
import { ipcWebContentsSend } from './utils.js';

const SENDING_INTERVAL = 2000;

//sending a message each 2000 second t
export function pullResources(mainWindow: BrowserWindow){
    setInterval(async () => {
        const message = await getBackendMessage();
        ipcWebContentsSend('SubScribeToRepeatedBackendData', mainWindow.webContents, {log: message})
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