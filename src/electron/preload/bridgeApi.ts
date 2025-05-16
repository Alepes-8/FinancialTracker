import { ipcInvoke, ipcOn, sendFn} from './ipcHelpers.js';

export const api = {
  subscribeStats: (callback) => {
    return ipcOn('subscribeStats', callback);
  },
  getStaticBackendData: () => ipcInvoke('getStaticBackendData'),

  sendCreateExpense: (payload) => {
        return sendFn('sendCreateExpense', payload);
  }
} satisfies Window['electron'];
