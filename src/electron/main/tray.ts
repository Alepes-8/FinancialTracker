import { app, BrowserWindow, Menu, Tray } from "electron";
import path from 'path'
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow){
    const tray = new Tray(path.join(
        getAssetPath(), 
        // we could adjust darwin to win32, or other restrictions. This asks if we are on mac and picks one icon if we are and another if not.
        // mac name should include template(read online about it)
        process.platform === 'darwin' ?  '/image-material/tempTaskBarIcon@4x.png' : '/image-material/tempTaskBarIcon@4x.png')
    );

    tray.setContextMenu(Menu.buildFromTemplate([
        {
        label: 'Quit',
        click: () => app.quit(),
        }, 
        {
            label: 'Show',
            click: () => {
                mainWindow.show();
                if (app.dock){
                    app.dock.show();
                };
            },
        },
    ]))
}
