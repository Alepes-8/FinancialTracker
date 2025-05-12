import { app, BrowserWindow } from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './utils.js';
import { getStaticBackendData, pullResources} from './resourceManager.js'
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

    pullResources(mainWindow);
    //assyncronase call which instead of always sending things, this one can now handle to ba called from the frontend and return the getStaticBackendData information
    //call await window.electron.getStaticBackendData()
    ipcMainHandle("getStaticBackendData", () => {
        return getStaticBackendData();
    });
});
