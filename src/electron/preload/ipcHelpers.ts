import { ipcRenderer } from 'electron';


//call the backend from the frontend
export function ipcInvoke<Key extends keyof EventPlayLoadMapping>(
    key: Key
): Promise<EventPlayLoadMapping[Key]> {
    return ipcRenderer.invoke(key);
}

//call the backend from the frontend
export function ipcOn<Key extends keyof EventPlayLoadMapping>(
    key: Key,
    callback: (payload: EventPlayLoadMapping[Key]) => void
) {
    const cb = (_ : Electron.IpcRendererEvent, payload: EventPlayLoadMapping[Key]) => callback(payload)
    ipcRenderer.on(key, cb);
    return () => ipcRenderer.off(key, cb);
}

export function sendFn<Key extends keyof EventPlayLoadMapping>(
  channel: Key,
  payload: EventPlayLoadMapping[Key]
) {
  return ipcRenderer.send(channel, payload);
}