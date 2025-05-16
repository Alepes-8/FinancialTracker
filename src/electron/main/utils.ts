import { ipcMain, WebContents, WebFrameMain } from 'electron';
import { getUIPath } from '../pathResolver.js';
import { pathToFileURL} from 'url';

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

//ipc handler takes take of key formating of the ipcHandler
//ipcHandler what does it do? I believe it sends from backend to frontend, but is called upon in order for it to do something
export function ipcMainHandle<Key extends keyof EventPlayLoadMapping>(
    key: Key, 
    handler: () => EventPlayLoadMapping[Key]
) {
    ipcMain.handle(key, (event) => {
        if (event.senderFrame === null) {
            throw new Error("senderFrame is null");
        }
        
        validateEventFrame(event.senderFrame);
        return handler();
    });
}

//ipcWebContentsSend sends information from the backend to the frontend.
export function ipcWebContentsSend<Key extends keyof EventPlayLoadMapping>(
    key: Key, 
    webContents: WebContents,
    payload: EventPlayLoadMapping[Key]
){
    webContents.send(key, payload);
}

//validate if we are in the correct path
export function validateEventFrame(frame: WebFrameMain) {
    //Are we in the dev build, is the address correct
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    /** 
     * TODO This will only work, if we have one page, but as I will need to render multiple pages 
     * this will not work make it complex to handle different exceptions for different pages.
     * 
     * this one is for the developer build, to create good validations.
     * */
    //In the url, is the url incorrect compared to where I am. 
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event');
    }
}