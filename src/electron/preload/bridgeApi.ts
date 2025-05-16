import { ipcInvoke, ipcOn} from './ipcHelpers.js';

export const api = {
  subscribeStats: (callback) => {
    return ipcOn('subscribeStats', callback);
  },
  getStaticBackendData: () => ipcInvoke('getStaticBackendData'),
} satisfies Window['electron'];
