import { app, BrowserWindow } from 'electron';
import { ipcMainHandle, isDev } from './main/utils.js';
import { getStaticBackendData, pullResources} from './main/resourceManager.js'
import { getPreLoadPath, getUIPath } from './pathResolver.js';
import { createTray } from './main/try.js';
import { createMenu } from './main/menu.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        //we can set the orignal size and prferenses for the application when it all starts
        webPreferences: {
            //don't do nodeIntegration as this can give a large amount of security risks.
            preload: getPreLoadPath(),
        },
    });
    if (isDev()){
        mainWindow.loadURL('http://localhost:5123');
    }else{
        mainWindow.loadFile(getUIPath());
    }

    pullResources(mainWindow);
    //assyncronase call which instead of always sending things, this one can now handle to ba called from the frontend and return the getStaticBackendData information
    //call await window.electron.getStaticBackendData()
    //to explain this is a listner.This doesn't call it without being called appon
    ipcMainHandle("getStaticBackendData", () => {
        return getStaticBackendData();
    });

    //Sets the program image.
    createTray(mainWindow);
    handleCloseEvent(mainWindow);
    createMenu(mainWindow);
});


function handleCloseEvent(mainWindow: BrowserWindow){
    let willClose = false;

    mainWindow.on('close', (e) => {
        if(willClose){
            return;
        }

        e.preventDefault();
        mainWindow.hide();  
        if (app.dock) {
            app.dock.hide();
        };
    });

    app.on('before-quit', () => {
        willClose = true;
    });

    mainWindow.on('show', () => {
        willClose = false;
    })
};