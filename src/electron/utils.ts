import { ipcMain, WebContents } from 'electron';


export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

//ipc handler takes take of key formating of the ipcHandler
//ipcHandler what does it do? I believe it sends from backend to frontend, but is called upon in order for it to do something
export function ipcMainHandle<Key extends keyof EventPlayLoadMapping>(
    key: Key, 
    handler: () => EventPlayLoadMapping[Key]
) {
    ipcMain.handle(key, () => handler());
}

//ipcWebContentsSend sends information from the backend to the frontend.
export function ipcWebContentsSend<Key extends keyof EventPlayLoadMapping>(
    key: Key, 
    webContents: WebContents,
    payload: EventPlayLoadMapping[Key]
){
    webContents.send(key, payload);
}

