import path from 'path'
import { app } from 'electron'
import { isDev } from "./main/utils.js";

/* 
* Returns the full path to the preload script used by Electron.
*
* In development mode, it resolves to: 
*    <project_root>/dist-electron/preload.cjs
*
* In production mode, it resolves to: 
*    <project_root>/build_or_packaged_app/../dist-electron/preload.cjs
*
* This accounts for the difference in directory structure between dev and prod builds.
*/
export function getPreLoadPath(){
    return path.join(
        app.getAppPath(),
        isDev() ? '.' : '..', 
        '/dist-electron/electron/preload/preload.cjs'
    )
}

export function getUIPath() {
    return path.join(app.getAppPath(),'/dist-react/index.html');
}

export function getAssetPath() {
    return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
}