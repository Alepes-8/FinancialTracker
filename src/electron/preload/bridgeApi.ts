import { ipcInvoke, ipcOn} from './ipcHelpers.js';

export const api = {
  subscribeChangeView: (callback) => {
        return ipcOn('subscribeChangeView', (stats) => {
            callback(stats);
        });
    },
    getStaticBackendData: () => ipcInvoke('getStaticBackendData'),
} satisfies Window['electron'];
