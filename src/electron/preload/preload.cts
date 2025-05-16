const electron = require('electron');

//allow the frontend UI to use calls in order to contact the backend.
//This is in order to creat protection for the UI everything it wants to.
//avoid giving to many privlages in order to minimise security risks.
electron.contextBridge.exposeInMainWorld('electron', { 
    subscribeData: (callback) => {
        return ipcOn('subscribeData', (stats) => {
            callback(stats);
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
    const cb = (_ : Electron.IpcRendererEvent, payload: any) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

function sendFn<Key extends keyof EventPlayLoadMapping>(
  channel: Key,
  payload: EventPlayLoadMapping[Key]
) {
  return electron.ipcRenderer.send(channel, payload);
}