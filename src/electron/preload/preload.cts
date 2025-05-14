import { contextBridge } from 'electron';
import { api } from './bridgeApi';

contextBridge.exposeInMainWorld('electron', api);
