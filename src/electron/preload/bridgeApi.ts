import { ipcInvoke, ipcOn} from './ipcHelpers.js';

export const api = {
  subscribeChangeView: (callback) => {
    return ipcOn('subscribeChangeView', callback);
  },
  getStaticBackendData: () => ipcInvoke('getStaticBackendData'),
} satisfies Window['electron'];
