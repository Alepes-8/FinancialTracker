const electron = require('electron');

//allow the frontend UI to use calls in order to contact the backend.
//This is in order to creat protection for the UI everything it wants to.
//avoid giving to many privlages in order to minimise security risks.
electron.contextBridge.exposeInMainWorld('electron', { 
    sendDataToFrontEndListener: (callback) => {
        ipcOn('repeatedBackendResponse', (response: RepeatedBackendResponse) => {
            callback(response);
        });
    },
    getStaticBackendData: () => ipcInvoke('getStaticBackendData'),
} satisfies Window['electron'])

//call the backend from the frontend
function ipcInvoke<Key extends keyof EventPlayLoadMapping>(
    key: Key
): Promise<EventPlayLoadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

//call the backend from the frontend
function ipcOn<Key extends keyof EventPlayLoadMapping>(
    key: Key,
    callback: (payload: EventPlayLoadMapping[Key]) => void
) {
    electron.ipcRenderer.on(key, (_: any,payload: any) => callback(payload))
}