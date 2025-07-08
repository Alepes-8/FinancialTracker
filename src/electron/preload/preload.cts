const electron = require('electron');

//allow the frontend UI to use calls in order to contact the backend.
//This is in order to creat protection for the UI everything it wants to.
//avoid giving to many privlages in order to minimise security risks.
export const api = {
  subscribeStats: (callback) => {
    return ipcOn('subscribeStats', callback);
  },
  getAllBackendExpenseData: () => ipcInvoke('getAllBackendExpenseData'),
  getAllCategories: () => ipcInvoke('getAllCategories'),

  sendCreateExpense: (payload) => {
    return sendFn('sendCreateExpense', payload);
  },
  sendDeleteExpense: (payload) => {
    return sendFn('sendDeleteExpense', payload);
  }

} satisfies Window['electron'];

electron.contextBridge.exposeInMainWorld('electron', api);

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
    const cb = (_ : Electron.IpcRendererEvent, payload: EventPlayLoadMapping[Key]) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

export function sendFn<Key extends keyof EventPlayLoadMapping>(
  channel: Key,
  payload: EventPlayLoadMapping[Key]
) {
  return electron.ipcRenderer.send(channel, payload);
}
