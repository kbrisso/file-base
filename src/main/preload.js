const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    async getDrives(args) {
      return ipcRenderer.invoke('get-drives', args);
    },
  },
  dialog: {
    async showOpenDialog() {
      return ipcRenderer.invoke('browse-files');
    },
  },
  dirtree: {
    async getDirTree(args) {
      return ipcRenderer.invoke('get-dir-tree', args);
    },
  },
  database: {
    async createLibrary(args) {
      return ipcRenderer.invoke('create-library', args);
    },
    async getLibraries() {
      return ipcRenderer.invoke('get-libraries');
    },
    async getLibraryByID(args) {
      return ipcRenderer.invoke('get-library-by-id', args);
    },
  },
});
