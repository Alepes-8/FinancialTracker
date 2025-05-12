import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getPreLoadPath } from './pathResolver.js';

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
        mainWindow.loadFile(path.join(app.getAppPath(),'/dist-react/index.html'));
    }
})