import { app, BrowserWindow } from 'electron';
import { isDev } from './main/utils.js';
import { printPayLoadListner, pullResources} from './main/resourceManager.js'
import { getPreLoadPath, getUIPath } from './pathResolver.js';
import { createTray } from './main/try.js';
import { createMenu } from './main/menu.js';
import { createHandlers } from './handlers.js';

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

    //TODO will not be neded
    pullResources(mainWindow);

    printPayLoadListner();

    createHandlers();

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
