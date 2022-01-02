declare let window: Window;
export interface IElectron {
  ipcRenderer: {
    getDrives(): any;
  };
  dialog: {
    showOpenDialog(): any;
  };
  database: {
    createLibrary(doc: any): any;
    getLibraries(): any;
    getLibraryByID(id: any): any;
  };
  dirtree: {
    getDirTree(args: any): any;
  };
}
declare global {
  interface Window {
    electron: IElectron;
    process: any;
    require: any;
  }
}
export {};
