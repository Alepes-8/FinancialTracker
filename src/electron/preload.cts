const electron = require('electron');

//allow the frontend UI to use calls in order to contact the backend.
//This is in order to creat protection for the UI everything it wants to.
//avoid giving to many privlages in order to minimise security risks.
electron.contextBridge.exposeInMainWorld("electron", { 
    getStaticData: () => console.log('static'),
})